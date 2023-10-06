import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CustomIcon from '../../components/common/CustomIcon';
import PieChart from '../../components/charts/PieChartView';
import BarChart from '../../components/charts/BarChartView';

import LogoS from '../../assets/logos/logo-s.png';

import mockData from '../../constants/mockData';

const Insights = () => {

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
      <View style={{width: '85%', alignSelf: 'center'}}>
        <Text style={{fontSize: 32, fontWeight: '700'}}>Insights</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>MONTHLY</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
        <PieChart />
        <BarChart />
      </View>
    </SafeAreaView>
  )
}

export default Insights