import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'

import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import Button from '../../../components/common/Button';
import ExtraBudgetModal from '../../../components/modals/ExtraBudgetModal';

import { FontAwesome5 } from '@expo/vector-icons';
import { formatDate, getDateTodayISO } from '../../../utils/dateFunctions';
import { getAllExtraBudget } from '../../../api/budget';
import { COLORS } from '../../../constants/theme';
import { useStorageState } from '../../../hooks/useStorageState';
import { useAuth } from '../../../context/auth';
import { useBudget } from '../../../context/budget';
import { useTheme } from '../../../context/theme';
import { schedulePushNotification } from '../../../utils/notification';

const ExtraBudget = () => {
  const { user } = useAuth();
  const { activeBudget } = useBudget();
  const { theme, toggleTheme } = useTheme();

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ extraList, setExtraList ] = useState([]);

  const [ [isLoading, notifList], setNotifList ] = useStorageState("notifList");

  const router = useRouter();

  const backHandler = () => {
    router.back();
  }

  async function handleNotification(value) {
    const data = await schedulePushNotification("extraBudget", value, true, notifList);
    setNotifList(JSON.stringify(data));
  }

  const modalToggleHandler = () => {
    setIsModalOpen(true);
  }

  async function getAllExtra() {
    const email = JSON.parse(user).email;
    const data = await getAllExtraBudget(email, activeBudget.budgetName);

    setExtraList(data.response);
  }

  useEffect(() => {
    getAllExtra();
  }, [isModalOpen])

  useEffect(() => {
    extraList.forEach((item) => {
      if (item.dateToBeAdded.split('T')[0] === getDateTodayISO()) {
        handleNotification(item.note)
      }
    })
  }, [extraList])

  return (
    <View style={[{position: 'relative', alignItems: 'center', height: '100%'}, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['blue-500'] : COLORS['dblue-450']},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color="#FFF" onPress={() => backHandler()}/>
          ),
          headerRight: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={LogoS}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, theme === 'dark' && styles.headerDark, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>EXTRA BUDGETS</Text>
      </View>
      
      <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
        {extraList && 
        extraList.map(item =>
          <View style={[styles.items, theme === 'dark' && styles.headerDark]}>
            <Text style={[styles.textWhite, styles.textBold]}>{item.note}</Text>
            <Text style={[styles.textWhite, styles.textBold]}>Php. {item.amount}</Text>
            <Text style={[styles.textWhite, styles.textBold, {flex: 1, textAlign: 'right'}]}>{formatDate(item.dateToBeAdded)}</Text>
          </View>
        )
        }
      </ScrollView>
      <Button label={"Add Extra Budget"} isLoading={false} action={() => modalToggleHandler()}/>
      <ExtraBudgetModal isModalVisible={isModalOpen} setModalVisible={setIsModalOpen} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: COLORS['blue-500'],
    width: '100%',
    alignSelf: 'center',
    height: 80,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550'],
  },
  headerDark: {
    backgroundColor: COLORS['dblue-450'],
  },
  items: {
    flexDirection: 'row',
    width: '80%',
    gap: 8,
    backgroundColor: COLORS['blue-500'],
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
    margin: 8,
  },
  flexRow: {
    flexDirection: 'row',
  },
  iconStyle: {
    height: 100,
    width: 100, 
    objectFit: 'contain',
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS['white-700']
  },
  textBold: {
    fontWeight: '700',
  },
  textItalics: {
    fontStyle: 'italic',
  },
  textWhite: {
    color: COLORS['white-700']
  },
  largeFont: {
    fontSize: 25
  },
  buttonWrapper: {
    width: '90%',
  },
  buttonGap: {
    gap: 8,
  },
  textInputStyle: {
    backgroundColor: COLORS['white-700'],
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

export default ExtraBudget