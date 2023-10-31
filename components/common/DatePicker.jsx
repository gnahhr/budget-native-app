import React, { useState } from 'react'
import { Pressable, View, Text } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';

const DatePicker = ({isModalVisible, setModalVisible}) => {
  const [value, setValue] = useState(dayjs());

  const toggleModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fade"
      animationOut="fade">
      <View style={styles.container}>
        <Pressable onPress={() => toggleModal()}>
          <Text style={[{fontWeight: 700, textAlign: 'right'}]}>X</Text>
        </Pressable>
        <Text style={[{fontWeight: 700}]}>Pick Date</Text>
        <DateTimePicker
          value={value}
          onValueChange={(date) => setValue(date)}
        />
      </View>
    </Modal>
  )
}

export default DatePicker