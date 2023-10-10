import React, { useState, useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router';
import { View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useStorageState } from '../../hooks/useStorageState';

// Components
import AnimatedProgressWheel from 'react-native-progress-wheel';
import CustomIcon from '../../components/common/CustomIcon';
import HomeAllocation from '../../components/homepage/HomeAllocation';
import Money from '../../components/homepage/Money';

// Modals
import AddExpenses from '../../components/modals/AddExpenses';
import UpdateBudget from '../../components/modals/UpdateBudget';

// API
import { getAllocatedBudget, updateBudget } from '../../api/budget';
import { getAllExpenses, allocateExpense } from '../../api/expenses';

// Images
import LogoS from '../../assets/logos/logo-s.png';

// Context
import { useAuth } from '../../context/auth';

const HomepageIndex = () => {
  // LocalStorage States
  const [[isDataLoading, data], setData] = useStorageState('data');
  const [[isExpensesLoading, expenses], setExpenses] = useStorageState('expenses');
  
  // Loading States
  const [ isLoading, setIsLoading ] = useState(true);
  const [ expensesLoading, setExpensesLoading ] = useState(true);
  
  // Parsed Data States
  const [ parsedData, setParsedData ] = useState({});
  const [ parsedUser, setParsedUser ] = useState({});
  const [ parsedExpenses, setParsedExpenses ] = useState([]);
  
  // Data States na ginamit for comupatations
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ progress, setProgress ] = useState(0);
  const [ remainingBudget, setRemainingBudget ] = useState(0);

  // Use hooks
  const { user } = useAuth();
  const router = useRouter();

  // Modal States
  const [ isEModalOpen, setIsEModalOpen ] = useState(false);
  const [ isBModalOpen, setIsBModalOpen ] = useState(false);

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

  // Modal Toggles
  const expenseModalToggle = () => {
    getAllocation(parsedUser.email);
    setIsEModalOpen(true);
  }

  const budgetModalToggle = () => {
    setIsBModalOpen(true);
  }

  // Pag add ng expenses
  async function addExpenseHandler(category, amount, note) {
    const payload = {
      email: parsedUser.email,
      type: tabData[activeTab].name,
      category: category,
      amount: Number(amount),
      note: note ? note : "",
    }

    // Kada add niya ng expenses get niya ulit yung allocation tska expenses para ma update yung nasa app,
    // Which is yung nasa line 92 and 93 then close na niya yung modal sa 94
    const response = await allocateExpense(payload);
    getAllocation(parsedUser.email);
    getExpensesHandler(parsedUser.email);
    setIsEModalOpen(false);
  }

  // Paglipat page papuntang edit categories
  const handleEditCategory = () => {
    router.replace('/(onboarding)/editCategories');
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
  async function getAllocation(email) {
    const allocation = await getAllocatedBudget(email);
    const data = allocation.response;
    // Kasama na rin dito yung pag compute nung makikita sa homepage which is yung remaining budget,
    // tska yung yung parang progress if malapit na maubos budget
    const remainingBudget = data.totalBudget ? data.totalBudget - data.totalExpenses : 0
    setData(JSON.stringify(data));
    setTotalBudget(data.totalBudget);
    setRemainingBudget(remainingBudget); 
    setTotalExpenses(data.totalExpenses ? data.totalExpenses : 0);
    setProgress(Math.floor(Number(remainingBudget) / Number(data.totalBudget) * 100));
    setParsedData(allocation.response);
  }

  // For updating ng budget, pagka update niya get na ng allocation then close modal
  async function updateBudgetHandler(newBudget) {
    const data = await updateBudget(parsedUser.email, newBudget);

    getAllocation(parsedUser.email);
    setIsBModalOpen(false);
  };

  // pag get ng expenses, pagkaget niya store niya dun sa local storage yung nakuhang data which is nasa
  // Line 153
  async function getExpensesHandler(email) {
    const data = await getAllExpenses(email);
    const summary = formatExpenses(data.response);
    setParsedExpenses(summary);
    setExpenses(JSON.stringify(summary));
    if (data.statusCode === 200) setExpensesLoading(false);
  }

  // Use Effects yung ginagamit para pag may magbabagong data sa dependency array niya,
  // which is yung [] after ng comma, mag r-run yung codes sa useEffect, if walang laman yung []
  // nag r-run siya pagka mount or pagka display ng component
  
  useEffect(() => {
    if (user) {
      const userParse = JSON.parse(user);
      setParsedUser(userParse);
      getExpensesHandler(userParse.email);
      getAllocation(userParse.email);
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    if (expensesLoading === false) {
      setExpensesLoading(true);
      getExpensesHandler(parsedUser.email);
    }
  }, [expenses])

  useEffect(() => {
    if (user) {
      setParsedUser(JSON.parse(user));
    }
    if (!isDataLoading) {
      setParsedData(JSON.parse(data));
    }
    if (!isExpensesLoading) {
      setParsedExpenses(JSON.parse(expenses));
    }
  }, [isDataLoading, isExpensesLoading, data, user, expenses]);

  return (
    <SafeAreaView style={{backgroundColor: '#f3f3f7'}}>
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
        !parsedUser && !parsedData && !parsedExpenses && isLoading ? 
        <Text>Loading...</Text>
      :
      <>
      <View style={[styles.container]}>
        <Text style={[styles.normalText, styles.grayText]}>Hello {parsedUser ? parsedUser.username : "User"},</Text>
        <Text style={[styles.boldText, styles.bigFont]}>Welcome Back!</Text>
      </View>

      <View style={[styles.budgetWrapper, styles.container]}>
        <Text style={[styles.bigFont]}>MY BUDGET</Text>
        <Text style={[styles.italics, styles.normalText]}>MONTH</Text>

        <View style={styles.flexRow}>
          <View style={{backgroundColor: '#d7ecea', alignSelf: 'center', position: 'relative'}}>
            <AnimatedProgressWheel 
              size={160} 
              width={15} 
              color={'#1e9dc5'}
              progress={progress ? progress : 0}
              backgroundColor={'#c3ece8'}
            />
            <Text style={{position: 'absolute', alignSelf: 'center', marginTop: 70}}>Php. {remainingBudget ? remainingBudget : 0}</Text>
          </View>
          <View style={styles.moneyWrapper}>
            <Money currency={remainingBudget ? remainingBudget : 0} subText="Remaining budget" onClickHandler={budgetModalToggle}/>
            <Money currency={totalExpenses ? totalExpenses : 0} subText="Total Expenses"/>
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
      
      <ScrollView style={[styles.container, styles.scrollHeight]}>
        {!expensesLoading && !isExpensesLoading && parsedData[tabData[activeTab].name].length > 0 ?
          parsedData[tabData[activeTab].name].map(data => <HomeAllocation key={data.name} category={data} expenses={parsedExpenses} type={tabData[activeTab].name}/>)
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

      <UpdateBudget isModalVisible={isBModalOpen} totalBudget={totalBudget} setModalVisible={setIsBModalOpen} updateBudget={updateBudgetHandler} />
      <AddExpenses categoryList={parsedData[tabData[activeTab].name]} isModalVisible={isEModalOpen} setModalVisible={setIsEModalOpen} onAddExpense={addExpenseHandler}/>
      </>}
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
    marginTop: 24,
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