import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Pressable, Alert } from 'react-native';
import { useStorageState } from '../../hooks/useStorageState';
import { allocateBudget } from '../../api/budget';
import { useAuth } from '../../context/auth';

import Intro from '../../components/onboarding/Intro';
import Step1 from '../../components/onboarding/Step1';
import Step2 from '../../components/onboarding/Step2';
import Step3 from '../../components/onboarding/Step3';
import Summary from '../../components/onboarding/Summary';

import CustomIcon from '../../components/common/CustomIcon';
import LogoS from '../../assets/logos/logo-s.png';
import CloseIco from '../../assets/icons/X.png';

const Onboarding = () => {
  const [[isDataLoading, data], setData] = useStorageState('data');
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();

  const parsedUser = JSON.parse(user);

  // Add States of Needs-Savings-Wants-Total Budget-ExpenseAllocation
  const [ step, setStep ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ budgetPlan, setBudgetPlan ] = useState('');
  const [ budgetName, setBudgetName ] = useState('');
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ budgetRatio, setBudgetRatio ] = useState('');

  const [ allocations, setAllocations ] = useState([]);

  const allocationHandler = (allocations) => {
    setAllocations({
      budgetPlan,
      totalBudget,
      ...allocations,
    })
  }

  async function saveAllocation() {
    setIsLoading(true);

    const payload = {
      budgetName: budgetName,
      budgetType: budgetPlan.toLowerCase(),
      budgetRatio: budgetRatio,
      totalBudget,
      ...allocations,
    }
    // If nakapag set na ng allocations, set yung data sa local and database, then set user creds na tapos na siya mag allocate
    const allocation = await allocateBudget(parsedUser.email, payload);
    
    setIsLoading(false);
    
    if (allocation.statusCode === 200) {
      setData(JSON.stringify(payload));
      signIn(JSON.stringify({
        ...parsedUser,
        ifNewUser: false
      }));
      router.replace("/homepage");
    } else {
      Alert.alert('Warning', allocation.message, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
    }
  };

  const nextStepHandler = () => {
    if (step < 4) setStep(step + 1);
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

  const handleClose = () => {
    
    if (parsedUser.ifNewUser) {
      signOut();
      router.replace("/"); 
    }

    router.replace("/homepage") 
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
      
      {/* Hinati ko na siya as steps para di masyadong crowded */}
      {step === 0 && <Intro nextStep={nextStepHandler}/>}
      {step === 1 && <Step1 prevStep={prevStepHandler} setBudgetPlan={budgetPlanHandler}/>}
      {step === 2 && <Step2 prevStep={prevStepHandler} setBudget={totalBudgetHandler} setBudgetName={setBudgetName} nextStep={nextStepHandler}/>}
      {step === 3 && <Step3 prevStep={prevStepHandler} totalBudget={totalBudget} nextStep={nextStepHandler} setAllocations={allocationHandler} setBudgetRatio={setBudgetRatio}/>}
      {step === 4 && <Summary prevStep={prevStepHandler} totalBudget={totalBudget} initialAllocation={allocations} setAllocations={saveAllocation} isLoading={isLoading}/>}

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