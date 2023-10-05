import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router';
import { View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useStorageState } from '../../hooks/useStorageState';

import CustomIcon from '../../components/common/CustomIcon';
import LogoS from '../../assets/logos/logo-s.png';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import Money from '../../components/homepage/Money';

const HomepageIndex = () => {
  const [[isLoading, data], setData] = useStorageState('user');
  const { wantAllocations, needAllocations, savingAllocations, totalBudget } = JSON.parse(data);

  const [ activeTab, setActiveTab ] = useState("Needs");
  const tabs = ['Needs', 'Savings', 'Wants'];
  const tabData = {
    'Needs': {
      data: needAllocations
    },
    'Savings': {
      data: savingAllocations
    },
    'Wants': {
      data: wantAllocations
    }
  }
  
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff'}}>
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
            <Text style={{position: 'absolute', alignSelf: 'center', marginTop: 50}}>Hatdog</Text>
          </View>
          <View style={styles.moneyWrapper}>
            <Money currency={totalBudget} subText="Remaining budget" onClickHandler={() => console.log('yey')}/>
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
      <ScrollView style={styles.container}>
        {tabData[activeTab].data.map(data => <Text key={data.name}>{data.name} - {data.expenses}/{data.allocation}</Text>)}
      </ScrollView>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  grayText: {
    color: '#5f5f5f',
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
    alignSelf: 'center'
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
  }
});

export default HomepageIndex