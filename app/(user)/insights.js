import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Components
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from '../../components/charts/PieChartView';
import BarChart from '../../components/charts/BarChartView';
import CustomIcon from '../../components/common/CustomIcon';
import AnalyzeModal from '../../components/modals/AnalyzeModal';
import CompareBudgetsModal from '../../components/modals/CompareBudgetsModal';

// Hooks
import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

// APIs/Utils
import { getInsights } from '../../api/insights';
import {
  getDateTodayISO,
  getWeeklyStartEnd } from '../../utils/dateFunctions';
import LogoS from '../../assets/logos/logo-s.png';
import LogoSW from '../../assets/logos/logo-sw.png';
import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/theme';

const Insights = () => {
  const [ parsedUser, setParsedUser ] = useState();
  const [ isAnalyzeOpen, setIsAnalyzeOpen ] = useState(false);
  const [ isCompareOpen, setIsCompareOpen ] = useState(false);
  const [ data, setData ] = useState();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  async function compareHandler() {
    setIsCompareOpen(true);
  }

  useEffect(() => {
    const parsUser = JSON.parse(user);
    initDate();
    setParsedUser(parsUser);
    getInsights(parsUser.email);
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
    <SafeAreaView style={[theme === 'dark' && {backgroundColor: COLORS['dblue-500']}, {flex: 1}]}>
        <Tabs.Screen 
          options={{
            headerStyle: { backgroundColor: theme === 'light' ? COLORS['white-700'] : COLORS['dblue-500'] },
            headerShadowVisible: false,
            headerLeft: () => (
              <Pressable onPress={() => toggleTheme()}>
                <CustomIcon imageUrl={theme === 'light' ? LogoS : LogoSW}/>
              </Pressable>
            ),
            headerTitle: "",
          }}
        />
      <View style={{width: '85%', alignSelf: 'center'}}>
        <Text style={[{fontSize: 32, fontWeight: '700', color: theme === 'light' ? COLORS['black-500'] : COLORS['white-700']}]}>Insights</Text>
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
        <Text style={[theme === 'dark' && {color: COLORS['white-700']}]}>No expenses yet.</Text>}
      </View>

      {!!data &&
      <View>
        <Pressable onPress={() => analyzeHandler()}>
          <View style={{position: 'absolute', backgroundColor: COLORS['blue-800'], bottom: 10, right: 10, borderRadius: 100, width: 65, height: 65, alignItems: 'center', justifyContent: 'center'}}>
            <MaterialIcons name="insights" size={40} color={COLORS['white-500']} />
          </View>
        </Pressable>
        <Pressable onPress={() => compareHandler()}>
          <View style={{position: 'absolute', backgroundColor: COLORS['blue-800'], bottom: 80, right: 10, borderRadius: 100, width: 55, height: 55, alignItems: 'center', justifyContent: 'center'}}>
            <MaterialCommunityIcons name="file-compare" size={35} color={COLORS['white-500']} />
          </View>
        </Pressable>
      </View>
      }
      <AnalyzeModal isModalVisible={isAnalyzeOpen} setModalVisible={setIsAnalyzeOpen}/>
      <CompareBudgetsModal isModalVisible={isCompareOpen} setModalVisible={setIsCompareOpen}/>
    </SafeAreaView>
  )
}

export default Insights