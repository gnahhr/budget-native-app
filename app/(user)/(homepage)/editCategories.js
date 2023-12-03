import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Pressable, Text } from 'react-native';
import { updateAllocation, getAllocatedBudget } from '../../../api/budget';
import { useStorageState } from '../../../hooks/useStorageState';

import Step3 from '../../../components/onboarding/Step3';
import Summary from '../../../components/onboarding/Summary';
import CustomIcon from '../../../components/common/CustomIcon';
import LogoS from '../../../assets/logos/logo-s.png';
import LogoSW from '../../../assets/logos/logo-sw.png';
import CloseIco from '../../../assets/icons/X.png';
import { COLORS } from '../../../constants/theme';

import { useBudget } from '../../../context/budget';
import { useAuth } from '../../../context/auth';
import { useTheme } from '../../../context/theme';

const EditCategories = () => {
  const [[isDataLoading, data], setData] = useStorageState('data');
  const router = useRouter();
  const { user } = useAuth();
  const { activeBudget } = useBudget();
  const { theme, toggleTheme } = useTheme();

  const [ step, setStep ] = useState(0);
  const [ budgetPlan, setBudgetPlan ] = useState('Weekly');
  const [ budgetRatio, setBudgetRatio ] = useState('');
  const [ totalBudget, setTotalBudget ] = useState(0);
  const [ parsedUser, setParsedUser ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  const [ allocations, setAllocations ] = useState();

  const allocationHandler = (allocations) => {
    setAllocations({
      budgetPlan,
      totalBudget,
      budgetRatio,
      ...allocations,
    })
  }
  
  async function fetchAllocation(email) {
    if (activeBudget) {
      const data = await getAllocatedBudget(email, activeBudget.budgetName);
      const response = data.response;
      setBudgetRatio(response.budgetRatio);
      setAllocations(response);
      setTotalBudget(response.totalBudget);
    }
  }

  useEffect(() => {
    if(user) {
      const parsedUser = JSON.parse(user);
      fetchAllocation(parsedUser.email);
      setParsedUser(parsedUser);
    }
  }, [activeBudget])

  async function saveAllocation() {
    setIsLoading(true);
    
    const payload = {
      ...allocations,
    }
    
    setData(JSON.stringify(payload));
    const allocation = await updateAllocation(parsedUser.email, activeBudget.budgetName, payload);
    setIsLoading(false);
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
    <SafeAreaView style={[styles.main, theme === 'dark' && styles.darkMode]}>

      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: theme === 'light' ? COLORS['white-700'] : COLORS['dblue-500']},
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => toggleTheme()}>
              <CustomIcon imageUrl={theme === 'light' ? LogoS : LogoSW}/>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => handleClose()}>
              <CustomIcon imageUrl={CloseIco} size={15}/>
            </Pressable>
          ),
          headerTitle: "",
        }}
      />


      {step === 0 && <Step3 prevStep={prevStepHandler} totalBudget={totalBudget} currentAllocations={allocations} nextStep={nextStepHandler} setBudgetRatio={setBudgetRatio} curRatio={budgetRatio} setAllocations={allocationHandler}/>}
      {step === 1 && <Summary prevStep={prevStepHandler} totalBudget={totalBudget} initialAllocation={allocations} setAllocations={saveAllocation} isLoading={isLoading}/>}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS['white-700'],
    alignItems: 'center',
    position: 'relative',
  },
  darkMode: {
    backgroundColor: COLORS['dblue-500'],
  }
})

export default EditCategories