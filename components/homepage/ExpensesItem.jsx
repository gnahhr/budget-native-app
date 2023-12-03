import React, { useState, useEffect } from 'react';
import { COLORS } from '../../constants/theme';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { formatDate } from '../../utils/dateFunctions';
import { getIcon } from '../../constants/icons';
import { Icon } from '@rneui/themed';
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { editExpense } from '../../api/expenses';
import { useBudget } from '../../context/budget';
import { useTheme } from '../../context/theme';

const ExpensesItem = ({name, iconId, expenses, closeModal}) => {
  const [ toggled, setToggled ] = useState(false);
  const [ currentEdit, setCurrentEdit ] = useState(null);
  const [ amount, setAmount ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const icon = getIcon(iconId);
  const { activeBudget } = useBudget();
  const { theme } = useTheme();

  const toggleHandler = () => {
    setToggled(!toggled);
  }

  const handleEditToggle = (objId, amount) => {
    setCurrentEdit(objId);
    setAmount(amount);
  }

  async function saveExpenses() {
    if (isLoading) return;

    setIsLoading(true);
    const data = await editExpense(currentEdit, amount, activeBudget.budgetName);
    setIsLoading(false);

    if (data.statusCode === 200) {
      Alert.alert("Success!", "Expense updated successfully");
      setCurrentEdit(null);
      setAmount(0);
      closeModal();
    } else {
      Alert.alert("Error!", data.message);
    }
  }

  return (
    <>
    {isLoading &&
      <View style={styles.loadingContainer}>
          <Text style={{alignSelf: 'center', flex: 1,}}>Loading...</Text>
      </View>
    }
    <Pressable style={[styles.container, theme === 'dark' && styles.darkMode]} onPress={() => toggleHandler()}>
      <View style={[styles.flexRow, {alignItems: 'center', justifyContent: 'center'}]}>
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
        <Text style={[styles.stretch, styles.textBold, theme === 'dark' && styles.textWhite]}>{name}</Text>
      </View>

      {toggled &&
        <View>
          {expenses.map((item, idx) => {
            return (
              <View key={idx} style={[styles.flexRow, styles.container, , theme === 'dark' && styles.darkMode, {alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={[styles.stretch, styles.textBold, theme === 'dark' && styles.textWhite]}>{formatDate(item.createdAt)}</Text>
                {currentEdit === item._id ?
                  <TextInput
                  placeholder='Php. 00'
                  keyboardType="numeric"
                  value={String(amount)}
                  onChangeText={setAmount}
                  backgroundColor={theme === 'dark' && COLORS['grey-500']}
                  color={theme === 'dark' && COLORS['white-700']}
                  placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
                  :
                  <Text style={[styles.stretch, styles.textBold, styles.textEnd, theme === 'dark' && styles.textWhite]}>{item.amount}</Text>
                }
                {currentEdit === item._id ?
                  <>
                  {isLoading ?
                    <MaterialCommunityIcons name="loading" size={24} color={COLORS['white-500']} style={[styles.iconStyle, {marginLeft: 8, backgroundColor: COLORS['grey-500']}]} />
                    :
                    <Pressable onPress={() => saveExpenses()}>
                      <Entypo name="save" size={24} color={COLORS['white-500']} style={[styles.iconStyle, {marginLeft: 8, backgroundColor: COLORS['green-500']}]}/>
                    </Pressable>
                  }
                  </>
                  :
                  <Pressable onPress={() => handleEditToggle(item._id, item.amount)}>
                    <FontAwesome name="edit" size={24} color={COLORS['white-500']} style={[styles.iconStyle, {marginLeft: 8}]} />
                  </Pressable>
                }
                
              </View>
            )
          })}
        </View>
      }
    </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS['black-500'],
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  darkMode: {
    borderColor: COLORS['white-700'],
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '130%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  },
  iconStyle: {
    padding: 3,
    marginRight: 6,
    padding: 4,
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS['blue-100'],
  },
  flexRow: {
    flexDirection: 'row',
  },
  stretch: {
    flex: 1,
  },
  textEnd: {
    textAlign: 'right',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textGreen: {
    color: COLORS['green-500'],
  },
  textWhite: {
    color: COLORS['white-700'],
  },
  textRed: {
    color: COLORS['red-500'],
  }
})

export default ExpensesItem