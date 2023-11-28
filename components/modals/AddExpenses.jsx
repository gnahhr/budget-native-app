import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import Button from '../common/Button';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { getDateToday } from '../../utils/dateFunctions';

const AddExpenses = ({categoryList, selected = null ,isModalVisible, expenses, setModalVisible, onAddExpense}) => {
  const [ amount, setAmount ] = useState("");
  const [ note, setNote ] = useState("");
  const [ date, setDate ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ buttonActive, setButtonActive ] = useState(Number(amount)); 

  const toggleModal = () => {
    setModalVisible(false);
    resetModal();
  };

  async function addExpenseHandler() {
    if (Number(amount) < 1) return;

    if (Number(amount) > 0) {
      const expenseFilter = expenses.filter(item => item.category === selected.name);
      const allocation = categoryList.filter(item => item.name === selected.name)[0].allocation;
      const currentExpense = expenseFilter.length > 0 ? expenseFilter[0].amount : 0;
      const exceeded = Number(allocation) < Number(currentExpense) + Number(amount);
      const alertHeader = exceeded ? 'Exceeding amount!' : 'Confirm expense:';
      const alertText = exceeded ? 'You are over budget. Are sure you want to continue?' : `Add ${amount} on ${selected.name}?`;

      Alert.alert(
        alertHeader,
        alertText,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              setIsLoading(true);
              await onAddExpense(selected.name, amount, note);
              setIsLoading(false);
              resetModal();
            },
            style: 'default',
          },
        ],
        {
          text: 'Continue',
        },
      );
    }
  };

  const resetModal = () => {
    setAmount("");
    setNote("");
  }

  const handleGetDate = () => {
    return getDateToday(false);
  }

  // Pangkuha ng date today
  useEffect(() => {
    setDate(handleGetDate());
  }, [])

  useEffect(() => {
    setButtonActive(Number(amount) > 0)
  }, [amount])

  useEffect(() => {
    setDate(handleGetDate());
  }, [isModalVisible])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={styles.modalWrapper}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Add Expenses</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{gap: 16}}>
              <View>
                <Text style={[styles.textBold]}>Expense Category</Text>
                <Text>{selected && `${selected.name} - `}<Text style={[styles.textBold]}>Php. {selected && selected.allocation}</Text></Text>
              </View>
              <View>
                <Text style={[styles.textBold]}>Note</Text>
                <TextInput placeholder='e.g. Went out with friends' value={note} onChangeText={setNote}/>
              </View>
              <View>
                <Text style={[styles.textBold]}>Amount</Text>
                <TextInput placeholder='Php. 00' keyboardType="numeric" onChangeText={setAmount}/>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: '#eff5f9', text: 'center'}}>
            <Text style={[styles.textBold, styles.textCenter]}>Transaction date and time:</Text>
            <Text style={[styles.textCenter]}>{date}</Text>
          </View>

          <Button label={"Add Expense"} action={() => addExpenseHandler()} isLoading={isLoading} active={buttonActive}/>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: '#ffffff',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: -20,
    overflow: 'scroll'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
  modalSubText: {
    fontStyle: 'italic',
  },
  categoriesWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonStyle: {
    backgroundColor: '#11588B',
    padding: 4,
    borderRadius: 16,
    marginTop: 16
  },
  inactiveButton: {
    backgroundColor: 'grey',
  }
})

export default AddExpenses