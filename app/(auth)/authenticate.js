import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import { verify2FA } from '../../api/login';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, View, TextInput } from 'react-native';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/auth';
import styles from './authStyles';
import { jwtDecode } from 'jwt-decode';
const ForgotPassword = () => {
  const router = useRouter();
  const [ code, setCode ] = useState("");
  const [ alert, setAlert ] = useState(""); 
  const [ isLoading, setIsLoading ] = useState(false);
  // Change button to redirect login page

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
          <Text style={[styles.header, styles.textCenter]}>2FA Authenticator</Text>
        </View>
      </View>

      <View style={[styles.container]}>
      {alert && <Text style={[styles.textRed, styles.textCenter, styles.textBold]}>{alert}</Text>}
        <View>
          <Text style={[styles.textWhite]}>Enter code:</Text>
          <View>
            <TextInput style={[styles.textInputStyle]} value={code} inputMode='numeric' onChangeText={setCode}></TextInput>
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
