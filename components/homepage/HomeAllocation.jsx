import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, TextInput } from 'react-native'
import { getIcon } from '../../constants/icons';
import { Icon } from '@rneui/themed';
import { schedulePushNotification } from '../../utils/notification';


const HomeAllocation = ({category, expenses, type}) => {
  const [ indiStyle, setIndiStyle ] = useState([styles.indicatorStyle]);
  const [ expense, setExpense ] = useState(0);
  const [ icon, setIcon ] = useState(null);
  const [ percentage, setPercentage ] = useState(0); 

  const percentageHandler = () => {
    if (expense >= category.allocation) {
      setPercentage(100);
      return;
    } else if (expense === 0) {
      setPercentage(1);
    } else {
      setPercentage(Math.floor(expense/category.allocation * 100))
    }
  }

  useEffect(()=> {
    if (expense >= category.allocation) {
      schedulePushNotification("overspend", category.name)
      setIndiStyle([...indiStyle, styles.indicatorRed])
    } else {
      setIndiStyle([...indiStyle, styles.indicatorGreen])
    }

    percentageHandler();
  }, [expense])

  useEffect(() => {
    expenses.map((expense) => {
      if (expense.category === category.name) {
        setExpense(expense.amount);
      }
    })
    
    setIcon(getIcon(category.iconId));
  }, [])

  return (
    <View style={styles.main}>
      <View style={styles.topWrapper}>
        {icon ?
        <View style={styles.iconStyle}>{icon}</View>
        :
          <Icon
              name='wifi'
              type='font-awesome'
              color='#ffffff'
              style={styles.iconStyle}
              />
        }
        <View style={{flex: 1}}>
          <Text style={[styles.topText]}>{category.name}</Text>
          <Text style={[styles.bottomText]}>Php. {expense} / Php. {category.allocation}</Text>
        </View>
      </View>
      <View style={[indiStyle, styles.progressBar, { width: `${percentage}%`}]} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4
  },
  progressBar: {
    alignSelf: 'flex-start'
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 3,
    marginRight: 6,
    paddingHorizontal: 4,
    paddingVertical: 6,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#5087b9',
  },
  whiteText: {
    color: "#ffffff",
  },
  topText: {
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'flex-start',
    borderBottomColor: "#e9e9e9",
    borderBottomWidth: 1,
  },
  bottomText: {
    fontSize: 11,
  },
  indicatorStyle: {
    marginTop: 6,
    height: 6,
    width: '100%',
    flex: 1,
    backgroundColor: '#f1ecec',
    borderRadius: 4
  },
  indicatorGreen: {
    backgroundColor: '#15b225',
  },
  indicatorRed: {
    backgroundColor: '#c01f28',
  },
});

export default HomeAllocation