import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logos/logo.png';
import { Stack, useRouter } from 'expo-router';
import { register } from '../../api/login';
import { Text, SafeAreaView, Image, StyleSheet, View, Button, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

const Register = () => {
  const router = useRouter();
  const [ username, setUsername ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ conPassword, setConPassword ] = useState("");
  const [ alert, setAlert ] = useState(""); 

  async function handleRegister () {
    if (password !== conPassword) {
      setAlert("Password mismatch!");
    } else {
      setIsLoading(true);
      setAlert("");

      const data = await register(username, email, password);
      
      setIsLoading(false);

      if (data?.statusCode === 422) {
        setAlert(data.message);
      }

      if (data?.statusCode === 201) {
        router.push(`/login`)
      }
    }
  }

  const handleLogin = () => {
    router.replace(`login`)
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
        <View>
          <Image source={Logo} style={styles.logo} />
          <Text style={[styles.header, styles.textCenter]}>Register</Text>
        </View>
      </View>
      
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        {alert && <Text style={[styles.textRed, styles.textCenter, styles.textBold]}>{alert}</Text>}
        <View>
          <Text style={[styles.textWhite]}>Username</Text>
          <TextInput style={[styles.textInputStyle]} value={username} onChangeText={setUsername}/>
        </View>
        <View>
          <Text style={[styles.textWhite]}>Email Address</Text>
          <TextInput style={[styles.textInputStyle]} value={email} onChangeText={setEmail}/>
        </View>
        <View>
          <Text style={[styles.textWhite]}>Password</Text>
          <TextInput style={[styles.textInputStyle]} value={password} onChangeText={setPassword} secureTextEntry></TextInput>
        </View>
        <View>
          <Text style={[styles.textWhite]}>Confirm Password</Text>
          <TextInput style={[styles.textInputStyle]} value={conPassword} onChangeText={setConPassword} secureTextEntry></TextInput>
        </View>
      </KeyboardAvoidingView>

      <View style={[styles.container, {marginTop: 60}]}>
        <Button style={styles.buttonStyle} title="Register" onPress={() => handleRegister()}/>
        <View style={[styles.flexRow, {gap: 8, justifyContent: 'center'}]}>
          <Text style={[styles.textAccount, styles.textWhite, styles.textCenter]}>Already have an account?</Text>
          <Pressable onPress={() => handleLogin()}>
            <Text style={styles.textHighlight}>Tap here to login!</Text>
          </Pressable>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#0f5074',
    flex: 1,
  },
  mainWrapper: {
    backgroundColor: "white",
    justifyContent: 'center',
    alignSelf: 'center',
    width: "120%",
    paddingBottom: 25,
    borderBottomLeftRadius: 225,
    borderBottomRightRadius: 225,
    marginBottom: 24,
  },
  flexRow: {
    flexDirection: 'row',
  },
  logo: {
    alignSelf: "center",
    width: 200,
    objectFit: 'contain',
  },
  header: {
    fontSize: 32,
  },
  textWhite: {
    color: '#ffffff'
  },
  textRed: {
    color: '#c01f28',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
  },
  textHighlight: {
    color: '#59BDF4',
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
  container: {
    width: '90%',
    gap: 8,
    alignSelf: 'center',
    marginVertical: 8,
  },
  buttonStyle: {
    color: '#1579b2',
    fontWeight: 'bold',
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: "20px",
    display: "block"
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 3,
  },
  checkboxActive: {
    backgroundColor: '#FFFFFF',
  }
})

export default Register
