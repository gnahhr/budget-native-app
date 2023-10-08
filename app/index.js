import React, { useEffect } from 'react'
import Logo from '../assets/logos/logo.png';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, StyleSheet, View, Button } from 'react-native';

const Index = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push(`/register`)
  }
  const handleLogin = () => {
    router.replace(`/login`)
  }

  return (
    <SafeAreaView style={styles.main}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <View style={styles.mainWrapper}>
        <View styles={styles.viewContainer}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.header}>Welcome</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonStyle} title="Login" onPress={() => handleLogin()}/>
          <Button style={styles.buttonStyle} title="Register" onPress={() => handleRegister()}/>
          <Text style={styles.textAccount}>Don't have an account yet? <Text>Register for free!</Text></Text>
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
  viewContainer: {
  },
  logo: {
    alignSelf: "center",
  },
  header: {
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
