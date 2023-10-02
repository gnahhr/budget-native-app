import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import styles from './styles';
import Allocation from './Allocation';

const Step3 = () => {
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ numInput, onChangeNumInput ] = useState("0");
  const [ activeTab, setActiveTab ] = useState("NEED");

  const totalBudgetHandler = () => {
    setTotalBudget(numInput);
  };

  const Tabs = ["NEED", "SAVINGS", "WANT"];

  return (
    <View>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter]}>BUDGET PLANNER</Text>       
        <View style={[styles.center, styles.flexRow]}>
          {Tabs.map((tab) => {
            let passStyle = [styles.textCenter, styles.smallButton]
            if (activeTab === tab) {
              passStyle.push(styles.smallButtonHollow)
            } else {
              passStyle.push(styles.smallButtonHollowInactive)
            }
            

            return (
            <Pressable key={tab}>
              <Text style={passStyle}>{tab}</Text>
            </Pressable>)
          }
          )}
        </View>   
      </View>
      
      <View style={[styles.blueDrawer, styles.blueDrawerExpanded, styles.blueDrawerExpandedAllocation]}>
        <Text style={[styles.textCenter, styles.textWhite]}>EXPENSE ALLOCATION</Text>
        <ScrollView>
          <Allocation category="FOOD" allocated={2000} icon={"yey"} />
          <Allocation category="FOOD" allocated={2000} icon={"yey"} />
          <Allocation category="FOOD" allocated={2000} icon={"yey"} />
          <Allocation category="FOOD" allocated={2000} icon={"yey"} />
          <Allocation category="FOOD" allocated={2000} icon={"yey"} />
          <Allocation category="FOOD" allocated={2000} icon={"yey"} />
        </ScrollView>
        
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



export default Step3