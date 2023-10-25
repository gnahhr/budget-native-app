import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logos/logo.png';
import { Stack, useRouter } from 'expo-router';
import { register } from '../../api/login';
import { useAuth } from '../../context/auth';
import { Text, SafeAreaView, Image, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import Button from '../../components/common/Button';
import styles from './authStyles';

const Register = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [ username, setUsername ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ conPassword, setConPassword ] = useState("");
  const [ alert, setAlert ] = useState(""); 

  async function handleRegister () {
    if (!username || !password || !email) {
      setAlert("Please enter all fields");
    } else if (password !== conPassword) {
      setAlert("Password mismatch!");
    } else {
      setIsLoading(true);
      setAlert("");

      const data = await register(username, email, password);

      setIsLoading(false);

      if (data?.statusCode === 422) {
        setAlert(data.message);
      }
      // If done na mag register, same sa login, save ng login creds sa localStorage then relocate na sa onboarding para makapag allocate
      if (data.statusCode === 201) {
        router.replace(`/onboarding`);
        signIn(JSON.stringify({
          email: data.response.email,
          username: data.response.userName,
          ifBudgetAllocationExists: data.response.ifBudgetAllocationExists 
        }));
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
        <Button label="Register" action={() => handleRegister()} isLoading={isLoading}/>
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

export default Register
