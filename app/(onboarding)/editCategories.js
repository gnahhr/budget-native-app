import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { useStorageState } from '../../hooks/useStorageState';
import { allocateBudget } from '../../api/budget';

import Step3 from '../../components/onboarding/Step3';
import Summary from '../../components/onboarding/Summary';

import CustomIcon from '../../components/common/CustomIcon';
import LogoS from '../../assets/logos/logo-s.png';
import CloseIco from '../../assets/icons/X.png';

const Onboarding = () => {
  const [[isUserLoading, user], setUser] = useStorageState('user');
  const [[isDataLoading, data], setData] = useStorageState('data');
  const router = useRouter();

  // Add States of Needs-Savings-Wants-Total Budget-ExpenseAllocation
  const [ step, setStep ] = useState(0);
  const [ budgetPlan, setBudgetPlan ] = useState('');
  const [ totalBudget, setTotalBudget ] = useState(0);

  const [ allocations, setAllocations ] = useState([]);

  const allocationHandler = (allocations) => {
    setAllocations({
      budgetPlan,
      totalBudget,
      ...allocations,
    })
  }

  async function saveAllocation() {
    const payload = {
      email: JSON.parse(user).email,
      totalBudget,
      ...allocations,
    }

    setData(JSON.stringify(payload));
    const allocation = await allocateBudget(payload);
    
    if (allocation?.statusCode === 200) {
      router.replace("/homepage");
    }
  };

  const nextStepHandler = () => {
    if (step < 4) setStep(step + 1);
  }

  const prevStepHandler = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleClose = () => {
    router.replace("/") 
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
            <Pressable onPress={() => handleClose()}>
              <CustomIcon imageUrl={CloseIco} size={15}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />

      {step === 0 && <Step3 prevStep={prevStepHandler} totalBudget={totalBudget} nextStep={nextStepHandler} setAllocations={allocationHandler}/>}
      {step === 1 && <Summary prevStep={prevStepHandler} totalBudget={totalBudget} initialAllocation={allocations} setAllocations={saveAllocation}/>}

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