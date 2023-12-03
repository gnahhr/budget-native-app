import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { toggle2FA } from '../../../api/login';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../../context/auth';
import { useTheme } from '../../../context/theme';
import { COLORS } from '../../../constants/theme';

const Security = () => {
  const [ is2FAEnabled, setIs2FAEnabled ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

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
    <View style={[{position: 'relative', alignItems: 'center', height: '100%'}, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['blue-500'] : COLORS['dblue-450']},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color={COLORS['white-700']} onPress={() => backHandler()}/>
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
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>SECURITY</Text>
      </View>
      
      <View style={[styles.settingsWrapper, styles.shadowProp, {marginTop: 20}, theme === 'dark' && styles.borderWhite]}>
        <View style={[styles.stretch]}>
          <Text style={[styles.fontLg, theme === 'dark' && styles.textWhite]}>Two-Factor Authentication</Text>
          <Text style={[styles.fontMd, theme === 'dark' && styles.textWhite]}>Authenticate with OTP</Text>
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
    backgroundColor: COLORS['blue-500'],
    width: '100%',
    alignSelf: 'center',
    height: 80,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550']
  },
  headerDark: {
    backgroundColor: COLORS['dblue-450']
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
  borderWhite: {
    borderColor: COLORS['white-700']
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