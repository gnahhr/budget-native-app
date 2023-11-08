import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';


const BarChartView = ({data, type}) => {
  const colors = ['#185577', '#83a7c8', '#1e9dc5'];
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
      return {
        date: item[barLabel[type]],
        topExpenses: [...item.expenses.sort((a, b) => b.amount - a.amount).slice(0,3)]
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
            label: date.date,
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: {color: 'gray'},
            frontColor: colors[idx],
          }
        } else if (idx === 1) {
          return {
            value: item.amount,
            spacing: 2,
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
      newData.push(item[0])
      if (item[1]) newData.push(item[1])
      if (item[2]) newData.push(item[2])
    })

    setBarData(newData);
  };

  useEffect(() => {
    if (data) {
      initData(data);
    }
  }, [data])

  return (
    <View style={[styles.container]}>
      <Text style={[styles.textBold]}>Monthly Spend</Text>
      <Text style={[styles.grayText]}>How much you spent this month?</Text>
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  }, 
  textBold: {
    fontWeight: '700',
  },
  grayText: {
    color: '#7c7474',
  },
})

export default BarChartView