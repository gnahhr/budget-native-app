import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import LogoW from '../../assets/logos/logo-w.png';
import { forgotPassword } from '../../api/login';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, SafeAreaView, Image, View, TextInput, Pressable } from 'react-native';
import Button from '../../components/common/Button';
import styles from './authStyles';
import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/theme';

const ForgotPassword = () => {
  const router = useRouter();
  const [ email, setEmail ] = useState("");
  const [ alert, setAlert ] = useState(""); 
  // Change button to redirect login page
  const [ isSent, setIsSent ] = useState("");
  const [ isLoading, setIsLoading ] = useState("");
  const { theme } = useTheme();

  const handleBack = () => {
    router.back();
  }
  
  async function handleResetPassword() {
    if (email === "") return;
     
    setIsLoading(true);
    setAlert("");

    const data = await forgotPassword(email);
    setIsLoading(false);
    setAlert(data.message);

    if (data.statusCode === 200) {
      setIsSent(true);
    }

  }

  const handleRedirect = () => {
    router.replace('/login')
  }

  return (
    <SafeAreaView style={[styles.main, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen
        options={{
          headerStyle: theme === 'dark' && styles.darkWrap,
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => handleBack()}>
              <FontAwesome5 name="backspace" size={24} color={theme === 'light' ? COLORS['black-500'] : COLORS['white-700']} />
            </Pressable>
          ),
        }}
      />

      <View style={[styles.mainWrapper, theme === 'dark' && styles.darkWrap]}>
        <View>
          <Image source={theme === 'light' ? Logo : LogoW} style={styles.logo} />
          <Text style={[styles.header, styles.textCenter, theme === 'dark' && styles.textWhite]}>Forgot Password</Text>
        </View>
      </View>

      <View style={[styles.container]}>
        {alert && <Text style={[styles.textRed, styles.textCenter, styles.textBold]}>{alert}</Text>}
        <View>
          <Text style={[styles.textWhite]}>Enter your e-mail:</Text>
          <View>
            <TextInput style={[styles.textInputStyle]} value={email} onChangeText={setEmail}></TextInput>
          </View>
        </View>
      </View>

      <View style={[styles.container, {marginTop: 60}]}>
        {isSent ?
        <Button label="Go to Login" action={( ) => handleRedirect()} />
        : 
        <Button label="Reset Password" action={() => handleResetPassword()} isLoading={isLoading}/>}
      </View>

    </SafeAreaView>
  )
}

export default ForgotPassword
