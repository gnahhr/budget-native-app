import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import { login } from '../../api/login';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, View, TextInput, Pressable } from 'react-native';
import { useAuth } from '../../context/auth'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import styles from './authStyles';
import { jwtDecode } from 'jwt-decode';
const Login = () => {
  const router = useRouter();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState(""); 
  const [ alert, setAlert ] = useState(""); 
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  const { user, signIn } = useAuth();

  const handleRegister = () => {
    router.replace(`/register`)
  }

  async function handleLogin() {
    if (email === "" || password === "") return;
     
    setIsLoading(true);
    setAlert("");

    const data = await login(email, password);
    setIsLoading(false);
    const decoded = jwtDecode(data.response.data.token);

    // pagka successfully na nag login store niya yung login credentials sa localStorage
    // acts as indicator if logged in na or hindi pa yung user then relocate siya sa homepage
    if (data.statusCode === 200) {
      signIn(JSON.stringify({
        email: decoded.email,
        username: decoded.userName,
        ifNewUser: decoded.ifNewUser,
        defaultBudget: data.response.data.defaultBudget,
        imageUrl: decoded.imageUrl,
      }));
      router.replace(`/homepage`);
    } else {
      setAlert(data.message);
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
          <Text style={[styles.header, styles.textCenter]}>Forgot Password</Text>
        </View>
      </View>

      <View style={[styles.container, {marginTop: 60}]}>
        {/* <Button style={styles.buttonStyle} title="Login" onPress={() => handleLogin()}/> */}
        <Button label="Login" action={() => handleLogin()} isLoading={isLoading}/>
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

export default Login
