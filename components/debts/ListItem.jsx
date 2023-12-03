import React, { useState, useEffect } from 'react';
import { COLORS } from '../../constants/theme';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { getDateTodayISO, formatDate } from '../../utils/dateFunctions';
import { schedulePushNotification } from '../../utils/notification';
import { useStorageState } from '../../hooks/useStorageState';
import { useTheme } from '../../context/theme';

const ListItem = ({name, balance, history, dueDate, type = "Lend"}) => {
  const [ toggled, setToggled ] = useState(false);
  const [ [isLoading, notifList], setNotifList ] = useStorageState("notifList");
  const [ [isSettingsLoading, notifSettings], setNotifSettings ] = useStorageState("notifSettings");
  const { theme } = useTheme();
  const textColor = balance === 0 ? styles.textGreen : theme === 'light' ? styles.textRed : styles.textLRed;

  const toggleHandler = () => {
    setToggled(!toggled);
  }

  async function handleNotification() {
    if (!isSettingsLoading) {
      if (JSON.parse(notifSettings).reminderDebtsLend){
        const data = await schedulePushNotification("dueDate", {
          type: type,
          name: name,
          date: formatDate(dueDate.split('T')[0]),
        }, true, notifList);
        setNotifList(JSON.stringify(data));
      }
    }
  }

  async function checkRemainingDays() {
    const dateTodayMilli = new Date(getDateTodayISO()).getTime();
    const dueDateMilli = new Date(dueDate.split('T')[0]).getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const remainingDays = (dueDateMilli - dateTodayMilli) / day;

    if (remainingDays < 3) {
      handleNotification();
    }
    
  }

  useEffect(() => {
    checkRemainingDays();
  }, [])

  return (
    <Pressable style={[styles.container, theme === 'dark' && styles.darkMode]} onPress={() => toggleHandler()}>
      <View style={[styles.flexRow]}>
        <Text style={[styles.stretch, styles.textBold, theme === 'dark' && styles.textWhite]}>{name}</Text>
        <Text style={[styles.stretch, styles.textEnd, styles.textBold, textColor]}>
          {balance > 0 ? `Php. ${balance}` : "Fully Paid"}
        </Text>
      </View>

      {toggled &&
        <View>
          {history.map((item, idx) => {
            return (
              <View key={idx} style={[styles.flexRow, styles.container]}>
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
  darkMode: {
    borderColor: COLORS['white-700'],
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
  textLRed: {
    color: COLORS['red-300'],
  },
  textRed: {
    color: COLORS['red-500'],
  },
  textWhite: {
    color: COLORS['white-700'],
  }
})

export default ListItem