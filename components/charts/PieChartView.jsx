import React from 'react'
import { PieChart } from 'react-native-gifted-charts';
import { View, Text, StyleSheet } from 'react-native';

const PieChartView = () => {
  const pieData = [
    {value: 54, color: '#185577'},
    {value: 40, color: '#83a7c8'},
    {value: 20, color: '#1e9dc5'},
  ];

return(
    <View style={[styles.pieWrapper]}>
        <View style={[styles.mBot]}>
          <Text style={[styles.textBold]}>Top Expenses</Text>
          <Text style={[styles.grayText]}>Chart showing expenses by categories.</Text>
        </View>
        <View style={[styles.flexRow]}>
          <PieChart
            showText
            textColor="black"
            radius={80}
            textSize={20}
            textBackgroundRadius={26}
            data={pieData}
          />
          <View style={[styles.categoryWrapper]}>
            <View style={[styles.flexRow]}>
              <View style={[styles.categoryLegend, styles.backgroundLight]}></View>
              <Text>Category 1</Text>
            </View>
            <View style={[styles.flexRow]}>
              <View style={[styles.categoryLegend, styles.backgroundDark]}></View>
              <Text>Category 2</Text>
            </View>
            <View style={[styles.flexRow]}>
              <View style={[styles.categoryLegend, styles.backgroundGray]}></View>
              <Text>Category 3</Text>
            </View>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pieWrapper: {
    alignSelf: 'center',
    backgroundColor: '#fefefd',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  mBot: {
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  categoryWrapper: {
    gap: 8,
    justifyContent: 'center',
  },
  categoryLegend: {
    height: 25,
    width: 25,
    borderRadius: 8,
    marginRight: 8,
  },
  backgroundDark: {
    backgroundColor: '#185577',
  },
  textBold: {
    fontWeight: '700',
  },
  grayText: {
    color: '#7c7474',
  },
  backgroundGray: {
    backgroundColor: '#83a7c8',
  },
  backgroundLight: {
    backgroundColor: '#1e9dc5',
  }
});

export default PieChartView