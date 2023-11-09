import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import Button from '../common/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { getDateToday } from '../../utils/dateFunctions';

const AddExpenses = ({categoryList, isModalVisible, expenses, setModalVisible, onAddExpense}) => {
  const [ categoryState, setCategoryState ] = useState(categoryList);
  const [ amount, setAmount ] = useState("");
  const [ note, setNote ] = useState("");
  const [ date, setDate ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);

  // Drop Down States
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [ buttonActive, setButtonActive ] = useState(Number(amount) > 0 && !value); 

  const toggleModal = () => {
    setModalVisible(false);
    resetModal();
  };

  async function addExpenseHandler() {
    if (!value) return;

    if (Number(amount) > 0) {
      const expenseFilter = expenses.filter(item => item.category === value);
      const allocation = categoryList.filter(item => item.name === value)[0].allocation;
      const currentExpense = expenseFilter.length > 0 ? expenseFilter[0].amount : 0;
      
      if (allocation < currentExpense + amount) {
        // Alert.alert(
        //   'Exceeding amount!',
        //   'You are over budget. Are sure you want to continue?',
        //   [
        //     {
        //       text: 'Cancel',
        //       onPress: () => Alert.alert('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //   ],
        //   {
        //     text: 'Continue',
        //     onPress: () =>
        //       Alert.alert(
        //         'Yessir',
        //       ),
        //   },
        // );
      }
      setIsLoading(true);
      await onAddExpense(value, amount, note);
      setIsLoading(false);
      resetModal();
    }
  };

  const resetModal = () => {
    setValue(null);
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
    setButtonActive(Number(amount) > 0 && !!value)
  }, [value, amount])

  useEffect(() => {
    setDate(handleGetDate());
  }, [isModalVisible])

  useEffect(() => {
    setCategoryState(categoryList);
  }, [categoryList])

  useEffect(() => {
    if (categoryState) {
      setItems(categoryState.map(category => {
        return {
          label: category.name,
          value: category.name
        }
      }));
    }
  }, [categoryState])

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
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{}}
                />
              </View>
              <View>
                <Text style={[styles.textBold]}>Note</Text>
                <TextInput placeholder='Enter Note Expenses' value={note} onChangeText={setNote}/>
              </View>
              <View>
                <Text style={[styles.textBold]}>Amount</Text>
                <TextInput placeholder='Php. 00' keyboardType="numeric" onChangeText={setAmount}/>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: '#eff5f9', text: 'center'}}>
            <Text style={[styles.textBold, styles.textCenter]}>Transaction date and time:</Text>
            {/* Ideth */}
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