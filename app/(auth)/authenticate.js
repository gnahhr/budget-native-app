import React, { useState } from 'react'
import Logo from '../../assets/logos/logo.png';
import { forgotPassword } from '../../api/login';
import { Stack, useRouter } from 'expo-router';
import { Text, SafeAreaView, Image, View, TextInput } from 'react-native';
import Button from '../../components/common/Button';
import styles from './authStyles';

const ForgotPassword = () => {
  const router = useRouter();
  const [ code, setCode ] = useState("");
  const [ alert, setAlert ] = useState(""); 
  // Change button to redirect login page
  const [ isSent, setIsSent ] = useState("");

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
        <View>
          <Text style={[styles.textWhite]}>Enter code:</Text>
          <View>
            <TextInput style={[styles.textInputStyle]} value={code} onChangeText={setCode}></TextInput>
          </View>
        </View>
      </View>

      <View style={[styles.container, {marginTop: 60}]}>
        <Button label="Reset Password" action={() => handleResetPassword()}/>
      </View>

    </SafeAreaView>
  )
}

export default ForgotPassword
