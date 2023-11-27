import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import Button from '../common/Button';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { getDateTodayISO, getDateWithOffset } from '../../utils/dateFunctions';
import { formatDatePicker } from '../../utils/dateFunctions';
import { addExtraBudget } from '../../api/budget';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

const ExtraBudgetModal = ({isModalVisible, setModalVisible}) => {
  const { user } = useAuth();
  const { activeBudget } = useBudget();
  
  const [ dueDate, setDueDate ] = useState(getDateWithOffset(getDateTodayISO(), 1));
  const [ note, setNote ] = useState("");
  const [ amount, setAmount ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isButtonActive, setIsButtonActive ] = useState(false);

  const toggleModal = () => {
    setModalVisible(false);
  };

  async function borrowMoneyHandler() {
    if (!note || Number(amount) <= 0) return;

    setIsLoading(true);
    
    const payload = {
      dateToBeAdded: formatDatePicker(dueDate),
      amount: Number(amount),
      note,
    }

    const email = JSON.parse(user).email;
    const data = await addExtraBudget(email, activeBudget.budgetName, payload);

    setIsLoading(false);
    if (data?.statusCode === 200) {
      setModalVisible(false);
      setNote("");
      setAmount(0);
      Alert.alert(
        "Success!",
        'Extra Budget Added!',
      )
    } else {
      Alert.alert(
        "Error!",
        data.message,
      )
    }
    
  };

  useEffect(() => {
    setIsButtonActive(!!note && Number(amount) > 0);
  }, [note, amount])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={styles.modalWrapper}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Extra Budget Allocator</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{gap: 16}}>
              <View>
                <Text style={[styles.textBold]}>Date</Text>
                <DateTimePicker
                  value={dueDate}
                  mode={'date'}
                  minimumDate={new Date(Date.now())}
                  onValueChange={(date) => setDueDate(date)}
                />
              </View>
              <View>
                <Text style={[styles.textBold]}>Amount</Text>
                <TextInput placeholder='Php. 00' keyboardType="numeric" onChangeText={setAmount}/>
              </View>
              <View>
                <Text style={[styles.textBold]}>Note</Text>
                <TextInput placeholder='Event Note' onChangeText={setNote}/>
              </View>
            </View>
          </View>

          <Button label={"Save"} action={() => borrowMoneyHandler()} isLoading={isLoading} active={isButtonActive}/>
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

export default ExtraBudgetModal