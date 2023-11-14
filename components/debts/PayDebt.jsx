import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Button from '../common/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { getDateToday } from '../../utils/dateFunctions';
import { receiveAndPay } from '../../api/debt';
import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';
const PayDebt = ({nameList, isModalVisible, setModalVisible, type}) => {
  const [ nameState, setNameState ] = useState(nameList);
  const [ amount, setAmount ] = useState(amount);
  const [ date, setDate ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isButtonActive, setIsButtonActive ] = useState(false);

  // Drop Down States
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  const toggleModal = () => {
    setModalVisible(false);
  };

  const label = {
    "Debt": "Pay Debt",
    "Lend": "Receive Money"
  }

  async function addExpenseHandler() {
    if (!value || amount <= 0) return; 

    setIsLoading(true);
    const debtType = type === 'Debt' ? 'borrowed' : 'lend';

    const payload = {
      name: value,
      payments: {
        amount: amount
      },
      debtType: debtType
    }
    
    const email = JSON.parse(user).email;
    const data = await receiveAndPay(email, activeBudget.budgetName, payload);
    setIsLoading(false);

    if (data?.statusCode === 200) {
      setModalVisible(false);
    }
    
  };

  const handleGetDate = () => {
    return getDateToday(false);
  }

  // Pangkuha ng date today
  useEffect(() => {
    setDate(handleGetDate());
  }, [])

  useEffect(() => {
    setDate(handleGetDate());
  }, [isModalVisible])

  useEffect(() => {
    setIsButtonActive(value && amount);
  }, [value, amount])

  useEffect(() => {
    setNameState(nameList);
  }, [nameList])

  useEffect(() => {
    if (nameState) {
      setItems(nameState.map(name => {
        return {
          label: name,
          value: name
        }
      }));
    }
  }, [nameState])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={styles.modalWrapper}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>{label[type]}</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{gap: 16}}>
              <View>
                <Text style={[styles.textBold]}>Name</Text>
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
                <Text style={[styles.textBold]}>Amount</Text>
                <TextInput placeholder='Php. 00' keyboardType="numeric" onChangeText={setAmount}/>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: '#eff5f9', text: 'center'}}>
            <Text style={[styles.textBold, styles.textCenter]}>Transcation date and time:</Text>
            {/* Ideth */}
            <Text style={[styles.textCenter]}>{date}</Text>
          </View>

          <Button label={"Add Expense"} action={() => addExpenseHandler()} isLoading={isLoading} active={isButtonActive}/>
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
  }
})

export default PayDebt