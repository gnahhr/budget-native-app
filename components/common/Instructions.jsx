import React, { useState, useEffect } from 'react'
import { Pressable, View, Text, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '../../constants/theme';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { onboardingInstructions, homepageInstructions } from '../../constants/instructions';
import { useStorageState } from '../../hooks/useStorageState';

const Instructions = ({isModalVisible, setModalVisible, type="homepage"}) => {
  const instructions = {
    'homepage': homepageInstructions,
    'onboarding': onboardingInstructions,
  }
  const [ [isLoading, dontShowAgainInstruction], setDontShowAgainInstruction ] = useStorageState('dontShowAgainInstruction');
  const [ [isLoadingOnboarding, dontShowAgainOnboarding], setDontShowAgainOnboarding ] = useStorageState('dontShowAgainOnboarding');
  const [ maxSteps, setMaxSteps ] = useState(instructions[type].length);
  const [ curSteps, setCurSteps ] = useState(0);

  const nextStepHandler = () => {
    if (curSteps + 1 < maxSteps) {
      setCurSteps(curSteps + 1);
    }
  }

  const backStepHandler = () => {
    if (curSteps - 1 >= 0 ) {
      setCurSteps(curSteps - 1);
    }
  }

  const toggleModal = () => {
    

    Alert.alert(
      'Closing modal',
      `Don't show again next time?`,
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {
            setModalVisible(false);
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            if (type === 'homepage'){
              setDontShowAgainInstruction(JSON.stringify(true));
            } else if (type === 'onboarding') {
              setDontShowAgainOnboarding(JSON.stringify(true));
            }
            setModalVisible(false);
          },
          style: 'default',
        },
      ],
    );
  }

  return (
    <View
      style={[styles.modalWrapper, {zIndex: 9995}]}>
        <View style={[styles.modalWrapper]}>
          <Pressable style={{position: 'absolute', left: 5, color: 'white', top: '50%', zIndex: 9999}} onPress={() => backStepHandler()}>
            <FontAwesome name="chevron-circle-left" size={35} color="white" />
          </Pressable>
          <Pressable style={{position: 'absolute', right: 5, color: 'white', top: '50%', zIndex: 9999}} onPress={() => nextStepHandler()}>
            <FontAwesome name="chevron-circle-right" size={35} color="white" />
          </Pressable>
          <Pressable style={{position: 'absolute', right: 10, color: 'white', top: 10, zIndex: 9999}} onPress={() => toggleModal()}>
            <Ionicons name="md-close-circle" size={50} color="white" />
          </Pressable>
          <Image source={instructions[type][curSteps]} style={{width: '100%', height: '100%'}} contentFit='contain'/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  pill: {
    backgroundColor: COLORS['blue-500'],
    padding: 8,
    borderRadius: 8
  },
  unselectedPill: {
    backgroundColor: COLORS['blue-100'],
    padding: 8,
    borderRadius: 8
  },
  saveBtn: {
    color: COLORS['white-500'],
    backgroundColor: COLORS['blue-900'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: COLORS['white-500'],
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default Instructions