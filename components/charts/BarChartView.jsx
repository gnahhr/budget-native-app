import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';


const BarChartView = () => {
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, spacing: 2, frontColor: '#ED6665'},
    {value: 40, frontColor: 'green'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, spacing: 2, frontColor: '#ED6665'},
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];

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
            noOfSections={5}
            maxValue={100}
            height={160}
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
    marginTop: 16,
  }, 
  textBold: {
    fontWeight: '700',
  },
  grayText: {
    color: '#7c7474',
  },
})

export default BarChartView