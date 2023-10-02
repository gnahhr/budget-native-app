import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { Icon } from '@rneui/themed';
import styles from './styles';

const Step2 = () => {
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ numInput, onChangeNumInput ] = useState("0");

  const totalBudgetHandler = () => {
    setTotalBudget(numInput);
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
          value={numInput}
          keyboardType="numeric"
        />
        
        <View style={[styles.center, styles.buttonWrapper, styles.navWrapper]}>
          <Pressable>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Back</Text>
          </Pressable>
          <Pressable>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>SUGGESTION</Text>
          </Pressable>
          <Pressable>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}



export default Step2