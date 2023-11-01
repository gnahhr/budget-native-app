import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import Button from './Button';
import { getDateTodayISO } from '../../utils/dateFunctions';
import { COLORS } from '../../constants/theme';

const DatePicker = ({isModalVisible, setModalVisible}) => {
  const [value, setValue] = useState(getDateTodayISO());

  const toggleModal = () => {
    console.log("yey");
    console.log(isModalVisible);
    setModalVisible();
  };

  const saveDateHandler = () => {
    return 
  }

  return (
    <Modal
      isVisible={!isModalVisible}
      animationIn="fade"
      animationOut="fade">
      <View style={styles.modalWrapper}>
        <View style={[styles.modalHeader]}>
          <Text style={[styles.textBold, styles.textHeader]}>Pick Date</Text>
          <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
        </View>
        <DateTimePicker
          value={value}
          mode='date'
          onValueChange={(date) => setValue(date)}
        />
        <Button label={"Pick date"} action={toggleModal}/>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: COLORS['white-500'],
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'scroll'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'er',
    justifyContent: 'space-between',
    flex: 1,
  },
  pill: {
    backgroundColor: COLORS['blue-500'],
    padcentding: 8,
    borderRadius: 8
  },
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: COLORS['white-500'],
  },
  textCenter: {
    textAlign: 'center',
  },
})

export default DatePicker