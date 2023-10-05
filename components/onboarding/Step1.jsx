import React from 'react'
import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/themed';
import styles from './styles';

import Setup2 from '../../assets/images/setup2.png';

const Step1 = ({prevStep, setBudgetPlan, nextStep}) => {
  return (
    <View>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter]}>BUDGET PLANNER</Text>       
        <Image source={Setup2} style={styles.center}/>
        <Text style={[styles.textItalic, styles.containItem, styles.center]}>"Simplify your financial planning process and track your expenses effortlessly."</Text>
      </View>
      
      <View style={styles.blueDrawer}>
        <Icon
          name='chevron-down'
          type='font-awesome'
          color='#21abe5'
          onPress={prevStep}
          />
        <View style={[styles.center, styles.buttonWrapper, styles.blueDrawerExpanded]}>
          <Text style={[styles.textCenter, styles.whiteText]}>BUDGET PLAN</Text>
          <View style={[styles.containItem, styles.center, styles.buttonWrapper]}>
            <Pressable onPress={() => setBudgetPlan("WEEKLY")}>
              <Text style={[styles.textCenter, styles.bigButton]}>WEEKLY</Text>
            </Pressable>
            <Pressable onPress={() => setBudgetPlan("MONTHLY")}>
              <Text style={[styles.textCenter, styles.bigButton]}>MONTHLY</Text>
            </Pressable>
            {/* <Pressable onPress={nextStep}>
              <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Next</Text>
            </Pressable> */}
          </View>
        </View>
      </View>
    </View>
  )
}



export default Step1