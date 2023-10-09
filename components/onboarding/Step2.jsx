import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { Icon } from '@rneui/themed';
import styles from './styles';

const Step2 = ({setBudget, nextStep, prevStep}) => {
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ numInput, onChangeNumInput ] = useState(0);

  const totalBudgetHandler = () => {
    const total = Number(numInput);
    setBudget(total)
    setTotalBudget(total);
  };

  return (
    <View>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter]}>BUDGET PLANNER</Text>       
        <Text style={[styles.textBold, styles.textCenter, styles.budgetMargin]}>Php. {totalBudget}</Text>   
      </View>
      
      <View style={[styles.blueDrawer, styles.blueDrawerExpanded]}>
        <Text style={[styles.textCenter, styles.textWhite]}>TOTAL BUDGET</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumInput}
          onSubmitEditing={() => totalBudgetHandler()}
          placeholder='0'
          value={String(numInput)}
          keyboardType="numeric"
        />
        
        <View style={[styles.center, styles.buttonWrapper, styles.navWrapper]}>
          <Pressable onPress={prevStep}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Back</Text>
          </Pressable>
          <Pressable onPress={nextStep}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}



export default Step2