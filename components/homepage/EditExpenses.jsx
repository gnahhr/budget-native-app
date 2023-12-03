import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/theme';
import { AntDesign } from '@expo/vector-icons';
import ExpensesItem from './ExpensesItem';
import { useTheme } from '../../context/theme';

const EditExpenses = ({isModalVisible, setModalVisible, expensesList, refreshData}) => {
  const { theme } = useTheme();

  const toggleModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={[styles.modalWrapper, theme === 'dark' && styles.darkMode]}>
            <View style={[styles.modalHeader]}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:8}}>
                <Text style={[styles.textBold, styles.textHeader, theme === 'dark' && styles.textWhite]}>Edit Expenses</Text>
              </View>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View>
              <ScrollView
                  contentContainerStyle={{
                    gap: 8,
                    paddingBottom: 2000,
                  }}
                  style={{
                    marginVertical: 8,
                    maxHeight: '90%',
                  }}>  
                {expensesList && expensesList.map((item, idx) => <ExpensesItem name={item.name} iconId={item.iconId} expenses={item.expenses} closeModal={toggleModal}/>)}
              </ScrollView>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: COLORS['white-700'],
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    height: '80%',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'scroll'
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550']
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: '#ffffff',
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default EditExpenses;