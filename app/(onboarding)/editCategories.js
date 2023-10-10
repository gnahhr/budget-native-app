import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { updateAllocation, getAllocatedBudget } from '../../api/budget';
import { useStorageState } from '../../hooks/useStorageState';
import { useAuth } from '../../context/auth';
import Step3 from '../../components/onboarding/Step3';
import Summary from '../../components/onboarding/Summary';

import CustomIcon from '../../components/common/CustomIcon';
import LogoS from '../../assets/logos/logo-s.png';
import CloseIco from '../../assets/icons/X.png';

const EditCategories = () => {
  const [[isDataLoading, data], setData] = useStorageState('data');
  const router = useRouter();
  const { user } = useAuth();

  const [ step, setStep ] = useState(0);
  const [ budgetPlan, setBudgetPlan ] = useState('Weekly');
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ parsedUser, setParsedUser ] = useState({});

  const [ allocations, setAllocations ] = useState();

  const allocationHandler = (allocations) => {
    setAllocations({
      budgetPlan,
      totalBudget,
      ...allocations,
    })
  }
  
  async function fetchAllocation(email) {
    const data = await getAllocatedBudget(email);
    const response = data.response;
    setTotalBudget(response.totalBudget);
    setAllocations(response);
  }

  useEffect(() => {
    if(user) {
      const parsedUser = JSON.parse(user);
      setParsedUser(parsedUser);
      fetchAllocation(parsedUser.email);
    }
  }, [])

  async function saveAllocation() {
    const payload = {
      ...allocations,
    }
    
    setData(JSON.stringify(payload));
    const allocation = await updateAllocation(parsedUser.email, payload);
    
    if (allocation?.statusCode === 200) {
      router.replace("/homepage");
    }
  };

  const nextStepHandler = () => {
    if (step < 1) setStep(step + 1);
  }

  const prevStepHandler = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleClose = () => {
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

      {step === 0 && <Step3 prevStep={prevStepHandler} totalBudget={totalBudget} currentAllocations={allocations} nextStep={nextStepHandler} setAllocations={allocationHandler}/>}
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

export default EditCategories