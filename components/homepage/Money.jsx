import React from 'react';
import { Text, View, StyleSheet, Pressable, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../context/theme';
import { COLORS } from '../../constants/theme';

const Money = ({currency, subText, onClickHandler}) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.wrapper, theme === 'light' ? styles.lightMode : styles.darkMode]}>
      <View>
        <Text style={[styles.currencyStyle, theme === 'dark' && styles.whiteText]}>Php. {currency}.00</Text>
        <Text style={[styles.subTextStyle, theme === 'dark' && styles.whiteText]}>{subText}</Text>
      </View>
      {onClickHandler &&
        <Pressable style={styles.iconStyle} onPress={onClickHandler}>
          <Feather name="edit" size={24} color={theme === 'light' ? COLORS['black-500'] : COLORS['white-700']} />
        </Pressable>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    width: 162,
    borderRadius: 8,
  },
  lightMode: {
    backgroundColor: COLORS['white-700'],
  },
  darkMode: {
    backgroundColor: COLORS['dblue-600'],
  },
  whiteText: {
    color: COLORS['white-500']
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