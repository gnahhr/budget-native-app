import React,  { useState, useEffect, useContext, createContext } from 'react';

import { useAuth } from './auth';
import { getBudgetList } from '../api/budget';

const BudgetContext = createContext(null);

export function useBudget() {
  return useContext(BudgetContext);
}

export function Provider(props) {
  const [ activeBudget, setActiveBudget ] = useState("budget1");
  const [ budgetList, setBudgetList ] = useState([]);
  const [ activeType, setActiveType ] = useState("weekly");

  const { user } = useAuth();

  useEffect(() => {
    getBudgetListHandler();
  }, [])

  // useEffect(() => {
  //   console.log("Changed active budget to", activeBudget);
  //   console.log("Changed budget list", budgetList);
  // }, [activeBudget, budgetList]);

  async function getBudgetListHandler() {
    const data = await getBudgetList(JSON.parse(user).email);
    const list = data.response;
    
    setBudgetList(list);
    setActiveBudget(list[0]);
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
        updateActive: (value) => {setActiveBudget(value);},
        updateActiveType: (value) => {setActiveType(value);},
        updateBudgetL: () => {refreshBudgetList();},
      }}>
      {props.children}
    </BudgetContext.Provider>
  )
}