import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native'

import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { FontAwesome5 } from '@expo/vector-icons';

import SettingsItem from '../../../components/common/SettingsItem';
import Button from '../../../components/common/Button';

import { useStorageState } from '../../../hooks/useStorageState';
import { useTheme } from '../../../context/theme';
import { COLORS } from '../../../constants/theme';

const Notifications = () => {
  const [ settings, setSettings ] = useState();
  const [[isNotifSetLoading, notifSettings], setNotifSettings] = useStorageState('notifSettings');
  const settingKeys = ['reminderEveryday', 'reminderOverspend', 'reminderDebtsLend'];
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const settingValues = {
    'reminderEveryday': {
      text: 'Reminder Everyday',
      subText: 'Reminder to add expenses'
    },
    'reminderOverspend': {
      text: 'Reminder Overspend',
      subText: 'Remind to your overspend budget'
    },
    'reminderDebtsLend': {
      text: 'Reminder Debts/Lend',
      subText: 'Remind due dates to your debts or lends'
    }
  }

  useEffect(() => {
    if (!isNotifSetLoading) {
      setSettings(JSON.parse(notifSettings));
    }
  }, [isNotifSetLoading])

  const updateSettings = (key, value) => {
    let tempSettings = settings;
    tempSettings[key] = value;
    setSettings(tempSettings);
  }
  
  const saveSettings = () => {
    setNotifSettings(JSON.stringify(settings));
    Alert.alert('SUCCESS', 'Settings has been saved!', [
      {
        text: 'Okay',
        style: 'cancel'
      }
    ])
  }

  const backHandler = () => {
    router.back();
  }
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
      <View style={[styles.headerDesign, theme === 'dark' && styles.darkHeader, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>NOTIFICATIONS</Text>
      </View>
      
      {isNotifSetLoading ?
        <Text>Loading....</Text>
        :
        <View style={{gap: 8, marginTop: 50}}>
          {settings && settingKeys.map(key => <SettingsItem key={key} setting={key} text={settingValues[key].text} subText={settingValues[key].subText} value={settings[key]} onToggleAction={updateSettings}/>)}
        </View>
      }

      <View style={{marginTop: 'auto', marginBottom: 25}}>
        <Button label={"Save settings"} action={() => saveSettings()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: COLORS['blue-500'],
    width: '100%',
    alignSelf: 'center',
    height: 80,
    // top: '-80%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  darkHeader: {
    backgroundColor: COLORS['dblue-450']
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550']
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
    color: '#ffffff'
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
})

export default Notifications