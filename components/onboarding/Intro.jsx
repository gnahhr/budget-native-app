import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed';

import Setup1 from '../../assets/images/setup1.png';
import styles from './styles';

const Intro = ({nextStep}) => {
  return (
    <View>
      <View style={styles.main}>
        <Image source={Setup1} style={styles.center}/>
        <Text style={[styles.textBold, styles.textCenter]}>Allocate your funds with us accordingly.</Text>
      </View>
      
      <View style={styles.blueDrawer}>
        <Icon
          name='chevron-up'
          type='font-awesome'
          color='#21abe5'
          onPress={nextStep}/>
        <Text style={[styles.textBold, styles.textCenter, styles.textWhite ]}>Set your budget.</Text>
      </View>
    </View>
  )
}

export default Intro