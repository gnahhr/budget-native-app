import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, SafeAreaView } from 'react-native'
import styles from './styles';

const Step2 = ({setBudget, setBudgetName, nextStep, prevStep}) => {
  const [ numInput, onChangeNumInput ] = useState(0);
  const [ name, setName ] = useState();

  const nextHandler = () => {
    const total = Number(numInput);
    setBudget(total);
    setBudgetName(name);
    nextStep();
  }

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter]}>BUDGET PLANNER</Text>       
        <Text style={[styles.textBold, styles.textCenter, styles.budgetMargin]}>Php. {numInput}</Text>   
      </View>
      
      <View style={[styles.blueDrawer, styles.blueDrawerExpanded]}>
        <Text style={[styles.textCenter, styles.textWhite]}>BUDGET NAME</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <Text style={[styles.textCenter, styles.textWhite]}>TOTAL BUDGET</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumInput}
          placeholder='0'
          value={String(numInput)}
          keyboardType="numeric"
        />
        
        <View style={[styles.center, styles.buttonWrapper, styles.navWrapper]}>
          <Pressable onPress={prevStep}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Back</Text>
          </Pressable>
          <Pressable onPress={() => nextHandler()}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}



export default Step2