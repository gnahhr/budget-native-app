import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import { forgotPassword } from '../../api/login';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, View, TextInput } from 'react-native';
import Button from '../../components/common/Button';
import styles from './authStyles';

const ForgotPassword = () => {
  const router = useRouter();
  const [ email, setEmail ] = useState("");
  const [ alert, setAlert ] = useState(""); 
  // Change button to redirect login page
  const [ isSent, setIsSent ] = useState("");
  const [ isLoading, setIsLoading ] = useState("");

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
