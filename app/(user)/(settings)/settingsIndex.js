import React from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import { COLORS } from '../../../constants/theme';
import LogoS from '../../../assets/logos/logo-sw.png';
import { Image } from 'expo-image';
import { useAuth } from '../../../context/auth';
import { useTheme } from '../../../context/theme';

const SettingsIndex = () => {
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const { username, email, imageUrl } = JSON.parse(user);

  const transactionsHandler = () => {
    router.push(`/(user)/(settings)/history`)
  }

  const extraBudgetHandler = () => {
    router.push(`/(user)/(settings)/extraBudget`)
  }

  const notificationsHandler = () => {
    router.push(`/(user)/(settings)/notifications`)
  }

  const editProfileHandler = () => {
    router.push(`/(user)/(settings)/editProfile`)
  }

  const helpHandler = () => {
    router.push(`/(user)/(settings)/help`)
  }

  const aboutHandler = () => {
    router.push(`/(user)/(settings)/about`)
  }

  const securityHandler = () => {
    router.push(`/(user)/(settings)/security`)
  }

  const signOutHandler = () => {
    signOut();
    router.replace('/');
  };

  return (
    <View style={[{position: 'relative', alignItems: 'center', flex: 1}, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['blue-500'] : COLORS['dblue-450']},
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={LogoS}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, theme === 'dark' && styles.darkHeader]}></View>

      <View style={{alignItems: 'center'}}>
        <Image source={{uri: `https:${imageUrl.split(":")[1]}`}} style={[styles.iconStyle]}/>
        <Text style={[styles.textBold, styles.largeFont, theme === 'dark' && styles.textWhite]}>{username}</Text>
        <Text style={[styles.textItalics, theme === 'dark' && styles.textWhite]}>{email}</Text>
      </View>

      <View style={[styles.buttonWrapper, styles.buttonGap, {marginTop: 24}]}>
        <View style={[styles.buttonGap, {flexDirection: 'row'}]}>
          <View style={[styles.bigButton, theme === 'dark' && styles.btnDark]}>
            <Pressable onPress={() => notificationsHandler()}>
              <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>NOTIFICATIONS</Text>
            </Pressable>
          </View>
          <View style={[styles.buttonGap, {flex :1}]}>
            <Pressable onPress={() => editProfileHandler()}>
              <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>EDIT PROFILE</Text>
            </Pressable>
            <Pressable onPress={() => securityHandler()}>
              <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>SECURITY</Text>
            </Pressable>
          </View>
        </View>
        <Pressable onPress={() => transactionsHandler()}>
          <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>TRANSACTIONS</Text>
        </Pressable>
        <Pressable onPress={() => extraBudgetHandler()}>
          <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>EXTRA BUDGET</Text>
        </Pressable>
        <Pressable onPress={() => helpHandler()}>
          <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>HELP</Text>
        </Pressable>
        <Pressable onPress={() => aboutHandler()}>
          <Text style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>ABOUT</Text>
        </Pressable>
        <Pressable>
          <Text
            style={[styles.button, theme === 'dark' && styles.btnDark, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}
            onPress={() => signOutHandler()}>LOG OUT</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: COLORS['blue-500'],
    width: '200%',
    alignSelf: 'center',
    height: 400,
    top: '-45%',
    position: 'absolute',
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
  },
  darkHeader:{
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
    color: COLORS['white-700']
  },
  largeFont: {
    fontSize: 23
  },
  buttonWrapper: {
    width: '90%',
  },
  buttonGap: {
    gap: 8,
  },
  button: {
    backgroundColor: COLORS['blue-100'],
    padding: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  },
  btnDark: {
    backgroundColor: COLORS['dblue-600']
  },
  bigButton: {
    flow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#5c88c9',
    borderRadius: 8,
  }
})

export default SettingsIndex