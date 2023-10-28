import React, { useState } from 'react';
import { COLORS } from '../../constants/theme';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { formatDate } from '../../utils/dateFunctions';

const ListItem = ({name, balance, history, type = "Lend"}) => {
  const [ toggled, setToggled ] = useState(false);

  const textColor = type === "Lend" ? styles.textGreen : styles.textRed;

  const toggleHandler = () => {
    setToggled(!toggled);
  }

  return (
    <Pressable style={[styles.container]} onPress={() => toggleHandler()}>
      <View style={[styles.flexRow]}>
        <Text style={[styles.stretch, styles.textBold]}>{name}</Text>
        <Text style={[styles.stretch, styles.textEnd, styles.textBold, textColor]}>
          {balance > 0 ? `Php. ${balance}` : "Fully Paid"}
        </Text>
      </View>

      {toggled &&
        <View>
          {history.map(item => {
            return (
              <View style={[styles.flexRow, styles.container]}>
                <Text style={[styles.stretch, styles.textBold]}>{formatDate(item.paymentDate)}</Text>
                <Text style={[styles.stretch, styles.textBold, styles.textEnd]}>{item.amount}</Text>
              </View>
            )
          })}
        </View>
      }
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