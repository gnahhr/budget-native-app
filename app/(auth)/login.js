import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import { useStorageState } from '../../hooks/useStorageState';
import { login } from '../../api/login';
import { Stack, useRouter, useRootNavigation } from 'expo-router';
import { Text, SafeAreaView, Image, StyleSheet, View, Button, TextInput, Pressable } from 'react-native';
import { useAuth } from '../../context/auth'
const Login = () => {
  const router = useRouter();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState(""); 
  const [ alert, setAlert ] = useState(""); 
  const [ isLoading, setIsLoading ] = useState(false);
  const [[isDataLoading, data], setData] = useStorageState('user');

  const { user, signIn } = useAuth();

  const handleRegister = () => {
    router.replace(`/register`)
  }

  async function handleLogin() {
    setIsLoading(true);
    setAlert("");

    const data = await login(email, password);
    setIsLoading(false);

    if (data?.statusCode === 409) {
      setAlert(data.message);
    }
    // userNam3- password
    if (data.statusCode === 200) {
      signIn(JSON.stringify({
        email: data.response.email,
        username: data.response.userName,
      }));

      router.replace(`/homepage`);
    }
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
          <Text style={[styles.header, styles.textCenter]}>Login</Text>
        </View>
      </View>
      
      <View style={[styles.container]}>
        {alert && <Text style={[styles.textRed, styles.textCenter, styles.textBold]}>{alert}</Text>}
        <View>
          <Text style={[styles.textWhite]}>Email Address</Text>
          <TextInput style={[styles.textInputStyle]} value={email} onChangeText={setEmail} />
        </View>
        <View>
          <Text style={[styles.textWhite]}>Password</Text>
          <TextInput style={[styles.textInputStyle]} value={password} onChangeText={setPassword} secureTextEntry></TextInput>
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <View style={[styles.flexRow]}>
            <Pressable style={[styles.checkbox]} />
            <Text style={[styles.textWhite, {marginLeft: 8}]}>Keep me logged in</Text>
          </View>
          <Pressable>
            <Text style={[styles.textHighlight, styles.textBold]}>Forgot Password</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.container, {marginTop: 60}]}>
        <Button style={styles.buttonStyle} title="Login" onPress={() => handleLogin()}/>
        <View style={[styles.flexRow, {gap: 8, justifyContent: 'center'}]}>
          <Text style={[styles.textAccount, styles.textWhite, styles.textCenter]}>Don't have an account yet?</Text>
          <Pressable onPress={() => handleRegister()}>
            <Text style={styles.textHighlight} onPress={() => handleRegister()}>Register for free!</Text>
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
    minWidth: '90%',
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

export default Login
