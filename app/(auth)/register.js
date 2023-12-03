import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logos/logo.png';
import LogoW from '../../assets/logos/logo-w.png';
import { Stack, useRouter } from 'expo-router';
import { register } from '../../api/login';
import { useAuth } from '../../context/auth';
import { useTheme } from '../../context/theme';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Text, Image, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

import Button from '../../components/common/Button';
import styles from './authStyles';
import { COLORS } from '../../constants/theme';

const Register = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const { theme } = useTheme();
  const [ username, setUsername ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ conPassword, setConPassword ] = useState("");
  const [ alert, setAlert ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);

  const handleBack = () => {
    router.back();
  }

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

      // If done na mag register, same sa login, save ng login creds sa localStorage then relocate na sa onboarding para makapag allocate
      if (data.statusCode === 201) {
        signIn(JSON.stringify({
          email: data.response.email,
          username: data.response.userName,
          ifNewUser: data.response.ifNewUser,
          imageUrl: `https://res.cloudinary.com/diwlgnbqc/image/upload/v1683221873/b9vfcnko2112n69whgla.jpg`,
        }));
        router.replace(`/onboarding`);
      } else {
        setAlert(data.message);
      }
    }
  }

  const handleLogin = () => {
    router.replace(`login`)
  }

  return (
    <KeyboardAvoidingView
      style={[styles.main, theme === 'dark' && styles.darkMode]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: theme === 'dark' && styles.darkWrap,
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
          <Text style={[styles.header, styles.textCenter, theme === 'dark' && styles.textWhite]}>Register</Text>
        </View>
      </View>

      <View style={styles.container}>
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
          <TextInput style={[styles.textInputStyle]} value={password} onChangeText={setPassword} secureTextEntry={!showPassword}></TextInput>
        </View>
        <View>
          <Text style={[styles.textWhite]}>Confirm Password</Text>
          <TextInput style={[styles.textInputStyle]} value={conPassword} onChangeText={setConPassword} secureTextEntry={!showPassword}></TextInput>
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
        </View>

        <View style={[styles.container, {marginTop: 60}]}>
          <Button label="Register" action={() => handleRegister()} isLoading={isLoading}/>
          <View style={[styles.flexRow, {gap: 8, justifyContent: 'center'}]}>
            <Text style={[styles.textAccount, styles.textWhite, styles.textCenter]}>Already have an account?</Text>
            <Pressable onPress={() => handleLogin()}>
              <Text style={styles.textHighlight}>Tap here to login!</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register
