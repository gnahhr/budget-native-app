import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import Button from '../common/Button';
import { getDateTodayISO, getWeeklyStartEnd } from '../../utils/dateFunctions';
import { COLORS } from '../../constants/theme';

const DatePicker = ({isModalVisible, setModalVisible, setDates, type="Daily", setDay}) => {
  const [value, setValue] = useState(getDateTodayISO());

  const toggleModal = () => {
    setModalVisible(false);
  };

  const saveDateHandler = () => {
    const dateISO = new Date(value.split('/').join('-')).toISOString().split('T')[0];
    const dateWeekly = getWeeklyStartEnd(dateISO);
    const month =  dateISO.split('T')[0].split('-').splice(0, 2).join('-');
    const year = dateISO.split('T')[0].split('-')[0];

    const dates = {
      'Daily': dateISO,
      'Weekly': dateWeekly,
      'Monthly': month,
      'Yearly': year,
    }
    // console.log(month);
    if (setDates) {
      setDates[type](dates[type])
    } else {
      setDay(dateISO);
    }

    setModalVisible(false);
  }
  return (
    <Modal
    isVisible={isModalVisible}
    animationIn="fadeIn"
    animationOut="fadeOut">
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
      <Button label={"Pick date"} action={saveDateHandler}/>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  pill: {
    backgroundColor: COLORS['blue-500'],
    padding: 8,
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