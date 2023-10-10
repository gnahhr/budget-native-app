import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { getInsights } from '../../api/insights';
import { useStorageState } from '../../hooks/useStorageState';
import { useAuth } from '../../context/auth';
import CustomIcon from '../../components/common/CustomIcon';
import PieChart from '../../components/charts/PieChartView';
import BarChart from '../../components/charts/BarChartView';

import LogoS from '../../assets/logos/logo-s.png';

const Insights = () => {
  const [ parsedUser, setParsedUser ] = useState();
  const [ data, setData ] = useState();
  const [ [isInsightLoading, insight], setInsight ] = useStorageState('insight');
  const [ type, setType] = useState();
  const { user } = useAuth();

  async function getInsightHandler(email, type) {
    const data = await getInsights(email, type);
    setInsight(JSON.stringify(data.response));
    if (!(data.response.length === 0)) setData(data.response);
  }

  useEffect(() => {
    const parsUser = JSON.parse(user);
    setParsedUser(parsUser);
    getInsightHandler(parsUser.email, 'monthly');
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
          headerTitle: "",
        }}
      />
      <View style={{width: '85%', alignSelf: 'center'}}>
        <Text style={{fontSize: 32, fontWeight: '700'}}>Insights</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>MONTHLY</Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
        {!!data ? 
        <>
          <PieChart data={data}/>
          <BarChart data={data}/>
        </>
        :
        <Text>No expenses yet.</Text>}
      </View>
    </SafeAreaView>
  )
}

export default Insights