import React from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import SampleImage from '../../../assets/chart/503020.png';
import { useAuth } from '../../../context/auth';

const SettingsIndex = () => {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const { username, email } = JSON.parse(user);

  const transactionsHandler = () => {
    router.push(`/(user)/(settings)/history`)
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

  const signOutHandler = () => {
    signOut();
    router.replace('/');
  };

  return (
    <View style={[{position: 'relative', alignItems: 'center'}]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "#1579b2"},
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign]}></View>

      <View style={{alignItems: 'center'}}>
        <Image source={SampleImage} style={[styles.iconStyle]}/>
        <Text style={[styles.textBold, styles.largeFont]}>{username}</Text>
        <Text style={[styles.textItalics]}>{email}</Text>
      </View>

      <View style={[styles.buttonWrapper, styles.buttonGap, {marginTop: 24}]}>
        <View style={[styles.buttonGap, {flexDirection: 'row'}]}>
          <View style={[styles.bigButton]}>
            <Pressable onPress={() => notificationsHandler()}>
              <Text style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>NOTIFICATIONS</Text>
            </Pressable>
          </View>
          <View style={[styles.buttonGap, {flex :1}]}>
            <Pressable onPress={() => editProfileHandler()}>
              <Text style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>EDIT PROFILE</Text>
            </Pressable>
            <Text style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>SECURITY</Text>
          </View>
        </View>
        <Pressable onPress={() => transactionsHandler()}>
          <Text style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>TRANSACTIONS</Text>
        </Pressable>
        <Pressable onPress={() => helpHandler()}>
          <Text style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>HELP</Text>
        </Pressable>
        <Pressable onPress={() => aboutHandler()}>
          <Text style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}>ABOUT</Text>
        </Pressable>
        <Pressable>
          <Text
            style={[styles.button, styles.textWhite, styles.textItalics, styles.textBold, styles.largeFont]}
            onPress={() => signOutHandler()}>LOG OUT</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: '#1579b2',
    width: '200%',
    alignSelf: 'center',
    height: 400,
    top: '-57%',
    position: 'absolute',
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
  },
  iconStyle: {
    height: 100,
    width: 100, 
    objectFit: 'contain',
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#ffffff'
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
  button: {
    backgroundColor: '#5C88C9',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
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