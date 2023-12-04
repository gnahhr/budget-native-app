import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import LogoW from '../../assets/logos/logo-w.png';

import { login } from '../../api/login';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, View, TextInput, Pressable } from 'react-native';
import { useAuth } from '../../context/auth'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import styles from './authStyles';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '../../context/theme';
import { COLORS } from '../../constants/theme';

const Login = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState(""); 
  const [ alert, setAlert ] = useState(""); 
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  const { signIn, setAuthEmail } = useAuth();

  const handleRegister = () => {
    router.replace(`/register`)
  }

  const handleBack = () => {
    router.back();
  }

  const handlePassword = () => {
    router.replace(`/forgotPassword`);
  }

  async function handleLogin() {
    if (email === "" || password === "") return;
     
    setIsLoading(true);
    setAlert("");

    const data = await login(email, password);
    setIsLoading(false);

    // pagka successfully na nag login store niya yung login credentials sa localStorage
    // acts as indicator if logged in na or hindi pa yung user then relocate siya sa homepage
    if (data.statusCode === 200 && data.response) {
      const decoded = jwtDecode(data.response.data.token);
      
      signIn(JSON.stringify({
        email: decoded.email,
        username: decoded.userName,
        ifNewUser: decoded.ifNewUser,
        defaultBudget: data.response.data.defaultBudget,
        imageUrl: decoded.imageUrl,
        twoAuthRequired: decoded.twoAuthRequired,        
      }));

      if (decoded.ifNewUser) {
        router.replace(`/onboarding`);
      } else {
        router.replace(`/homepage`);
      }

    } else if (data.statusCode === 200) {
      router.replace(`/authenticate?${email}`);
      setAuthEmail(email);
    } else {
      setAlert(data.message);
    }
  }

  return (
    <SafeAreaView style={[styles.main, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen
        options={{
          headerStyle: theme === 'dark' && styles.darkWrap,
          headerLeft: () => (
            <Pressable onPress={() => handleBack()}>
              <FontAwesome5 name="backspace" size={24} color={theme === 'light' ? COLORS['black-500'] : COLORS['white-700']} />
            </Pressable>
          ),
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <View style={[styles.mainWrapper, theme === 'dark' && styles.darkWrap]}>
        <View>
          <Image source={theme === 'light' ? Logo : LogoW} style={styles.logo} />
          <Text style={[styles.header, styles.textCenter, theme === 'dark' && styles.textWhite]}>Login</Text>
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
          <View>
            <TextInput style={[styles.textInputStyle]} value={password} onChangeText={setPassword} secureTextEntry={!showPassword}></TextInput>
          </View>
        </View>
        <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
          <View style={[styles.flexRow]}>
            <MaterialCommunityIcons 
                    name={!showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#FFF"
                    style={{marginRight: 10}} 
                    onPress={() => setShowPassword(!showPassword)} 
            />
            <Text style={[styles.textWhite]}>Show Password</Text>
          </View>
          <Pressable onPress={() => handlePassword()}>
            <Text style={[styles.textHighlight, styles.textBold]}>Forgot Password</Text>
          </Pressable>
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
