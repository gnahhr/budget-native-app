import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomIcon from '../../components/common/CustomIcon';

import LogoS from '../../assets/logos/logo-s.png';

const dummyData = {
  
}

const History = () => { 
  const [ activeTab, setActiveTab ] = useState('Daily');

  const tabs = ['Daily', 'Weekly', 'Monthly', 'Yearly']

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
                <Pressable key={tab}>
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
        <Text style={{textAlign: 'center', color: '#e74b4b', fontSize: 22, fontWeight: '700'}}>Php. 800.00</Text>
      </View>

      <ScrollView style={[styles.headerWrapper, styles.noPadding]}>
        <View>
          <Text style={styles.historyDate}>Today</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
        </View>
        <View>
          <Text style={styles.historyDate}>Today</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
        </View>
        <View>
          <Text style={styles.historyDate}>Today</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
        </View>
        <View>
          <Text style={styles.historyDate}>Today</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
        </View>
        <View>
          <Text style={styles.historyDate}>Today</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
        </View>
        <View>
          <Text style={styles.historyDate}>Today</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyCategory}>Food</Text>
            <Text>-Php. 800.00</Text>
          </View>
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