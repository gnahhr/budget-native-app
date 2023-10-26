import React from 'react';
import { COLORS } from '../../constants/theme';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ListItem = ({name, balance, type = "Lend"}) => {
  const textColor = type === "Lend" ? styles.textGreen : styles.textRed;

  return (
    <Pressable style={[styles.flexRow, styles.container]}>
      <Text style={[styles.stretch, styles.textBold]}>{name}</Text>
      <Text style={[styles.stretch, styles.textEnd, styles.textBold, textColor]}>
        {balance > 0 ? `Php. ${balance}` : "Fully Paid"}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS['black-500'],
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  flexRow: {
    flexDirection: 'row',
  },
  stretch: {
    flex: 1,
  },
  textEnd: {
    textAlign: 'right',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textGreen: {
    color: COLORS['green-500'],
  },
  textRed: {
    color: COLORS['red-500'],
  }
})

export default ListItem