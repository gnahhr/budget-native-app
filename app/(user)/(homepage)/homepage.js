import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Tabs, useRouter } from 'expo-router';
import { View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView, RefreshControl } from 'react-native'
import { Image } from 'expo-image';
import { useStorageState } from '../../../hooks/useStorageState';

// Components
import AnimatedProgressWheel from 'react-native-progress-wheel';
import CustomIcon from '../../../components/common/CustomIcon';
import HomeAllocation from '../../../components/homepage/HomeAllocation';
import Money from '../../../components/homepage/Money';

// Modals
import AddExpenses from '../../../components/modals/AddExpenses';
import UpdateBudget from '../../../components/modals/UpdateBudget';
import UserListModal from '../../../components/homepage/UserListModal';
import BudgetList from '../../../components/homepage/BudgetList';
import Instructions from '../../../components/common/Instructions';

// API
import { getAllocatedBudget, updateBudget } from '../../../api/budget';
import { allocateExpense } from '../../../api/expenses';
import { registerForPushNotificationsAsync } from '../../../utils/notification';

// Images
import LogoS from '../../../assets/logos/logo-s.png';

// Context
import { useAuth } from '../../../context/auth';
import { useBudget } from '../../../context/budget';

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const HomepageIndex = () => {
  const { user } = useAuth();
  const { activeBudget, updateActive, updateBudgetL } = useBudget();

  // LocalStorage States
  const [ [isNotifSettings, notifSettings], setNotifSettings ] = useStorageState('notifSettings');
  const [ [dontShowLoading, dontShowAgainInstruction], setDontShowAgainInstruction ] = useStorageState('dontShowAgainInstruction');

  
  // Loading States
  const [ isLoading, setIsLoading ] = useState(true);
  const [ expensesLoading, setExpensesLoading ] = useState(true);
  const [ refreshing, setRefreshing ] = useState(false);
  
  // Parsed Data States
  const [ parsedData, setParsedData ] = useState({});
  const [ parsedUser, setParsedUser ] = useState(null);
  const [ parsedExpenses, setParsedExpenses ] = useState([]);
  
  // Data States na ginamit for comupatations
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ progress, setProgress ] = useState(0);
  const [ remainingBudget, setRemainingBudget ] = useState(0);
  const [ exceedingBudget, setExceedingBudget ] = useState(0);

  // Notification States
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Use hooks
  const router = useRouter();

  // Modal States
  const [ isEModalOpen, setIsEModalOpen ] = useState(false);
  const [ isBModalOpen, setIsBModalOpen ] = useState(false);
  const [ isUserModalVisible, setIsUserModalVisible ] = useState(false);
  const [ isBListModalVisible, setIsBListModalVisible ] = useState(false);
  const [ isIModalVisible, setIModalVisible ] = useState(true);
  

  // Tab Constants
  const [ activeTab, setActiveTab ] = useState("Needs");
  const tabs = ['Needs', 'Savings', 'Wants'];
  const tabData = {
    'Needs': {
      name: 'needs'
    },
    'Savings': {
      name: 'savings'
    },
    'Wants': {
      name: 'wants'
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const userParse = JSON.parse(user);
    setParsedUser(userParse);
    getAllocation(userParse.email, userParse.defaultBudget);
    setRefreshing(false);
  }, []);

  // Modal Toggles
  const expenseModalToggle = () => {
    getAllocation(parsedUser.email);
    setIsEModalOpen(true);
  }

  const budgetModalToggle = () => {
    setIsBModalOpen(true);
  }

  const userModalToggle = () => {
    setIsUserModalVisible(true);
  }

  const budgetListModalToggle = () => {
    setIsBListModalVisible(true);
  }

  // Pag add ng expenses
  async function addExpenseHandler(category, amount, note) {
    const payload = {
      expenseType: tabData[activeTab].name,
      category: category,
      amount: Number(amount),
      note: note ? note : "",
    }

    // Kada add niya ng expenses get niya ulit yung allocation tska expenses para ma update yung nasa app,
    // Which is yung nasa line 92 and 93 then close na niya yung modal sa 94
    const response = await allocateExpense(parsedUser.email, activeBudget.budgetName, payload);
    getAllocation(parsedUser.email);
    setExpensesLoading(true);
    setIsEModalOpen(false);
  }

  // Paglipat page papuntang edit categories
  const handleEditCategory = () => {
    router.replace('(user)/(homepage)/editCategories');
  }

  // Pag format lang ng data na nakuha from expensesHandler para madisplay ng maayos yung data,
  // Kasama na diyan yung summation ng expenses
  const formatExpenses = (data) => {
    if (!data) return;
    const categories = data.map((data) => data.category);
    const tabs = [...new Set(categories)];
    
    return tabs.map((category) => {
      const total = data.reduce((sum, object) => {
        if (object['category'] === category) {
          return Number(sum) + Number(object['amount'])
        } else {
          return Number(sum)
        }
      }, 0)

      return {
        category: category,
        amount: total,
      }
    })
  }

  // Get ng allocation
  async function getAllocation(email, budgetName) {
    const budget = activeBudget.budgetName ? activeBudget.budgetName : budgetName;
    const allocation = await getAllocatedBudget(email, budget);
    
    const data = allocation.response;
    // Kasama na rin dito yung pag compute nung makikita sa homepage which is yung remaining budget,
    // tska yung yung parang progress if malapit na maubos budget
    const expenses = tabs.map(item => data[item.toLowerCase()]);
    const expensesArray = [];

    expenses.forEach(item => {
      if (item?.length > 0) {
        item.forEach((x) => x.expenses.forEach(y => expensesArray.push(y)));
      }
    });

    const formattedExpense = formatExpenses(expensesArray);
    const totalBudget = data.totalBudget ? data.totalBudget : 0;
    // const remainingBudget = totalBudget > 0 ? data.totalBudget - data.totalExpenses : 0;

    // Local Storage
    // setData(JSON.stringify(data));
    // setExpenses(JSON.stringify(formattedExpense));

    // States
    setTotalBudget(totalBudget);
    setTotalExpenses(data.totalExpenses);
    setParsedExpenses([...formattedExpense]);
    setParsedData(allocation.response);
    setExpensesLoading(false);
  }

  // For updating ng budget, pagka update niya get na ng allocation then close modal
  async function updateBudgetHandler(newBudget, newName) {
    const data = await updateBudget(parsedUser.email, activeBudget.budgetName, newBudget, newName);

    if (data?.statusCode === 200) {
      updateActive({
        budgetName: newName,
        budgetType: activeBudget.budgetType,
        budgetOwner: parsedUser.email
      })
    }

    getAllocation(parsedUser.email);
    setIsBModalOpen(false);
  };

  // Use Effects yung ginagamit para pag may magbabagong data sa dependency array niya,
  // which is yung [] after ng comma, mag r-run yung codes sa useEffect, if walang laman yung []
  // nag r-run siya pagka mount or pagka display ng component

  useEffect(() => {
    if (user && activeBudget) {
      const userParse = JSON.parse(user);
      setParsedUser(userParse);
      getAllocation(userParse.email, userParse.defaultBudget);
      setIsLoading(false);
    }
  }, [activeBudget])

  useEffect(() => {
    const userParse = JSON.parse(user);
    getAllocation(userParse.email, userParse.defaultBudget);
  }, [isEModalOpen]);

  useEffect(() => {
    if (!dontShowLoading && dontShowAgainInstruction !== null){
      setIModalVisible(!JSON.parse(dontShowAgainInstruction));
    }
  }, [dontShowLoading, dontShowAgainInstruction])

  useEffect(() => {
    setProgress(Math.floor(Number(remainingBudget) / Number(totalBudget) * 100)); 
    console.log(Math.floor(Number(remainingBudget) / Number(totalBudget) * 100))
  }, [remainingBudget, totalBudget]);

  useEffect(() => {
    if (!notifSettings) {
      const settings =  {
        'reminderEveryday': true,
        'reminderOverspend': true,
        'reminderDebtsLend': true,
      }
      setNotifSettings(JSON.stringify(settings));
    }
  }, [])

  useEffect(() => {
    updateBudgetL();
  }, [isBModalOpen])

  useEffect(() => {
    if (totalBudget){
      const budget = totalBudget - totalExpenses;
      if (budget > 0) {
        setRemainingBudget(budget);
        setExceedingBudget(0);
      } else {
        setRemainingBudget(0);
        setExceedingBudget(budget*-1);
      }
    }
  }, [totalBudget, totalExpenses, activeBudget]);

  useEffect(() => {
    if (user) {
      setParsedUser(JSON.parse(user));
    }

  }, [user]);

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#f3f3f7', position:"relative"}}>
      <Tabs.Screen 
        options={{
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS} />
          ),
          headerTitle: "",
        }}
      />
      {
        // Checks if data are still loading
        !parsedUser && !parsedData && !parsedExpenses && isLoading && !activeBudget ? 
        <Text>Loading...</Text>
      :
      <>
      <View style={[styles.container, {flexDirection: 'row', padding: 8}]}>
        <View>
          <Text style={[styles.normalText, styles.grayText]}>Hello {parsedUser ? parsedUser.username : "User"},</Text>
          <Text style={[styles.boldText, styles.bigFont]}>Welcome Back!</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', justifyContent:'center'}}>
          <Pressable onPress={() => userModalToggle()}>
            {parsedUser && <Image source={{uri: parsedUser.imageUrl}} style={{width: 60, height: 60, borderRadius: 50}}/>}
          </Pressable>
        </View>
      </View>

      <View style={[styles.budgetWrapper, styles.container]}>
        <Pressable onPress={() => budgetListModalToggle()}>
          <Text style={[styles.bigFont]}>{activeBudget.budgetName?.split('~')[0]}</Text>
        </Pressable>

        <Text style={[styles.italics, styles.normalText, {textTransform: 'uppercase'}]}>{activeBudget.budgetType}</Text>

        <View style={styles.flexRow}>
          <View style={{backgroundColor: '#d7ecea', alignSelf: 'center', position: 'relative'}}>
            <AnimatedProgressWheel 
              size={140} 
              width={15} 
              color={'#1e9dc5'}
              progress={progress ? progress : 0}
              backgroundColor={'#c3ece8'}
            />
            <Text style={{position: 'absolute', alignSelf: 'center', marginTop: 60}}>Php. {remainingBudget ? remainingBudget : 0}</Text>
          </View>
          <View style={styles.moneyWrapper}>
            <Money currency={remainingBudget ? remainingBudget : 0} subText="Remaining Budget" onClickHandler={parsedUser && activeBudget.budgetOwner === parsedUser.email ? budgetModalToggle : null}/>
            <Money currency={totalExpenses ? totalExpenses : 0} subText="Total Expenses"/>
            <Money currency={exceedingBudget} subText="Exceeding Budget"/>
          </View>
        </View>
      </View>

      <View style={[styles.container, styles.flexRow, styles.tabGroupStyle]}>
          {tabs.map((tab) => {
            let passStyle = [styles.normalText, styles.boldText]
            if (activeTab === tab) {
              passStyle.push(styles.inactiveTab)
            } else {
              passStyle.push(styles.grayText)
            }
            return (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={passStyle}>{tab}</Text>
            </Pressable>)
          }
          )}
      </View> 
      
      <ScrollView
        style={[styles.container, styles.scrollHeight]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!expensesLoading && parsedData[tabData[activeTab].name].length > 0 ?
          parsedData[tabData[activeTab].name].map(data => <HomeAllocation key={data.name} category={data} expenses={parsedExpenses} type={tabData[activeTab].name} getAllocation={() => getAllocation(parsedUser.email, parsedUser.defaultBudget)}/>)
          :
          <Text>Nothing Allocated</Text>
          }
      </ScrollView>

      <View style={[styles.bottomButtonWrapper]}>
        <Pressable onPress={() => handleEditCategory()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>Edit Categories</Text>
        </Pressable>
        <Pressable onPress={() => expenseModalToggle()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>Add Expenses</Text>
        </Pressable>
      </View>

      
      <BudgetList isModalVisible={isBListModalVisible} setModalVisible={setIsBListModalVisible} />
      <UserListModal isModalVisible={isUserModalVisible} setModalVisible={setIsUserModalVisible} />
      <UpdateBudget isModalVisible={isBModalOpen} totalBudget={totalBudget} setModalVisible={setIsBModalOpen} updateBudget={updateBudgetHandler} />
      <AddExpenses categoryList={parsedData[tabData[activeTab].name]} isModalVisible={isEModalOpen} expenses={parsedExpenses} setModalVisible={setIsEModalOpen} onAddExpense={addExpenseHandler}/>
      </>}
      {isIModalVisible && <Instructions isModalVisible={isIModalVisible} setModalVisible={setIModalVisible} type={"homepage"}/>}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  grayText: {
    color: '#5f5f5f',
  },
  whiteText: {
    color: '#ffffff',
  },
  normalText: {
    fontSize: 19,
    fontWeight: '500',
  },
  tabGroupStyle: {
    gap: 8,
    marginVertical: 8,
  },
  bigFont: {
    fontSize: 30,
  },
  boldText: {
    fontWeight: '700',
  },
  italics: {
    fontStyle: 'italic',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  scrollHeight: {
    height: '36%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  moneyWrapper: {
    gap: 4,
    marginTop: 'auto',
    marginHorizontal: 8,
  },
  budgetWrapper: {
    backgroundColor: '#d6ebe8',
    borderRadius: 16,
    alignItems: 'center',
    padding: 8,
  },
  bottomButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 24,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#11588b',
    borderRadius: 4,
  }
});

export default HomepageIndex