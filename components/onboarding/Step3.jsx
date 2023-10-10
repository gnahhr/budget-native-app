import React, { useState, useEffect } from 'react'

// Constants
import { savingsCategories, needsCategories, wantCategories } from '../../constants/categories';
import styles from './styles';

// Components
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import Categories from '../modals/Categories';
import Suggestions from '../modals/Suggestions';
import Allocation from './Allocation';

const Step3 = ({totalBudget, prevStep, currentAllocations, nextStep, setAllocations}) => {

  // Header Data
  const [ activeTab, setActiveTab ] = useState("NEED");
  const [ remaining, setRemaining ] = useState(totalBudget);

  // Modal States
  const [ isCategoryVisible, setCategoryVisible ] = useState(false);
  const [ isRecoVisible, setRecoVisible ] = useState(false);

  // Expense Allocation
  const [ needAllocations, setNeedAllocations ] = useState(needsCategories);
  const [ wantAllocations, setWantAllocations ] = useState(wantCategories);
  const [ savingAllocations, setSavingAllocations ] = useState(savingsCategories);

  // BudgetRatio
  const [ needRatio, setNeedRatio ] = useState(0);
  const [ wantRatio, setWantRatio ] = useState(0);
  const [ savingRatio, setSavingRatio ] = useState(0);

  // Total Expenses
  const [ totalSavings, setTotalSavings ] = useState(0);
  const [ totalWant, setTotalWant ] = useState(0);
  const [ totalNeed, setTotalNeed ] = useState(0);

  // Constants
  const tabData = {
    "NEED": {
      state: needAllocations,
      setAllocation: setNeedAllocations,
      ratio: needRatio,
      alt: "needs",
    },
    "SAVINGS": {
      state: savingAllocations,
      setAllocation: setSavingAllocations,
      ratio: savingRatio,
      alt: "savings",
    },
    "WANT": {
      state: wantAllocations,
      setAllocation: setWantAllocations,
      ratio: wantRatio,
      alt: "wants",
    }
  }

  const Tabs = ["NEED", "SAVINGS", "WANT"];

  const checkExceeding = (curAllocation = 0, newAllocation = 0) => {
    const totalAllocations = totalSavings + totalWant + totalNeed - Number(curAllocation);

    if ((totalAllocations + Number(newAllocation)) <= totalBudget) {
      return true;
    } else {
      exceedingWarning();
      return false;
    }
  }

  const exceedingWarning = () => {
    Alert.alert('Warning', 'You have exceeded the allocated budget!', [
      {
        text: 'Okay',
        style: 'cancel'
      }
    ])
  }

  const getAllocationSum = (categoryList) => {
    if (!categoryList) return 0;
    return categoryList.filter(category => category.toggled).reduce((sum = 0, category) => sum + Number(category.allocation), 0);
  }

  // Handlers
  const modalToggleHandler = (modalType) => {
    switch(modalType) {
      case 'CATEGORY':
        setCategoryVisible(true);
        break;
      case 'SUGGESTION':
        setRecoVisible(true);
        break;
    }
  }
  
  const setAllocationsHandler = () => {
    const needs = needAllocations.filter(category => category.toggled);
    const wants = wantAllocations.filter(category => category.toggled);
    const savings = savingAllocations.filter(category => category.toggled);

    setAllocations({
      needs: needs,
      wants: wants,
      savings: savings,
    })
  }

  const setRatioHandler = (needsRatio, wantsRatio, savingRatio) => {
    setNeedRatio(needsRatio);
    setWantRatio(wantsRatio);
    setSavingRatio(savingRatio);
  }

  const nextStepHandler = () => {
    setAllocationsHandler();
    nextStep();
  }

  const allocationHandler = (name, allocation) => {
    const newData = tabData[activeTab].state.map(x => {
      if (x.name === name) {
        return {
          ...x,
          allocation: allocation
        }
      } else {
        return x;
      }
    })
    
    const totalAllocation = newData.reduce((sum, category) => sum + Number(category.allocation), 0);
    const percentage = tabData[activeTab].ratio ? tabData[activeTab].ratio / 100 : 1;

    if (totalAllocation > totalBudget * percentage){
      Alert.alert('Warning', 'You have exceeded the allocated budget!', [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
      return false;
    }
    
    tabData[activeTab].setAllocation(newData);
  };

  const currentAllocationHandler = (curAllocation) => {
    const types = ['WANT', 'NEED', 'SAVINGS'];
    
    types.map((type) => {
      const container = [...tabData[type].state, ...curAllocation[tabData[type].alt]];
      const newContainer = [];
      const uniqueContainer = {};

      for (let item in container) {
          category = container[item]['name'];

          if (uniqueContainer[category] !== undefined) {
            uniqueContainer[category] = {
              ...uniqueContainer[category],
              allocation: container[item].allocation,
              toggled: true,
            }
          } else {
            uniqueContainer[category] = container[item]; 
          }
      }

      for (i in uniqueContainer) {
        newContainer.push(uniqueContainer[i]);
      }
      
      tabData[type].setAllocation(newContainer);
    })
  };

  useEffect(() => {
    setTotalWant(getAllocationSum(wantAllocations));
  }, [wantAllocations])
  
  useEffect(() => {
    setTotalNeed(getAllocationSum(needAllocations));
  }, [needAllocations])
  
  useEffect(() => {
    setTotalSavings(getAllocationSum(savingAllocations));
  }, [savingAllocations])

  useEffect(() => {
    if (currentAllocations) {
      currentAllocationHandler(currentAllocations);
    }
  }, [currentAllocations])
  
  useEffect(() => {
    const totalAllocations = totalSavings + totalWant + totalNeed;
 
    if (checkExceeding()) setRemaining(totalBudget - totalAllocations);
  }, [totalSavings, totalWant, totalNeed])

  return (
    <View>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter]}>BUDGET PLANNER</Text> 
        <Text style={[styles.textBold, styles.textCenter]}>Remaining Allocation</Text>      
        <Text style={[styles.textBold, styles.textCenter]}>Php. {remaining}</Text>      
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

      <Categories
        categoryList={tabData[activeTab].state}
        isModalVisible={isCategoryVisible}
        setModalVisible={setCategoryVisible}
        onChangeToggle={tabData[activeTab].setAllocation}
      />

      <Suggestions
        isModalVisible={isRecoVisible}
        setModalVisible={setRecoVisible}
        onChangeToggle={setRatioHandler}
      />

      <View style={[styles.blueDrawer, styles.blueDrawerExpanded, styles.blueDrawerExpandedAllocation]}>
        <Text style={[styles.textCenter, styles.textWhite]}>EXPENSE ALLOCATION</Text>
        {tabData[activeTab].ratio > 0 && <Text style={[styles.textCenter, styles.textWhite, styles.textMediumBold, styles.textHighlight]}>{totalBudget * (tabData[activeTab].ratio/100)}</Text>}
        <ScrollView style={[styles.center, styles.containItem]}>
          {tabData[activeTab].state.filter(x => x.toggled).length > 0 ? 
            <>
            {tabData[activeTab].state.filter(x => x.toggled).map(x =>
              <Allocation key={x.name}
                          category={x.name}
                          curAllocation={x.allocation}
                          allocationHandler={allocationHandler}
                          checkExceeding={checkExceeding}
                          icon={"yey"} />)}
            <Pressable onPress={() => modalToggleHandler("CATEGORY")}>
              <Text style={[styles.textCenter, styles.textMediumBold, styles.categoryWrapper, styles.whiteText]}>Edit Categories</Text>
            </Pressable> 
            </>
            :
            <Pressable onPress={() => modalToggleHandler("CATEGORY")}>
              <Text style={[styles.textCenter, styles.textMediumBold, styles.categoryWrapper, styles.whiteText]}>Add Category</Text>
            </Pressable> 
          }
        </ScrollView>
        
        <View style={[styles.center, styles.buttonWrapper, styles.navWrapper]}>
          <Pressable onPress={prevStep}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Back</Text>
          </Pressable>
          <Pressable onPress={() => modalToggleHandler("SUGGESTION")}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>SUGGESTION</Text>
          </Pressable>
          <Pressable onPress={() => nextStepHandler()}>
            <Text style={[styles.textCenter, styles.smallButton, styles.whiteText]}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}



export default Step3