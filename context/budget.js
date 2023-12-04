import React,  { useState, useEffect, useContext, createContext } from 'react';

import { useAuth } from './auth';
import { getBudgetList } from '../api/budget';
import { useStorageState } from '../hooks/useStorageState';

const BudgetContext = createContext(null);

export function useBudget() {
  return useContext(BudgetContext);
}

export function Provider(props) {
  const [ [isLoading, cachedActiveBudget], setCachedActiveBudget ] = useStorageState('activeBudget');

  const [ activeBudget, setActiveBudget ] = useState({
    budgetName: 'myBudget',
    budgetType: 'weekly',
    budgetOwner: 'user1@gmail.com'
  });

  const [ budgetList, setBudgetList ] = useState([]);
  const [ activeType, setActiveType ] = useState("weekly");

  const { user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (cachedActiveBudget) setActiveBudget(JSON.parse(cachedActiveBudget));
      getBudgetListHandler();
    }
  }, [isLoading])

  // useEffect(() => {
  //   console.log("Changed active budget to", activeBudget);
  //   console.log("Changed budget list", budgetList);
  // }, [activeBudget]);

  async function getBudgetListHandler() {
    const data = await getBudgetList(JSON.parse(user).email);
    const list = data.response;
    
    setBudgetList(list);

    if (cachedActiveBudget){
      setActiveBudget(JSON.parse(cachedActiveBudget));
    } else {
      if (!cachedActiveBudget && !isLoading) setCachedActiveBudget(JSON.stringify(list[0]));
      setActiveBudget(list[0]);
    }
  }

  async function refreshBudgetList() {
    const data = await getBudgetList(JSON.parse(user).email);
    const list = data.response;

    setBudgetList(list);
  }

  return (
    <BudgetContext.Provider
      value={{
        budgetList,
        activeBudget,
        activeType,
        updateActive: (value) => {setActiveBudget(value); setCachedActiveBudget(JSON.stringify(value));},
        updateActiveType: (value) => {setActiveType(value);},
        updateBudgetL: () => {refreshBudgetList();},
      }}>
      {props.children}
    </BudgetContext.Provider>
  )
}