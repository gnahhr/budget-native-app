import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/theme';


const BarChartView = ({data, type}) => {
  const colors = ['#185577', '#83a7c8', '#1e9dc5'];
  const { theme } = useTheme();
  const [ rChartData, setRChartData ] = useState(); 
  const [ barData, setBarData ] = useState();
  const [ barHeight, setBarHeight ] = useState(200);

  const barLabel = {
    'weekly': 'weekly',
    'monthly': 'month',
    'yearly': 'year',
  }
  
  const initData = (initData) => {
    const dataCheck = initData.map(item => {
      const maxLength = item.expenses.length > 3 ? 3 : item.expenses.length;
      return {
        date: item[barLabel[type]],
        topExpenses: [...item.expenses.sort((a, b) => b.amount - a.amount).slice(0,maxLength)]
      }
    });

    setRChartData(dataCheck);
    initBarData(dataCheck);
  }

  // Dahil 3 lang naman yung kinukuhang data, sinet ko nalang sila as ganyan, bc need nila specific data para maayos ma-render
  const initBarData = (data) => {
    let highest = 0
    const initData = data.map((date) => {
      const newDate = date.topExpenses.map((item, idx) => {
        if (item.amount > highest) highest = item.amount;
        if (idx === 0) {
          return {
            value: item.amount,
            label: type === 'monthly' ? date.date.slice(0,3) : date.date,
            labelWidth: 30,
            labelTextStyle: {color: theme === 'light' ? COLORS['grey-500'] : COLORS['white-700']},
            frontColor: colors[idx],
          }
        } else if (idx === 1) {
          return {
            value: item.amount,
            frontColor: colors[idx],
          }
        } else if (idx === 2) {
          return {
            value: item.amount,
            frontColor: colors[idx],
          }
        }
      })

      return newDate;
    })

    
    setBarHeight(highest);
    let trimData = [...initData];
    let newData = [];

    trimData.forEach(item => {
      for(let x = 0; x < item.length; x++){
        let curData = item[x];

        if(item[x+1]) {
          item[x]['spacing'] = 2
        }
        
        newData.push(curData)
      }
    })

    setBarData(newData);
  };

  useEffect(() => {
    if (data) {
      initData(data);
    }
  }, [data])

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkMode]}>
      <Text style={[styles.textBold, theme === 'dark' && styles.whiteText]}>Monthly Spend</Text>
      <Text style={[styles.grayText, theme === 'dark' && styles.whiteText]}>How much you spent this month?</Text>
      <View>
          <BarChart
            data={barData}
            barWidth={10}
            spacing={24}
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{color: 'gray'}}
            noOfSections={4}
            maxValue={barHeight + 100}
            height={160}
            width={200}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: COLORS['white-700'],
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  }, 
  darkMode: {
    backgroundColor: COLORS['dblue-600'],
  },
  textBold: {
    fontWeight: '700',
  },
  grayText: {
    color: '#7c7474',
  },
  whiteText: {
    color: COLORS['white-700'],
  },
})

export default BarChartView