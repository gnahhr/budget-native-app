import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { updateUser } from '../../../api/login';
import Button from '../../../components/common/Button';

import { useAuth } from '../../../context/auth';
import { useTheme } from '../../../context/theme';
import { COLORS } from '../../../constants/theme';

import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const { user, signIn } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [ userName, setUserName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ newPassword, setNewPassword ] = useState();
  const [ conNewPassword, setConNewPassword ] = useState();
  const [ msg, setMsg ] = useState();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ displayImage, setDisplayImage ] = useState(JSON.parse(user).imageUrl);
	const [ image, setImage ] = useState(null);

  const backHandler = () => {
    router.back();
  }

  async function saveProfile() {    
    if (image || userName || password) {
        const formData = new FormData();
        
        if(image) {
          formData.append('imageUrl', {
            uri: image,
            type: "image/jpeg",
            name: "something.jpeg",
          });
        }
        
        if(userName) {
          formData.append('userName', userName);
        }
    
        if (password && !newPassword) {
          setMsg("New password should not be blank.");
          return;
        } else if (!password && newPassword) {
          setMsg("Old password should not be blank.");
          return;
        } else if (conNewPassword !== newPassword) {
          setMsg("Password mismatch!");
          return;
        } else if (password && newPassword) {
          formData.append('password', password);
          formData.append('newPassword', newPassword);
        }

        setIsLoading(true);
        const data = await updateUser(email, formData);
        setIsLoading(false);
    
        setMsg("")
    
        if (data?.statusCode === 200) {
          setMsg("Successfully changed account details");
          const parsedUser = JSON.parse(user);
          signIn(JSON.stringify({
            ...parsedUser,
            username: userName,
            imageUrl: data.response.imageUrl,
          }))
        } else {
          setMsg(data.message)
        }
    }

    if (!image) {
      return;
    }

    if (!userName) {
      setMsg("Username should not be blank");
      return;
    }
  }

	// Select image from library or camera
	const selectImage = async (useLibrary) => {
		let result;
		const options = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.75
		};

		if (useLibrary) {
			result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);
		}

		// Save image if not cancelled
		if (!result.canceled) {
			setImage(result.assets[0].uri);
      setDisplayImage(result.assets[0].uri);
		}
	};

  useEffect(() => {
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.username);
      setEmail(parsedUser.email);
    }
  }, [user])

  return (
    <View style={[{position: 'relative', alignItems: 'center', height: '100%'}, theme === 'dark' && styles.darkMode]}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['blue-500'] : COLORS['dblue-450']},
          headerShadowVisible: false,
          headerLeft: () => (
            <FontAwesome5 name="backspace" size={24} color="#FFF" onPress={() => backHandler()}/>
          ),
          headerRight: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={LogoS}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <View style={[styles.headerDesign, theme === 'dark' && styles.darkHeader, {justifyContent: 'flex-end', alignItems: 'flex-end'}]}>
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>EDIT USER</Text>
      </View>
      {msg && <Text>{msg}</Text>}
      
      <View style={{gap: 8, width: '80%', marginTop: 20}}>
        <Pressable onPress={() => selectImage(true)}>
          <View style={{position: 'relative', alignSelf: 'flex-start'}}>
            <Image source={{uri: displayImage}} width={80} height={80} style={{borderRadius: 50, borderWidth: 2, borderColor: theme === 'light' ? COLORS['black-500'] : COLORS['white-700']}}/>
            <View style={{position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', bottom: 0, right: 0, width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}} >
            <AntDesign name="camerao" size={16} color="white" />
            </View>
          </View>
        </Pressable>
        <Text style={[theme === 'dark' && styles.textWhite]}>Username</Text>
        <TextInput
          style={[styles.textInputStyle]}
          placeholder='Username'
          defaultValue={userName}
          value={userName}
          onChangeText={setUserName}
          backgroundColor={theme === 'dark' && COLORS['grey-500']}
          color={theme === 'dark' && COLORS['white-700']}
          placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
        <Text style={[theme === 'dark' && styles.textWhite]}>Email</Text>
        <TextInput 
          style={[styles.textInputStyle]} 
          placeholder='Email' 
          value={email} 
          onChangeText={setEmail} 
          editable={false}
          backgroundColor={theme === 'dark' && COLORS['grey-500']}
          color={theme === 'dark' && COLORS['white-700']}
          placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
        <Text style={[theme === 'dark' && styles.textWhite]}>Old Password</Text>
        <TextInput 
          style={[styles.textInputStyle]} 
          placeholder='Password' 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry={!showPassword}
          backgroundColor={theme === 'dark' && COLORS['grey-500']}
          color={theme === 'dark' && COLORS['white-700']}
          placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
        <Text style={[theme === 'dark' && styles.textWhite]}>New Password</Text>
        <TextInput 
          style={[styles.textInputStyle]} 
          placeholder='New Password' 
          value={newPassword} 
          onChangeText={setNewPassword} 
          secureTextEntry={!showPassword}
          backgroundColor={theme === 'dark' && COLORS['grey-500']}
          color={theme === 'dark' && COLORS['white-700']}
          placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
        <Text style={[theme === 'dark' && styles.textWhite]}>Confirm New Password</Text>
        <TextInput 
          style={[styles.textInputStyle]} 
          placeholder='Confirm New Password' 
          value={conNewPassword} 
          onChangeText={setConNewPassword} 
          secureTextEntry={!showPassword}
          backgroundColor={theme === 'dark' && COLORS['grey-500']}
          color={theme === 'dark' && COLORS['white-700']}
          placeholderTextColor={theme === 'dark' && COLORS['grey-300']}/>
        
        {/* <Button label="Photo Library" action={() => selectImage(true)} /> */}

        <View style={[styles.flexRow]}>
          <MaterialCommunityIcons 
                  name={!showPassword ? 'eye-off' : 'eye'} 
                  size={24} 
                  color={theme === 'light' ? COLORS['black-500'] : COLORS['white-700']}
                  style={{marginRight: 10}} 
                  onPress={() => setShowPassword(!showPassword)} 
          />
          <Text style={[theme === 'dark' && styles.textWhite]}>Show Password</Text>
        </View>
      </View>

      <View style={{marginBottom: 25}}>
        <Button label={"Save settings"} action={() => saveProfile()} isLoading={isLoading}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: COLORS['blue-500'],
    width: '100%',
    alignSelf: 'center',
    height: 80,
    // top: '-80%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  darkMode: {
    backgroundColor: COLORS['dblue-550']
  },
  darkHeader: {
    backgroundColor: COLORS['dblue-450']
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
    borderColor: COLORS['white-700']
  },
  textBold: {
    fontWeight: '700',
  },
  textItalics: {
    fontStyle: 'italic',
  },
  textWhite: {
    color: COLORS['white-700']
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
    backgroundColor: COLORS['white-700'],
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})

export default EditProfile