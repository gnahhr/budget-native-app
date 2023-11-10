import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'
import { getIcon } from '../../constants/icons';
import { Icon } from '@rneui/themed';
import { schedulePushNotification } from '../../utils/notification';
import { deleteCategory } from '../../api/budget';
import { useStorageState } from '../../hooks/useStorageState';
import { COLORS } from '../../constants/theme';
import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';
import { AntDesign } from '@expo/vector-icons';


const HomeAllocation = ({category, expenses, type, getAllocation}) => {
  const [ indiStyle, setIndiStyle ] = useState([styles.indicatorStyle]);
  const [ expense, setExpense ] = useState(0);
  const [ icon, setIcon ] = useState(null);
  const [ percentage, setPercentage ] = useState(0); 
  const [ [isLoading, notifList], setNotifList ] = useStorageState("notifList");
  const [ [isSettingsLoading, notifSettings], setNotifSettings ] = useStorageState("notifSettings");
  
  const { user } = useAuth();
  const { activeBudget } = useBudget();

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

  async function handleNotification() {
    if (!isSettingsLoading) {
      if (JSON.parse(notifSettings).reminderOverspend){
        const data = await schedulePushNotification("overspend", category.name, true, notifList);
        setNotifList(JSON.stringify(data));
      }
    }
  }

  async function deleteCategoryHandler() {
    Alert.alert(
      "Warning!",
      `Are you sure you want to delete ${category.name} to the allocation?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const data = await deleteCategory(JSON.parse(user).email, activeBudget.budgetName, type, category.name);

            if (data.statusCode === 200) {
              Alert.alert("Category removed successfully");
              getAllocation();
            } else {
              Alert.alert(data.message);
            }
          },
          style: 'default',
        },
      ],
      {
        text: 'Continue',
      },
    );
  }

  useEffect(()=> {
    if (expense > category.allocation && !isLoading) {
      handleNotification();
      setIndiStyle([...indiStyle, styles.indicatorRed])
    } else if (expense / category.allocation > .8 && !isLoading) {
      setIndiStyle([...indiStyle, styles.indicatorYellow])
    } else {
      setIndiStyle([...indiStyle, styles.indicatorGreen])
    }
    percentageHandler();

  }, [expense, isLoading, isSettingsLoading])

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
        <Pressable onPress={() => deleteCategoryHandler()}>
          <AntDesign name="delete" size={25} color={COLORS['white-700']} style={[styles.iconStyle, styles.redIcon]} />
        </Pressable>
      </View>
      <View style={[indiStyle, styles.progressBar, { width: `${percentage}%`}]} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    alignSelf: 'center',
    backgroundColor: COLORS['white-500'],
    // alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4
  },
  redIcon: {
    backgroundColor: COLORS['red-500'],
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
    padding: 4,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS['blue-100'],
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
    backgroundColor: COLORS['green-500'],
  },
  indicatorRed: {
    backgroundColor:  COLORS['red-500'],
  },
  indicatorYellow: {
    backgroundColor: COLORS['yellow-500']
  }
});

export default HomeAllocation