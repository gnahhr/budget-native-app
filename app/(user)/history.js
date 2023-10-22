import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../context/auth';

import CustomIcon from '../../components/common/CustomIcon';
import LogoS from '../../assets/logos/logo-s.png';
import formatExpenses from '../../utils/formatExpenses';
import { getExpenses } from '../../api/expenses';
import { extractMonth,
        formatDate,
        getDateWithOffset,
        formatWeekly,
        getWeeklyOffset,
        getMonthOffset,
        getYearOffset,
        getDateTodayISO,
        getWeeklyStartEnd } from '../../utils/dateFunctions';

const History = () => { 
  const [ activeTab, setActiveTab ] = useState('Daily');
  const [ userData, setUserData ] = useState(null);
  const [ dailyDate, setDailyDate ] = useState();
  const [ weeklyDate, setWeeklyDate ] = useState();
  const [ monthlyDate, setMonthlyDate ] = useState();
  const [ yearlyDate, setYearlyDate ] = useState();
  const [ transactions, setTransactions ] = useState([]);
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  const { user } = useAuth();

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
        day: dailyDate
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
    const userParse = JSON.parse(user);
    setUserData(userParse);
    expensesHandler(userParse.email);
  }, [])

  useEffect(() => {
    const userParse = JSON.parse(user);
    expensesHandler(userParse.email);
  }, [activeTab, dailyDate, weeklyDate, monthlyDate, yearlyDate])

  return (
    <SafeAreaView>
      <Tabs.Screen 
        options={{
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <Text style={{fontSize: 32, fontWeight: '700', width: '95%', alignSelf: 'center'}}>Transactions</Text>

      <View style={[styles.headerWrapper]}>
        <ScrollView horizontal={true} contentContainerStyle={styles.containerStyle} style={[styles.tabWrapper]}>
          <AntDesign name="calendar" size={24} color="#5087b9" />
          {tabs.map(tab => 
            {  
              let tabStyle = {};
              if (tab === activeTab) {tabStyle = {...tabStyle, fontWeight: 700}}

              return (
                <Pressable key={tab} onPress={() => setActiveTab(tab)}>
                  <Text style={tabStyle}>{tab}</Text>
                </Pressable>
              )
            }
          )}
        </ScrollView>

        <View style={{flexDirection: 'row', marginVertical: 24}}>
          <Pressable onPress={() => prevDateHandler()}>
            <Entypo name="chevron-left" size={24} color="#1e3546" />
          </Pressable>
          <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center', fontSize: 13}}>{dailyDate ? dateDisplay() : "Today"}</Text>
          <Pressable onPress={() => nextDateHandler()}>
            <Entypo name="chevron-right" size={24} color="#1e3546" />
          </Pressable>
        </View>

        <Text style={{textAlign: 'center', color: '#969a9f', fontSize: 14, fontWeight: '700'}}>Total Expenses</Text>
        <Text style={{textAlign: 'center', color: '#e74b4b', fontSize: 22, fontWeight: '700'}}>Php. {totalExpenses}.00</Text>
      </View>

      <ScrollView style={[styles.headerWrapper, styles.noPadding]}>
        <View>
          {transactions.length > 0 ?
            transactions.map(transaction => {
              return (
                <View key={transaction.date}>
                  <Text style={styles.historyDate}>{transaction.date}</Text>
                  {transaction.transactions.map((item, idx) => 
                    <View key={idx} style={styles.historyItem}>
                      <Text style={styles.historyCategory}>{item.category}</Text>
                      <Text>-Php. {item.amount}</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 8,
    width: '95%',
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#969a9f',
    maxHeight: '60%',
  },
  noPadding: {
    paddingVertical: 4,
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