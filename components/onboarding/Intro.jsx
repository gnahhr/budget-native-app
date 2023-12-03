import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

import Setup1 from '../../assets/images/setup1.png';
import styles from './styles';
import { useTheme } from '../../context/theme';

const Intro = ({nextStep}) => {
  const { theme } = useTheme();
  
  return (
    <View>
      <View style={[styles.main]}>
        <Image source={Setup1} style={styles.center}/>
        <Text style={[styles.textBold, styles.textCenter, theme === 'dark' && styles.whiteText]}>Allocate your funds with us accordingly.</Text>
      </View>
      
      <View style={[styles.blueDrawer, theme === 'dark' && styles.darkWrapper]}>
        <Icon
          name='chevron-up'
          type='font-awesome'
          color= {theme === 'light' ? '#21abe5' : '#2c6acc'}
          onPress={nextStep}/>
        <Text style={[styles.textBold, styles.textCenter, styles.textWhite ]}>Set your budget.</Text>
      </View>
    </View>
  )
}

export default Intro