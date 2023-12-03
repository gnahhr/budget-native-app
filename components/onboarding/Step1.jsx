import React from 'react'
import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from '@rneui/themed';
import styles from './styles';
import { useTheme } from '../../context/theme';
import Setup2 from '../../assets/images/setup2.png';

const Step1 = ({prevStep, setBudgetPlan, nextStep}) => {
  const { theme } = useTheme();

  return (
    <View>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter, theme === 'dark' && styles.whiteText]}>BUDGET PLANNER</Text>       
        <Image source={Setup2} style={styles.center}/>
        <Text style={[styles.textItalic, styles.containItem, styles.center, theme === 'dark' && styles.whiteText]}>"Simplify your financial planning process and track your expenses effortlessly."</Text>
      </View>
      
      <View style={[styles.blueDrawer, theme === 'dark' && styles.darkWrapper]}>
        <Icon
          name='chevron-down'
          type='font-awesome'
          color= {theme === 'light' ? '#21abe5' : '#2c6acc'}
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