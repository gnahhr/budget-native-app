import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import LogoW from '../../assets/logos/logo-w.png';
import { jwtDecode } from 'jwt-decode';
import { verify2FA } from '../../api/login';
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, View, TextInput, Pressable } from 'react-native';
import Button from '../../components/common/Button';

import styles from './authStyles';
import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/theme';
import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
  const router = useRouter();
  const [ code, setCode ] = useState("");
  const [ alert, setAlert ] = useState(""); 
  const { theme } = useTheme();
  const [ isLoading, setIsLoading ] = useState(false);

  const { email, signIn } = useAuth();

  async function handleSendCode() {
    if (code === "") return;
     
    setIsLoading(true);
    setAlert("");
    const data = await verify2FA(email, Number(code));
    setIsLoading(false);
    
    // pagka successfully na nag login store niya yung login credentials sa localStorage
    // acts as indicator if logged in na or hindi pa yung user then relocate siya sa homepage
    if (data.statusCode === 200) {
      const decoded = jwtDecode(data.response.data.token);
      
      signIn(JSON.stringify({
        email: decoded.email,
        username: decoded.userName,
        ifNewUser: decoded.ifNewUser,
        defaultBudget: data.response.data.defaultBudget,
        imageUrl: decoded.imageUrl,
        twoAuthRequired: decoded.twoAuthRequired, 
      }));

      router.replace(`/homepage`);
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
          <Text style={[styles.header, styles.textCenter, theme === 'dark' && styles.textWhite]}>2FA Authenticator</Text>
        </View>
      </View>

      <View style={[styles.container]}>
      {alert && <Text style={[styles.textRed, styles.textCenter, styles.textBold]}>{alert}</Text>}
        <View>
          <Text style={[styles.textWhite]}>Enter code:</Text>
          <View>
            <TextInput
              style={[styles.textInputStyle]}
              value={code}
              onChangeText={setCode}
              backgroundColor={theme === 'dark' && COLORS['grey-500']}
              color={theme === 'dark' && COLORS['white-700']}
              placeholderTextColor={theme === 'dark' && COLORS['grey-300']}></TextInput>
          </View>
        </View>
      </View>

      <View style={[styles.container, {marginTop: 60}]}>
        <Button label="Enter Code" action={() => handleSendCode()} isLoading={isLoading}/>
      </View>

    </SafeAreaView>
  )
}

export default ForgotPassword
