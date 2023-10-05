import React from 'react';
import { Text, View, StyleSheet, Pressable, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Money = ({currency, subText, onClickHandler}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.currencyStyle}>Php. {currency}.00</Text>
        <Text style={styles.subTextStyle}>{subText}</Text>
      </View>
      {onClickHandler &&
        <Pressable style={styles.iconStyle} onPress={onClickHandler}>
          <Feather name="edit" size={24} color="black" />
        </Pressable>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    width: 162,
    borderRadius: 8,
  },
  currencyStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subTextStyle: {
    fontStyle: 'italic',
    fontSize: 10,
  },
  iconStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
  }
});

export default Money