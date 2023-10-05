import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useStorageState } from '../hooks/useStorageState';

import Intro from '../components/onboarding/Intro';
import Step1 from '../components/onboarding/Step1';
import Step2 from '../components/onboarding/Step2';
import Step3 from '../components/onboarding/Step3';

import CustomIcon from '../components/common/CustomIcon';
import LogoS from '../assets/logos/logo-s.png';
import CloseIco from '../assets/icons/X.png';

const Onboarding = () => {
  const [[isLoading, data], setData] = useStorageState('user');

  // Add States of Needs-Savings-Wants-Total Budget-ExpenseAllocation
  const [ step, setStep ] = useState(0);
  const [ budgetPlan, setBudgetPlan ] = useState('');
  const [ totalBudget, setTotalBudget ] = useState(0);

  const [ allocations, setAllocations ] = useState([]);

  const allocationHandler = (allocations) => {
    const Store = {
      budgetPlan,
      totalBudget,
      ...allocations,
    }

    setData(JSON.stringify(Store));
  }

  const nextStepHandler = () => {
    if (step < 3) setStep(step + 1);
  }

  const prevStepHandler = () => {
    if (step > 0) setStep(step - 1);
  };

  const budgetPlanHandler = (chosenBudget) => {
    setBudgetPlan(chosenBudget);
    setStep(step + 1);
  };

  const totalBudgetHandler = (totalBudget) => {
    setTotalBudget(totalBudget);
  }

  return (
    <SafeAreaView style={styles.main}>

      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "white"},
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS}/>
          ),
          headerRight: () => (
            <CustomIcon imageUrl={CloseIco} size={15}/>
          ),
          headerTitle: "",
        }}
      />

      {step === 0 && <Intro nextStep={nextStepHandler}/>}
      {step === 1 && <Step1 prevStep={prevStepHandler} setBudgetPlan={budgetPlanHandler}/>}
      {step === 2 && <Step2 prevStep={prevStepHandler} setBudget={totalBudgetHandler} nextStep={nextStepHandler}/>}
      {step === 3 && <Step3 prevStep={prevStepHandler} totalBudget={totalBudget} nextStep={nextStepHandler} setAllocations={allocationHandler}/>}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    position: 'relative',
  },
})

export default Onboarding