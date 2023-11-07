import React, { useState } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { FontAwesome5 } from '@expo/vector-icons';

const About = () => {
  const [ toggleTerms, setToggleTerms ] = useState(false);
  const [ togglePrivacy, setTogglePrivacy ] = useState(false);
  const [ toggleContacts, setToggleContacts ] = useState(false);
  
  const router = useRouter();

  const backHandler = () => {
    router.back();
  }

  return (
    <ScrollView style={[{position: 'relative', height: '100%'}]} contentContainerStyle={{alignItems: 'center'}}>
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
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>ABOUT</Text>
      </View>
      
      <View style={{marginTop: 8, width: '90%', gap: 8}}>


      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerDesign: {
    backgroundColor: '#1579b2',
    width: '100%',
    alignSelf: 'center',
    height: 80,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  itemStyle: {
    borderColor: '#000',
    borderWidth: 2,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16
  },
  innerItem: {
    marginTop: 4,
    width: '90%'
  },
  textBold: {
    fontWeight: '700',
  },
  textLg: {
    fontSize: 20
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
})

export default About