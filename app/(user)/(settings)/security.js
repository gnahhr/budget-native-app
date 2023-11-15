import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Switch } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { toggle2FA } from '../../../api/login';
import { useAuth } from '../../../context/auth';
import { FontAwesome5 } from '@expo/vector-icons';

import Button from '../../../components/common/Button';

const Security = () => {
  const [ is2FAEnabled, setIs2FAEnabled ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();

  const { user, signIn } = useAuth(); 

  useEffect(() => {
    if (user) {
      setIs2FAEnabled(JSON.parse(user).twoAuthRequired);
    }
  }, [user])

  async function update2FA() {
    if (!isLoading) {
      setIsLoading(true);
      const data = await toggle2FA(JSON.parse(user).email);

      if (data.statusCode === 200) {
        const parsed = JSON.parse(user);
        signIn(JSON.stringify({
          ...parsed,
          twoAuthRequired: !parsed.twoAuthRequired
        }))
      }

      setIsLoading(false);
    }
  }

  const backHandler = () => {
    router.back();
  }
  return (
    <View style={[{position: 'relative', alignItems: 'center', height: '100%'}]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "#1579b2"},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color="#FFF" onPress={() => backHandler()}/>
          ),
          headerRight: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>SECURITY</Text>
      </View>
      
      <View style={[styles.settingsWrapper, styles.shadowProp, {marginTop: 20}]}>
        <View style={[styles.stretch]}>
          <Text style={[styles.fontLg]}>Two-Factor Authentication</Text>
          <Text style={[styles.fontMd]}>Authenticate with OTP</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={is2FAEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => update2FA()}
          value={is2FAEnabled}
          disabled={isLoading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: '#1579b2',
    width: '100%',
    alignSelf: 'center',
    height: 80,
    // top: '-80%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
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
  settingsWrapper: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    width: '80%',
    borderRadius: 4,
    padding: 8,
    borderWidth: 2,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  stretch: {
    flex: 1
  },
  fontLg: {
    fontSize: 20,
  },
  fontMd: {
    fontSize: 10,
  }
})

export default Security