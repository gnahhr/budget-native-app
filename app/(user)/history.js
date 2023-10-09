import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomIcon from '../../components/common/CustomIcon';
import { getExpenses } from '../../api/expenses';
import { useAuth } from '../../context/auth';
import LogoS from '../../assets/logos/logo-s.png';
import formatExpenses from '../../utils/formatExpenses';
import { formatDate } from '../../utils/dateFunctions';

const History = () => { 
  const [ activeTab, setActiveTab ] = useState('Daily');
  const [ userData, setUserData ] = useState(null);
  const [ transactions, setTransactions ] = useState([]);
  const [ totalExpenses, setTotalExpenses ] = useState(0);
  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly']

  const { user } = useAuth();

  async function expensesHandler(email) {
    const data = await getExpenses(email, activeTab);
    const response = data.response;
    const formattedTransactions = formatExpenses(response);

    setTransactions(formattedTransactions);

    const totalExpenses = formattedTransactions.map(item => {
      return item.transactions.reduce((sum, curVal) => Number(sum) + Number(curVal.amount), 0);
    })

    if (totalExpenses.length > 0) {
      setTotalExpenses(totalExpenses.reduce((sum, val) => sum + val, 0));
    } else {
      setTotalExpenses(totalExpenses);
    }

  }

  useEffect(() => {
    const userParse = JSON.parse(user);
    setUserData(userParse);
    expensesHandler(userParse.email);
  }, [])

  return (
    <SafeAreaView>
      <Tabs.Screen 
        options={{
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerRight: () => (
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
          <Entypo name="chevron-left" size={24} color="#1e3546" />
          <Text style={{flex: 1, alignSelf: 'center', textAlign: 'center', fontSize: 13}}>1 October 2023 -  7 October 2023</Text>
          <Entypo name="chevron-right" size={24} color="#1e3546" />
        </View>

        <Text style={{textAlign: 'center', color: '#969a9f', fontSize: 14, fontWeight: '700'}}>Total Expenses</Text>
        <Text style={{textAlign: 'center', color: '#e74b4b', fontSize: 22, fontWeight: '700'}}>Php. {totalExpenses}.00</Text>
      </View>

      <ScrollView style={[styles.headerWrapper, styles.noPadding]}>
        <View>
          {/* <Text style={styles.historyDate}>Today</Text> */}
          {transactions.map(transaction => {
            return (
              <>
                <Text style={styles.historyDate}>{transaction.date}</Text>
                {transaction.transactions.map((item, idx) => 
                  <View key={idx} style={styles.historyItem}>
                    <Text style={styles.historyCategory}>{item.category}</Text>
                    <Text>-Php. {item.amount}</Text>
                  </View>
                )}
              </>
            )
          })}
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