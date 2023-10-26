import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Button from '../common/Button';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { getDateToday } from '../../utils/dateFunctions';
import { formatDatePicker } from '../../utils/dateFunctions';
import { borrowAndLend } from '../../api/debt';

import { useAuth } from '../../context/auth';

const BorrowMoney = ({isModalVisible, setModalVisible}) => {
  const [ dueDate, setDueDate ] = useState(dayjs());
  const [ date, setDate ] = useState(); 
  const [ name, setName ] = useState("");
  const [ amount, setAmount ] = useState(0);
  const [ interest, setInterest ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const { user } = useAuth();

  const toggleModal = () => {
    setModalVisible(false);
  };

  async function borrowMoneyHandler() {
    setIsLoading(true);
    const payload = {
      dueDate: formatDatePicker(dueDate),
      name: name,
      totalDebt: amount,
      interest: interest,
      debtType: 'borrowed',
    }
    const email = JSON.parse(user).email;
    const data = await borrowAndLend(email, payload);
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

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={styles.modalWrapper}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Borrow Money</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{gap: 16}}>
              <View>
                <Text style={[styles.textBold]}>Due Date</Text>
                <DateTimePicker
                  value={dueDate}
                  mode={'date'}
                  minimumDate={new Date(Date.now())}
                  onValueChange={(date) => setDueDate(date)}
                />
              </View>
              <View>
                <Text style={[styles.textBold]}>Name</Text>
                <TextInput placeholder='Enter Person in Debt' value={name} onChangeText={setName}/>
              </View>
              <View>
                <Text style={[styles.textBold]}>Amount</Text>
                <TextInput placeholder='Php. 00' keyboardType="numeric" value={amount} onChangeText={setAmount}/>
              </View>
              <View>
                <Text style={[styles.textBold]}>Interest</Text>
                <TextInput keyboardType="numeric" value={interest} onChangeText={setInterest}/>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: '#eff5f9', text: 'center'}}>
            <Text style={[styles.textBold, styles.textCenter]}>Transcation date and time:</Text>
            <Text style={[styles.textCenter]}>{date}</Text>
          </View>

          <Button label={"Save"} action={() => borrowMoneyHandler()} isLoading={isLoading}/>
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

export default BorrowMoney