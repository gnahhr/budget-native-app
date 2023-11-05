import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { useAuth } from '../../../context/auth';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { updateUser } from '../../../api/login';
import Button from '../../../components/common/Button';

const EditProfile = () => {
  const [ userName, setUserName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ newPassword, setNewPassword ] = useState();
  const [ conNewPassword, setConNewPassword ] = useState();
  const [ msg, setMsg ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  const { user } = useAuth();
  const router = useRouter();
  
  useState(() => {
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.username);
      setEmail(parsedUser.email);
    }
  }, [user])

  const backHandler = () => {
    router.back();
  }

  async function saveProfile() {
    if (conNewPassword !== newPassword) {
      setMsg("Password mismatch!")
      return;
    }
    
    if (!conNewPassword || !newPassword || !userName || !password) {
      setMsg("Fields should not be blank")
      return;
    }
    
    setIsLoading(true);
    const payload = {
      userName,
      password,
      newPassword
    }
    const data = await updateUser(email, payload)
    setIsLoading(false);

    setMsg("")
    if (data?.statusCode === 200) {
      setMsg("Successfully changed account details");
    } else {
      setMsg(data.message)
    }
  }
  return (
    <View style={[{position: 'relative', alignItems: 'center', height: '100%'}]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "#1579b2"},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color="#FFF" onPress={() => backHandler()}/>
          ),
          headerRight: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>EDIT USER</Text>
      </View>
      {msg && <Text>{msg}</Text>}
      
      <View style={{gap: 8, width: '80%', marginTop: 20}}>
        <Text>Username</Text>
        <TextInput style={[styles.textInputStyle]} placeholder='Username' defaultValue={userName} value={userName} onChangeText={setUserName}/>
        <Text>Email</Text>
        <TextInput style={[styles.textInputStyle]} placeholder='Email' value={email} onChangeText={setEmail} editable={false}/>
        <Text>Old Password</Text>
        <TextInput style={[styles.textInputStyle]} placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={!showPassword}/>
        <Text>New Password</Text>
        <TextInput style={[styles.textInputStyle]} placeholder='New Password' value={newPassword} onChangeText={setNewPassword} secureTextEntry={!showPassword}/>
        <Text>Confirm New Password</Text>
        <TextInput style={[styles.textInputStyle]} placeholder='Confirm New Password' value={conNewPassword} onChangeText={setConNewPassword} secureTextEntry={!showPassword}/>
        
        <View style={[styles.flexRow]}>
          <MaterialCommunityIcons 
                  name={!showPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color="#000"
                  style={{marginRight: 10}} 
                  onPress={() => setShowPassword(!showPassword)} 
          />
          <Text>Show Password</Text>
        </View>
      </View>

      <View style={{marginTop: 'auto', marginBottom: 25}}>
        <Button label={"Save settings"} action={() => saveProfile()} isLoading={isLoading}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: '#1579b2',
    width: '100%',
    alignSelf: 'center',
    height: 80,
    // top: '-80%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  flexRow: {
    flexDirection: 'row',
  },
  iconStyle: {
    height: 100,
    width: 100, 
    objectFit: 'contain',
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#ffffff'
  },
  textBold: {
    fontWeight: '700',
  },
  textItalics: {
    fontStyle: 'italic',
  },
  textWhite: {
    color: '#ffffff'
  },
  largeFont: {
    fontSize: 25
  },
  buttonWrapper: {
    width: '90%',
  },
  buttonGap: {
    gap: 8,
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

export default EditProfile