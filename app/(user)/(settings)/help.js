import React, { useState } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-sw.png';
import { FontAwesome5 } from '@expo/vector-icons';

const Notifications = () => {
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
        <Text style={[styles.largeFont, styles.textBold, styles.textWhite, {alignSelf: 'center', marginBottom: 30}]}>HELP</Text>
      </View>
      
      <View style={{marginTop: 8, width: '90%', gap: 8}}>
        <Pressable onPress={() => setToggleTerms(!toggleTerms)}>
          <View style={[styles.itemStyle]}>
            <Text style={[styles.textBold, styles.textLg]}>Terms and Conditions</Text>
            {toggleTerms && <Text style={styles.innerItem}>{`Terms and Conditions of bSmart Budget Planner App

Please read the following Terms and Conditions carefully before using the bSmart Budget Planner App. By accessing or using the app, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these Terms and Conditions, please refrain from using the app.

        1.Use of the App

        1.1. The bSmart Budget Planner App is intended for personal use and for managing personal finances only. You agree not to use the app for any commercial or illegal purposes.

        1.2. You must provide accurate and complete information during the registration process and ensure that your account information remains up to date.

        1.3. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Any unauthorized use of your account must be reported immediately to the bSmart support team.

         2.Data Privacy and Security

         2.1. bSmart takes the privacy and security of your personal and financial information seriously. We employ reasonable measures to protect your data; however, we cannot guarantee absolute security.

         2.2. By using the app, you acknowledge and agree that bSmart may collect, store, and process your personal and financial information in accordance with our Privacy Policy.

         2.3. You are responsible for maintaining the security of your device and any login credentials associated with the app. You must notify bSmart immediately of any unauthorized access to your account or any other breach of security.

        3.Intellectual Property

        3.1. The bSmart Budget Planner App and its content, including but not limited to text, graphics, logos, icons, and software, are the property of bSmart or its licensors and are protected by applicable intellectual property laws.

       3.2. You may not copy, modify, distribute, transmit, display, reproduce, publish, license, create derivative works from, or sell any information or content obtained from the app without prior written permission from bSmart.

      4.Limitation of Liability

      4.1. bSmart and its affiliates, directors, employees, or agents shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the app.

      4.2. bSmart makes no warranties or representations regarding the accuracy, completeness, reliability, or suitability of the app for your specific needs. You agree to use the app at your own risk.

     5.Modifications and Termination

     5.1. bSmart reserves the right to modify or discontinue the app, temporarily or permanently, with or without notice.

     5.2. bSmart may update these Terms and Conditions from time to time. The most current version will be available on the app. By continuing to use the app after any modifications, you agree to be bound by the updated Terms and Conditions.

    6.Governing Law

    6.1. These Terms and Conditions shall be governed by and construed in accordance with the laws of. Any disputes arising under or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts in .
`}</Text>}
          </View>
        </Pressable>        

        <Pressable onPress={() => setTogglePrivacy(!togglePrivacy)}>
          <View style={[styles.itemStyle]}>
            <Text style={[styles.textBold, styles.textLg]}>Privacy and Policy</Text>
            {togglePrivacy && <Text style={styles.innerItem}>{`Effective Date: 5/28/2023

At bSmart, we value and respect your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our bSmart Budget Planner App. By using the app, you consent to the terms of this Privacy Policy.

Information We Collect

1.1. Personal Information: When you create an account on the bSmart Budget Planner App, we may collect personal information such as your name, email address, and other contact details.

1.2. Financial Information: To provide you with the budgeting features of the app, we may collect financial information such as income, expenses, and transaction details. Please note that we do not store your bank account or credit card information. We may request access to your financial accounts with your explicit consent, solely for the purpose of retrieving transaction data to assist with budgeting.

1.3. Usage Information: We collect information about your use of the app, including your interactions, preferences, and settings. This information helps us improve our app and provide a personalized experience.

How We Use Your Information

2.1. We use your personal information to:
Create and manage your account
Provide you with access to the features and functionality of the app
Personalize your experience and improve the app's performance
Communicate with you, respond to your inquiries, and provide customer support
Send you important notifications, updates, and promotional materials related to the app
`}</Text>}
          </View>
        </Pressable>

        <Pressable onPress={() => setToggleContacts(!toggleContacts)}>
          <View style={[styles.itemStyle]}>
            <Text style={[styles.textBold, styles.textLg]}>Contact Us</Text>
            {toggleContacts && <Text style={styles.innerItem}>bsmartapp23@gmail.com</Text>}
          </View>
        </Pressable>

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

export default Notifications