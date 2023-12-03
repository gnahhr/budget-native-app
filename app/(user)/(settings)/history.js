import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Button, PermissionsAndroid} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../constants/theme';

import { useAuth } from '../../../context/auth';
import { useBudget } from '../../../context/budget';
import { useTheme } from '../../../context/theme';

import DatePicker from '../../../components/modals/DatePicker';
import CustomIcon from '../../../components/common/CustomIcon';

import LogoS from '../../../assets/logos/logo-sw.png';

import formatExpenses from '../../../utils/formatExpenses';
import { extractMonth,
        formatDate,
        getDateWithOffset,
        formatWeekly,
        getWeeklyOffset,
        getMonthOffset,
        getYearOffset,
        getDateTodayISO,
        getWeeklyStartEnd } from '../../../utils/dateFunctions';
import { getExpenses } from '../../../api/expenses';

const History = () => {
  const [ activeTab, setActiveTab ] = useState('Daily');
  const [ dailyDate, setDailyDate ] = useState();
  const [ weeklyDate, setWeeklyDate ] = useState();
  const [ monthlyDate, setMonthlyDate ] = useState();
  const [ yearlyDate, setYearlyDate ] = useState();
  const [ transactions, setTransactions ] = useState([]);
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const [ isPickerVisible, setIsPickerVisible ] = useState(false);
  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const { user } = useAuth();
  const { theme } = useTheme();
  const { activeBudget, toggleTheme } = useBudget();
  const router = useRouter();

  const calendarToggleHandler = () => {
    setIsPickerVisible(true);
  }

  const setDateFromPicker = {
    'Daily': setDailyDate,
    'Weekly': setWeeklyDate,
    'Monthly': setMonthlyDate,
    'Yearly': setYearlyDate,
  }

  const initDate = () => {
    const dateToday = getDateTodayISO();
    const dateWeekly = getWeeklyStartEnd(getDateTodayISO());
    const monthToday = dateToday.split('-').splice(0,2).join('-');
    const yearToday = dateToday.split('-')[0];
    
    setDailyDate(dateToday);
    setWeeklyDate(dateWeekly);
    setMonthlyDate(monthToday);
    setYearlyDate(yearToday);
  }

  const dateDisplay = () => {
    switch (activeTab) {
      case 'Daily':
        return formatDate(dailyDate)
      case 'Weekly':
        return formatWeekly(weeklyDate)
      case 'Monthly':
        return extractMonth(monthlyDate);
      case 'Yearly':
        return yearlyDate;
    }
  }

  const backHandler = () => {
    router.back();
  }

  const prevDateHandler = () => {
    switch (activeTab) {
      case 'Daily':
        setDailyDate(getDateWithOffset(dailyDate, -1));
        break;
      case 'Weekly':
        setWeeklyDate(getWeeklyOffset(weeklyDate, -7));
        break;
      case 'Monthly':
        setMonthlyDate(getMonthOffset(monthlyDate, -1));
        break;
      case 'Yearly':
        setYearlyDate(getYearOffset(yearlyDate, -1));
        break;
    }
  }

  const nextDateHandler = () => {
    switch (activeTab) {
      case 'Daily':
        setDailyDate(getDateWithOffset(dailyDate, 1));
        break;
      case 'Weekly':
        setWeeklyDate(getWeeklyOffset(weeklyDate, 7));
        break;
      case 'Monthly':
        setMonthlyDate(getMonthOffset(monthlyDate, 1));
        break;
      case 'Yearly':
        setYearlyDate(getYearOffset(yearlyDate, 1));
        break;
    }
  }

  async function expensesHandler(email) {
    let year = (activeTab === 'Monthly') ? monthlyDate.split('-')[0] : yearlyDate;

    const data = await getExpenses({
      params: {
        email: email,
        endDate: weeklyDate[1],
        startDate: weeklyDate[0],
        type: activeTab.toLocaleLowerCase(),
        month: monthlyDate.split('-')[1],
        year: year,
        day: dailyDate,
        budgetName: activeBudget.budgetName
      }
    });

    const response = data.response;
    // if (response.totalSum === 0) return;
    let formattedTransactions;
    // Iba iba kasi nilagay sa API na pagkuha kaya ayern, iba iba ang kanilang variables huhu
    // format yung expenses para makita siya per date.
    formattedTransactions = formatExpenses(response.getExpenses);
    setTransactions(formattedTransactions);

    // Summation ng total of expenses
    const totalExpenses = formattedTransactions.map(item => {
      return item.transactions.reduce((sum, curVal) => Number(sum) + Number(curVal.amount), 0);
    })

    // Set ng total expenses
    if (totalExpenses.length > 0) {
      setTotalExpenses(totalExpenses.reduce((sum, val) => sum + val, 0));
    } else {
      setTotalExpenses(0);
    }
  }

  useEffect(() => {
    initDate();
  }, []);

  useEffect(() => {
    const userParse = JSON.parse(user);

    if (dailyDate && weeklyDate && monthlyDate && yearlyDate) {
      expensesHandler(userParse.email);
    }

  }, [activeTab, dailyDate, weeklyDate, monthlyDate, yearlyDate]);

  return (
    <SafeAreaView style={[theme === 'dark' && styles.darkMode, {flex: 1}]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['blue-500'] : COLORS['dblue-450']},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color={COLORS['white-700']} onPress={() => backHandler()}/>
          ),
          headerRight: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={LogoS}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, theme === 'dark' && styles.darkHeader, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.textWhite, {fontSize: 32, fontWeight: '700', width: '100%', alignSelf: 'center', textAlign: 'center', marginBottom: 30}]}>Transactions</Text>
      </View>

      <View style={[styles.headerWrapper, theme === 'dark' && styles.darkDiv]}>
        <ScrollView horizontal={true} contentContainerStyle={styles.containerStyle} style={[styles.tabWrapper]}>
          <Pressable onPress={() => calendarToggleHandler()}>
            <AntDesign name="calendar" size={24} color={theme === 'light' ? "#5087b9" : COLORS['white-700']} />
          </Pressable>
        
          {tabs.map(tab => 
            {  
              let tabStyle = {};
              if (tab === activeTab) {tabStyle = {...tabStyle, fontWeight: 700}}

              return (
                <Pressable key={tab} onPress={() => setActiveTab(tab)}>
                  <Text style={[tabStyle, theme === 'dark' && styles.textWhite]}>{tab}</Text>
                </Pressable>
              )
            }
          )}
        </ScrollView>

        <View style={{flexDirection: 'row', marginVertical: 24}}>
          <Pressable onPress={() => prevDateHandler()}>
            <Entypo name="chevron-left" size={24} color={theme === 'light' ? "#1e3546" : COLORS['white-700']} />
          </Pressable>
          <Text style={[{flex: 1, alignSelf: 'center', textAlign: 'center', fontSize: 13}, theme === 'dark' && styles.textWhite]}>{dailyDate ? dateDisplay() : "Today"}</Text>
          <Pressable onPress={() => nextDateHandler()}>
            <Entypo name="chevron-right" size={24} color={theme === 'light' ? "#1e3546" : COLORS['white-700']} />
          </Pressable>
        </View>

        <Text style={{textAlign: 'center', color: theme === 'light' ? '#969a9f' : COLORS['white-700'], fontSize: 14, fontWeight: '700'}}>Total Expenses</Text>
        <Text style={{textAlign: 'center', color: '#e74b4b', fontSize: 22, fontWeight: '700'}}>Php. {totalExpenses}.00</Text>
      </View>

      <ScrollView style={[styles.headerWrapper, theme === 'dark' && styles.darkDiv, styles.noPadding]}>
        <View>
          {transactions.length > 0 ?
            transactions.map(transaction => {
              return (
                <View key={transaction.date}>
                  <Text style={[styles.historyDate, theme === 'dark' && styles.textWhite]}>{transaction.date}</Text>
                  {transaction.transactions.map((item, idx) => 
                    <View key={idx} style={[styles.historyItem, theme === 'dark' && styles.borderWhite]}>
                      <Text style={[styles.historyCategory, theme === 'dark' && styles.textWhite]}>{item.category}</Text>
                      <Text style={[theme === 'dark' && styles.textWhite]}>-Php. {item.amount}</Text>
                    </View>
                  )}
                </View>
              )
            })
            :
            <Text>No expenses for this period.</Text>
            }
        </View>
      </ScrollView>
      <DatePicker isModalVisible={isPickerVisible} setModalVisible={setIsPickerVisible} setDates={setDateFromPicker} type={activeTab}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    alignSelf: 'center',
    backgroundColor: COLORS['white-700'],
    paddingVertical: 16,
    paddingHorizontal: 8,
    width: '95%',
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#969a9f',
    maxHeight: '60%',
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550']
  },
  darkDiv: {
    backgroundColor: COLORS['dblue-600']
  },
  headerDesign: {
    backgroundColor: COLORS['blue-500'],
    width: '100%',
    alignSelf: 'center',
    height: 80,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  darkHeader: {
    backgroundColor: COLORS['dblue-450']
  },
  noPadding: {
    paddingVertical: 4,
  },
  tabWrapper: {
    minHeight: 25,
  },
  textWhite: {
    color: COLORS['white-700'],
  },
  borderWhite: {
    borderColor: COLORS['white-700'],
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 6,
    padding: 4
  },
  historyCategory: {
    fontStyle: 'italic',
    fontWeight: '700'
  },
  historyDate: {
    fontWeight: '700',
    marginBottom: 8
  }
})

export default History