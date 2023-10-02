import React from 'react'
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

import Intro from '../components/onboarding/Intro';
import Step1 from '../components/onboarding/Step1';
import Step2 from '../components/onboarding/Step2';
import Step3 from '../components/onboarding/Step3';

import CustomIcon from '../components/common/CustomIcon';
import LogoS from '../assets/logos/logo-s.png';
import CloseIco from '../assets/icons/X.png';

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "white"},
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerRight: () => (
            <CustomIcon imageUrl={CloseIco} size={15}/>
          ),
          headerTitle: "",
        }}
      />

      {/* <Intro /> */}
      {/* <Step1 /> */}
      {/* <Step2 /> */}
      <Step3 />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    position: 'relative',
  },
})

export default Onboarding