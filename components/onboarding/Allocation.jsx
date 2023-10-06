import React, { useState, useEffect } from 'react'
import { View, Image, Text, StyleSheet, TextInput } from 'react-native'
import { Icon } from '@rneui/themed';


const Allocation = ({category, curAllocation, icon, allocationHandler, checkExceeding}) => {
  const [ allocation, onChangeAllocation ] = useState(0);

  const onChangeHandler = () => {
    if (checkExceeding(curAllocation, allocation)) {
      if (!allocationHandler(category, allocation)) {
        onChangeAllocation(curAllocation);
      }
    } else {
      onChangeAllocation(curAllocation);
    }
  }

  useEffect(() => {
    onChangeAllocation(curAllocation);
  }, [curAllocation])

  return (
    <View style={styles.main}>
      <Icon
          name='wifi'
          type='font-awesome'
          color='#ffffff'
          style={styles.iconStyle}
          />
      <View>
        <Text style={[styles.topText, styles.whiteText]}>{category}</Text>
        <View style={styles.sideBySide}>
          <Text style={[styles.bottomText, styles.whiteText]}>Php. </Text>
          <TextInput
            placeholder="0"
            value={allocation}
            inputMode='numeric'
            onChangeText={onChangeAllocation}
            onSubmitEditing={onChangeHandler}
            style={[styles.bottomText, styles.whiteText]} />
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "70%",
    alignSelf: 'center',
    backgroundColor: '#5cafc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4
  },
  sideBySide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 3,
    marginRight: 6,
  },
  whiteText: {
    color: "#ffffff",
  },
  topText: {
    fontSize: 16,
    fontWeight: 700,
    alignSelf: 'flex-start',
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  bottomText: {
    fontSize: 11,
  }
});

export default Allocation