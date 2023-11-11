import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

// Components
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from '../../components/charts/PieChartView';
import BarChart from '../../components/charts/BarChartView';
import CustomIcon from '../../components/common/CustomIcon';
import AnalyzeModal from '../../components/modals/AnalyzeModal';

// Hooks
import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

// APIs/Utils
import { getInsights, analyzeData } from '../../api/insights';
import {
  getDateTodayISO,
  getWeeklyStartEnd } from '../../utils/dateFunctions';
import LogoS from '../../assets/logos/logo-s.png';
import { COLORS } from '../../constants/theme';

const Insights = () => {
  const [ parsedUser, setParsedUser ] = useState();
  const [ isAnalyzeOpen, setIsAnalyzeOpen ] = useState(false);
  const [ data, setData ] = useState();
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  // Drop Down States
  const [open, setOpen] = useState(false);
  const [activeType, setActiveType] = useState("monthly");
  const [items, setItems] = useState([
    {
      label: 'WEEKLY',
      value: 'weekly'
    },
    {
      label: 'MONTHLY',
      value: 'monthly'
    },
    {
      label: 'YEARLY',
      value: 'yearly'
    },
    
  ]);

  // Date States
  const [ dailyDate, setDailyDate ] = useState();
  const [ weeklyDate, setWeeklyDate ] = useState();
  const [ monthlyDate, setMonthlyDate ] = useState();
  const [ yearlyDate, setYearlyDate ] = useState();

  async function getInsightHandler(email) {
    const data = await getInsights({
      params: {
        email: email,
        endDate: weeklyDate[1],
        startDate: weeklyDate[0],
        type: activeType,
        month: monthlyDate.split('-')[1],
        year: yearlyDate,
        day: dailyDate,
        budgetName: activeBudget.budgetName
      }
    });
    if (!(data.response.length === 0)) setData(data.response);
  }

  async function analyzeHandler() {
    setIsAnalyzeOpen(true);
  }

  useEffect(() => {
    const parsUser = JSON.parse(user);
    initDate();
    setParsedUser(parsUser);
  }, [])

  useEffect(() => {
    if (parsedUser) {
      getInsightHandler(parsedUser.email);
    }
  }, [activeType, parsedUser])

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
          <DropDownPicker
                  open={open}
                  value={activeType}
                  items={items}
                  setOpen={setOpen}
                  setValue={setActiveType}
                  setItems={setItems}
                />
        </View>
        {!!data ? 
        <>
          <PieChart data={data}/>
          <BarChart data={data} type={activeType}/>
        </>
        :
        <Text>No expenses yet.</Text>}
      </View>

      {!!data &&
        <Pressable onPress={() => analyzeHandler()}>
          
          <View style={{position: 'absolute', backgroundColor: COLORS['blue-800'], bottom: 10, right: 10, borderRadius: 100, width: 65, height: 65, alignItems: 'center', justifyContent: 'center'}}>
            <MaterialIcons name="insights" size={40} color={COLORS['white-500']} />
          </View>
        </Pressable>
      }
      <AnalyzeModal isModalVisible={isAnalyzeOpen} setModalVisible={setIsAnalyzeOpen}/>
    </SafeAreaView>
  )
}

export default Insights