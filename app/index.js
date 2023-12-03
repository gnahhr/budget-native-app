import React from 'react'
import Logo from '../assets/logos/logo.png';
import LogoW from '../assets/logos/logo-w.png';
import { useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, StyleSheet, View, Button } from 'react-native';
import { useTheme } from '../context/theme';
import { COLORS } from '../constants/theme';

const Index = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleRegister = () => {
    router.push(`/register`)
  }

  const handleLogin = () => {
    router.push(`/login`)
  }

  return (
    <SafeAreaView style={[styles.main, theme === 'dark' && styles.darkMode]}>
      <View style={[styles.mainWrapper, theme === 'dark' && styles.darkWrap]}>
        <View>
          <Image source={theme === 'light' ? Logo : LogoW} style={styles.logo} />
          <Text style={[styles.header, theme === 'dark' && styles.textWhite]}>Welcome</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonStyle} title="Login" onPress={() => handleLogin()}/>
          <Button style={styles.buttonStyle} title="Register" onPress={() => handleRegister()}/>
          <Text style={[styles.textAccount, theme === 'dark' && styles.textWhite]}>Don't have an account yet? <Text>Register for free!</Text></Text>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1579b2',
    flex: 1,
  },
  mainWrapper: {
    padding: 75,
    backgroundColor: "white",
    gap: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    width: "120%",
    borderBottomLeftRadius: 225,
    borderBottomRightRadius: 225,
  },
  darkMode: {
    backgroundColor: COLORS['dblue-450']
  }, 
  darkWrap: {
    backgroundColor: COLORS['dblue-475'],
  }, 
  textWhite: {
    color: COLORS['white-700'],
  }, 
  logo: {
    alignSelf: "center",
  },
  header: {
    fontFamily: 'bold',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 43,
  },
  textAccount: {
    fontSize: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    minWidth: '90%',
    gap: 8,
    alignSelf: 'center',
  },
  buttonStyle: {
    color: '#1579b2',
    fontWeight: 'bold',
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: "20px",
    display: "block"
  }
})

export default Index
