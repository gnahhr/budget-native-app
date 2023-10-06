import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router';
import { View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useStorageState } from '../../hooks/useStorageState';

import AnimatedProgressWheel from 'react-native-progress-wheel';
import CustomIcon from '../../components/common/CustomIcon';
import HomeAllocation from '../../components/homepage/HomeAllocation';
import Money from '../../components/homepage/Money';
import AddExpenses from '../../components/modals/AddExpenses';

import LogoS from '../../assets/logos/logo-s.png';

const HomepageIndex = () => {
  const [[isLoading, data], setData] = useStorageState('user');
  const [ isEModalOpen, setIsEModalOpen ] = useState(false);
  const [ parsedData, setParsedData ] = useState({});

  const [ activeTab, setActiveTab ] = useState("Needs");
  const tabs = ['Needs', 'Savings', 'Wants'];
  const tabData = {
    'Needs': {
      data: parsedData.needAllocations
    },
    'Savings': {
      data: parsedData.savingAllocations
    },
    'Wants': {
      data: parsedData.wantAllocations
    }
  }

  const expenseModalToggle = () => {
    setIsEModalOpen(true);
  }

  const addExpenseHandler = () => {

  }
  
  useEffect(() => {
    if (!isLoading) {
      setParsedData(JSON.parse(data));
    }
  }, [isLoading])

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
        <Text style={[styles.normalText, styles.grayText]}>Hello Shiela,</Text>
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
              progress={25}
              backgroundColor={'#c3ece8'}
            />
            <Text style={{position: 'absolute', alignSelf: 'center', marginTop: 70}}>Hatdog</Text>
          </View>
          <View style={styles.moneyWrapper}>
            <Money currency={parsedData.totalBudget} subText="Remaining budget" onClickHandler={() => console.log('yey')}/>
            <Money currency={0} subText="Total Expenses"/>
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
        {tabData[activeTab].data && tabData[activeTab].data.map(data => <HomeAllocation key={data.name} category={data}/>)}
      </ScrollView>
      <View style={[styles.bottomButtonWrapper]}>
        <Pressable>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>Edit Categories</Text>
        </Pressable>
        <Pressable onPress={() => expenseModalToggle()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>Add Expenses</Text>
        </Pressable>
      </View>
      <AddExpenses categoryList={tabData[activeTab].data} isModalVisible={isEModalOpen} setModalVisible={setIsEModalOpen} onAddExpense={() => console.log('yey')}/>
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