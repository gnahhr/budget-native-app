import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-native-gifted-charts';
import { View, Text, StyleSheet } from 'react-native';

const PieChartView = ({data}) => {
  const [ categories, setCategories ] = useState(['Category 1', 'Category 2', 'Category 3']);
  const [ pieData, setPieData ] = useState([
    {value: 54, color: '#185577'},
    {value: 40, color: '#83a7c8'},
    {value: 20, color: '#1e9dc5'},
  ]);

  // set ng colors
  const colors = ['#185577', '#83a7c8', '#1e9dc5'];

  const initPieData = (dataPie) => {
    // Kunin muna yung total expenses para mahati ng maayos yung pie
    const total = dataPie.reduce((sum, cur) => sum + cur.amount, 0);
    const dataCat = dataPie.map((data) => data.category);
    setCategories(dataCat);
    
    const pieData = dataPie.map((data, idx) => {
      return {
        value: Math.floor(data.amount / total * 100),
        color: colors[idx],
      }
    })

    setPieData(pieData);
  };

  useEffect(() => {
    if (data) {
      const dataCheck = data[0].expenses.sort((a, b) => b.amount - a.amount).slice(0,3);
      initPieData(dataCheck);
    }
  }, [data])

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
            {categories.map((category, idx) =>
              <View key={category} style={[styles.flexRow]}>
                <View style={[styles.categoryLegend, {backgroundColor: pieData[idx].color}]}></View>
                <Text style={{fontSize: 12}}>{category}</Text>
              </View>
            )}
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
    paddingHorizontal: 10,
    paddingTop: 8,
    width: '100%',
  },
  mBot: {
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
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