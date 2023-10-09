import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router';
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
import { getAllocatedBudget } from '../../api/budget';
import { getAllExpenses, allocateExpense } from '../../api/expenses';
import LogoS from '../../assets/logos/logo-s.png';
import { useAuth } from '../../context/auth';

const HomepageIndex = () => {
  // LocalStorage States
  const [[isUserLoading, userData], setUserData] = useStorageState('user');
  const [[isDataLoading, data], setData] = useStorageState('data');
  const [[isExpensesLoading, expenses], setExpenses] = useStorageState('expenses');
  const [ remainingBudget, setRemainingBudget ] = useState(0);
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const [ parsedData, setParsedData ] = useState({});
  const [ parsedUser, setParsedUser ] = useState({});
  const [ parsedExpenses, setParsedExpenses ] = useState([]);
  const [ progress, setProgress ] = useState(0);

  const { user } = useAuth();

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

  const expenseModalToggle = () => {
    getAllocation(parsedUser.email);
    setIsEModalOpen(true);
  }

  const budgetModalToggle = () => {
    setIsBModalOpen(true);
  }

  async function getExpensesHandler(email) {
    const data = await getAllExpenses(email);
    const summary = formatExpenses(data.response);
    setParsedExpenses(summary);
    setExpenses(JSON.stringify(summary));
  }

  const formatExpenses = (data) => {
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

  async function addExpenseHandler(category, amount, note) {
    const payload = {
      email: parsedUser.email,
      type: tabData[activeTab].name,
      category: category,
      amount: Number(amount),
      note: note ? note : "",
    }

    const response = await allocateExpense(payload);
    getAllocation(parsedUser.email);
    getExpensesHandler(parsedUser.email);
    setIsEModalOpen(false);
  }

  async function getAllocation(email) {
    const allocation = await getAllocatedBudget(email);
    const data = allocation.response;
    setData(JSON.stringify(data));
    setRemainingBudget(data.remainingBudget);
    setTotalExpenses(data.totalExpenses);
    setParsedData(allocation.response);
  }

  useEffect(() => {
    const userParse = JSON.parse(user);

    setParsedUser(userParse);
    getAllocation(userParse.email);
    getExpensesHandler(userParse.email);
  }, [])

  useEffect(() => {
    if (!isUserLoading) {
      setParsedUser(JSON.parse(userData));
    }
    if (!isDataLoading) {
      setParsedData(JSON.parse(data));
    }
    if (!isExpensesLoading) {
      setParsedExpenses(JSON.parse(expenses));
    }
  }, [isUserLoading, isDataLoading, isExpensesLoading, data, user, expenses])

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
              progress={0}
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
        {tabData[activeTab].name && !isExpensesLoading && parsedData[tabData[activeTab].name].map(data => <HomeAllocation key={data.name} category={data} expenses={parsedExpenses}/>)}
      </ScrollView>

      <View style={[styles.bottomButtonWrapper]}>
        <Pressable>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>Edit Categories</Text>
        </Pressable>
        <Pressable onPress={() => expenseModalToggle()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>Add Expenses</Text>
        </Pressable>
      </View>

      <UpdateBudget isModalVisible={isBModalOpen} setModalVisible={setIsBModalOpen} onAddExpense={()=>console.log('yey')} />
      <AddExpenses categoryList={parsedData[tabData[activeTab].name]} isModalVisible={isEModalOpen} setModalVisible={setIsEModalOpen} onAddExpense={addExpenseHandler}/>
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