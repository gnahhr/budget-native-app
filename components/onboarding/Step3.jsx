import React, { useState, useEffect } from 'react'

// Constants
import { savingsCategories, needsCategories, wantCategories } from '../../constants/categories';
import styles from './styles';
import { suggestionList } from '../../constants/suggestionList';

// Components
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import Categories from '../modals/Categories';
import Suggestions from '../modals/Suggestions';
import Allocation from './Allocation';
import { useStorageState } from '../../hooks/useStorageState';
import { useTheme } from '../../context/theme';

const Step3 = ({totalBudget, prevStep, currentAllocations, curRatio, nextStep, setAllocations, setBudgetRatio}) => {
  const { theme } = useTheme();
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
  const [ localAllocation, setLocalAllocation ] = useState(null);

  // Save States
  const [ [isStateLoading, allocationState], setAllocationState ] = useStorageState('allocationState');


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
      totalBudget: totalNeed,
      default: needsCategories,
      alt: "needs",
    },
    "SAVINGS": {
      state: savingAllocations,
      setAllocation: setSavingAllocations,
      ratio: savingRatio,
      totalBudget: totalSavings,
      default: savingsCategories,
      alt: "savings",
    },
    "WANT": {
      state: wantAllocations,
      setAllocation: setWantAllocations,
      ratio: wantRatio,
      totalBudget: totalWant,
      default: wantCategories,
      alt: "wants",
    }
  }

  const Tabs = ["NEED", "SAVINGS", "WANT"];
  // Check if exeeding na yung limit ng allocation, comparison ng new and current allocation sa total allocation
  const checkExceeding = (curAllocation = 0, newAllocation = 0) => {
    if (totalBudget){
      const totalAllocations = totalSavings + totalWant + totalNeed - Number(curAllocation);
  
      if ((totalAllocations + Number(newAllocation)) <= totalBudget) {
        return true;
      } else {
        exceedingWarning();
        return false;
      }
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
    // Isang Handler ng pagtoggle ng modal
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
    // Kinukuha lang lahat ng toggled categories then if toggled,
    // Yun yung isesend sa back end para mairecord
    const needs = needAllocations.filter(category => category.toggled);
    const wants = wantAllocations.filter(category => category.toggled);
    const savings = savingAllocations.filter(category => category.toggled);

    const payload = {
      needs: needs,
      wants: wants,
      savings: savings,
    }
    
    setLocalAllocation(payload);
    
    if (!currentAllocations) {
      setAllocationState(JSON.stringify(payload));
    }
  }

  const setRatioHandler = (needsRatio, wantsRatio, savingRatio) => {
    setNeedRatio(needsRatio);
    setWantRatio(wantsRatio);
    setSavingRatio(savingRatio);
  }

  const computeAllocationRatio = (type) => {
    if (tabData[type].state.filter(x => x.toggled).length === 0) return;

    const ratio = tabData[type].ratio ? tabData[type].ratio / 100 : 1;

    tabData[type].setAllocation(tabData[type].state.map(item => {
      let newAllocation = item.allocation === 0 ? 0 : Math.floor(totalBudget * ratio * (item.allocation / tabData[type].totalBudget));
      
      if (item.toggled) {
        return {
          ...item,
          allocation: newAllocation,
        }
      } else {
        return item;
      }
    }));
  }

  const nextStepHandler = () => {
    // if (allocationChecker("WANT") || allocationChecker("SAVINGS") || allocationChecker("NEED")) {
    //   Alert.alert('Warning', 'Select categories in every field!', [
    //     {
    //       text: 'Okay',
    //       style: 'cancel'
    //     }
    //   ])

    //   return;
    // }
    
    if (allocationChecker("WANT") || allocationChecker("SAVINGS") || allocationChecker("NEED")){
      Alert.alert('Warning', 'Finish allocating budget!', [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
      return false;
    }

    setAllocations(localAllocation);
    nextStep();
  }

  const allocationChecker = (type) => {
    // return tabData[type].state.filter(x => x.toggled).length === 0
    return tabData[type].state.filter(x => x.allocation === 0 && x.toggled).length > 0
  }

  const allocationHandler = (name, allocation) => {
    // Iterate sa list ng categories, if same name tska siya mag record ng allocation
    const newData = tabData[activeTab].state.map(x => {
      if (x.name === name) {
        return {
          ...x,
          allocation: allocation,
          expenses: x.expenses,
        }
      } else {
        return x;
      }
    })
    // Computation ng total allocation then percentace.
    const totalAllocation = newData.reduce((sum, category) => Number(sum) + Number(category.allocation), 0);
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

  // Pag compare ng nakuhang data sa backend to the list of categories
  // If may same sila then mag toggle yung nasa local tska update ng allocation
  // Ito yung function na ginagamit sa pag edit mismo nung edit categories bc
  // magkaiba sila compared sa fresh data
  const currentAllocationHandler = (curAllocation) => {
    const types = ['WANT', 'NEED', 'SAVINGS'];

    types.map((type) => {
      // Ginawang isang array yung allocations na galing database to local
      const container = [...tabData[type].default, ...curAllocation[tabData[type].alt]];
      const newContainer = [];
      const uniqueContainer = {};
      
      // Iterate yung ginawang array para if may double ng name, uupdate nalang yung nasa
      // Categories then di na isasama yung galing local
      for (let item in container) {
          category = container[item]['name'];

          if (uniqueContainer[category] !== undefined) {
            uniqueContainer[category] = {
              ...uniqueContainer[category],
              allocation: container[item].allocation,
              expenses: container[item].expenses,
              toggled: true,
            }
          } else if (container[item].allocation > 0) {
            uniqueContainer[category] = {
              ...container[item],
              expenses: container[item].expenses,
              toggled: true,
            }; 
          } else {
            uniqueContainer[category] = container[item];
          }
      }

      for (i in uniqueContainer) {
        newContainer.push(uniqueContainer[i]);
      }

      tabData[type].setAllocation([...newContainer]);
    })
  };

  useEffect(() => {
    if(!currentAllocations && allocationState) {
      currentAllocationHandler(JSON.parse(allocationState));
    }
  }, [isStateLoading])

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
    setAllocationsHandler();
  }, [savingAllocations, needAllocations, wantAllocations])

  useEffect(() => {
    if (currentAllocations) {
      currentAllocationHandler(currentAllocations);
    }
  }, [currentAllocations])

  useEffect(() => {
    if (curRatio) {
      const ratio = suggestionList.filter(ratio => ratio.name === curRatio)[0];
      setRatioHandler(ratio.needs, ratio.want, ratio.saving);
    }
  }, [curRatio])

  useEffect(() => {
    computeAllocationRatio("SAVINGS");
  }, [savingRatio])

  useEffect(() => {
    computeAllocationRatio("WANT");
  }, [wantRatio])

  useEffect(() => {
    computeAllocationRatio("NEED");
  }, [needRatio])
  
  useEffect(() => {
    const totalAllocations = totalSavings + totalWant + totalNeed;
 
    if (checkExceeding()) setRemaining(totalBudget - totalAllocations);
  }, [totalSavings, totalWant, totalNeed])

  return (
    <View>
      <View style={styles.main}>
        <Text style={[styles.textBold, styles.textCenter, theme === 'dark' && styles.whiteText]}>BUDGET PLANNER</Text> 
        <Text style={[styles.textBold, styles.textCenter, theme === 'dark' && styles.whiteText]}>Remaining Allocation</Text>      
        <Text style={[styles.textBold, styles.textCenter, theme === 'dark' && styles.whiteText]}>Php. {remaining}</Text>      
        <View style={[styles.center, styles.flexRow]}>
          {Tabs.map((tab) => {
            let passStyle = [styles.textCenter, styles.smallButton]
            if (activeTab === tab) {
              passStyle.push([styles.smallButtonHollow, theme === 'dark' && styles.whiteText])
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
        curBudgetRatio={curRatio}
        setBudgetRatio={setBudgetRatio}
      />
      <View style={[styles.blueDrawer, styles.blueDrawerExpanded, styles.blueDrawerExpandedAllocation, theme === 'dark' && styles.darkWrapper]}>
        <Text style={[styles.textCenter, styles.textWhite]}>EXPENSE ALLOCATION</Text>
        {tabData[activeTab].ratio > 0 && <Text style={[styles.textCenter, styles.textWhite, styles.textMediumBold, styles.textHighlight]}>{totalBudget * (tabData[activeTab].ratio/100)}</Text>}
        <ScrollView style={[styles.center, styles.containAllocation]}>
          {tabData[activeTab].state.filter(x => x.toggled).length > 0 ? 
            <>
            {tabData[activeTab].state.filter(x => x.toggled).map((x, idx) =>
              <Allocation key={idx}
                          category={x.name}
                          iconId={x.iconId}
                          curAllocation={x.allocation}
                          allocationHandler={allocationHandler}
                          checkExceeding={checkExceeding}/>)}
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