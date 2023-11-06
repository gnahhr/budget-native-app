import React, { useState, useEffect } from 'react'

// Constants
import { savingsCategories, needsCategories, wantCategories } from '../../constants/categories';
import styles from './styles';

// Components
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import Allocation from './Allocation';

const Summary = ({totalBudget, initialAllocation, prevStep, setAllocations, isLoading = false}) => {
  // Header Data
  const [ activeTab, setActiveTab ] = useState("NEED");
  const { needs, wants, savings} = initialAllocation;

  // Constants
  const tabData = {
    "NEED": {
      state: needs,
    },
    "SAVINGS": {
      state: savings,
    },
    "WANT": {
      state: wants,
    }
  }

  const Tabs = ["NEED", "SAVINGS", "WANT"];
  
  const setAllocationsHandler = () => {
    setAllocations({
      needs: needs.filter(category => {
        if (category.toggled) {
          return {
            ...category,
            icon: ""
          }
        }
      }),
      wants: wants.filter(category => {
        if (category.toggled) {
          return {
            ...category,
            icon: ""
          }
        }
      }),
      savings: savings.filter(category => {
        if (category.toggled) {
          return {
            ...category,
            icon: ""
          }
        }
      }),
    })
  }

  return (
    <View style={{position: 'relative'}}>
      {isLoading &&
        <View style={styles.loadingContainer}>
            <Text style={{alignSelf: 'center', flex: 1,}}>Loading...</Text>
        </View>
      }
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter]}>SUMMARY</Text>   
        <Text style={[styles.textBold, styles.textCenter]}>BUDGET PLANNER</Text>   
        <Text style={[styles.textBold, styles.textCenter]}>Php. {totalBudget}</Text>      
        <View style={[styles.center, styles.flexRow]}>
          {Tabs.map((tab) => {
            let passStyle = [styles.textCenter, styles.smallButton]
            if (activeTab === tab) {
              passStyle.push(styles.smallButtonHollow)
            } else {
              passStyle.push(styles.smallButtonHollowInactive)
            }
            return (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
              <Text style={passStyle}>{tab}</Text>
            </Pressable>)
          }
          )}
        </View>   
      </View>

      <View style={[styles.blueDrawer, styles.blueDrawerExpanded, styles.blueDrawerExpandedAllocation]}>
        <Text style={[styles.textCenter, styles.textWhite]}>EXPENSE ALLOCATION</Text>
        <ScrollView style={[styles.center, styles.containAllocation]}>
          {tabData[activeTab].state.filter(x => x.toggled).length > 0 &&
            tabData[activeTab].state.filter(x => x.toggled).map(x =>
              <Allocation key={x.name}
                          category={x.name}
                          curAllocation={x.allocation}
                          iconId={x.iconId}
                          />)
          }
        </ScrollView>
        
        <View style={[styles.center, styles.buttonWrapper, styles.navWrapper]}>
          <Pressable onPress={prevStep}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Back</Text>
          </Pressable>

          <Pressable onPress={setAllocationsHandler}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Summary