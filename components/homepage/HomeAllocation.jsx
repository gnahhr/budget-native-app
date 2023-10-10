import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, TextInput } from 'react-native'
import { savingsCategories, needsCategories, wantCategories } from '../../constants/categories';
import { Icon } from '@rneui/themed';


const HomeAllocation = ({category, expenses, type}) => {
  const [ indiStyle, setIndiStyle ] = useState([styles.indicatorStyle]);
  const [ expense, setExpense ] = useState(0);
  const [ icon, setIcon ] = useState(null);

  const iconsList = {
    'needs': needsCategories,
    'wants': wantCategories,
    'savings': savingsCategories,
  }

  useEffect(()=> {
    if (expense > category.allocation) {
      setIndiStyle([...indiStyle, styles.indicatorRed])
    } else {
      setIndiStyle([...indiStyle, styles.indicatorGreen])
    }
  }, [expense])

  useEffect(() => {
    expenses.map((expense) => {
      if (expense.category === category.name) {
        setExpense(expense.amount);
      }
    })
    // Check if may same category from category list tska sa allocation,
    // If meron set niya yung icon from the list
    iconsList[type].map((icon) => {
      if (icon.name === category.name) {
        setIcon(icon.icon);
      }
    });
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
      <View style={[indiStyle]} />
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