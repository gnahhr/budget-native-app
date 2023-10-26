import React from 'react'
import { View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const DatePicker = () => {
  const [value, setValue] = useState(dayjs());


  return (
    <View style={styles.container}>
      <DateTimePicker
        value={value}
        onValueChange={(date) => setValue(date)}
      />
    </View>
  )
}

export default DatePicker