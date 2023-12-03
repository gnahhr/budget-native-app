import React,  { useState, useEffect, useContext, createContext } from 'react';

import { useStorageState } from '../hooks/useStorageState';

const BudgetContext = createContext(null);

export function useTheme() {
  return useContext(BudgetContext);
}

export function Provider(props) {
  const [ [isLoading, cachedTheme], setCachedTheme ] = useStorageState('cachedTheme');
  const [ theme, setTheme] = useState('light');

  useEffect(() => {
    if (cachedTheme) {
      setTheme(cachedTheme);
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setCachedTheme(newTheme);
    setTheme(newTheme);
  }

  return (
    <BudgetContext.Provider
      value={{
        toggleTheme: () => {toggleTheme();},
        theme
      }}>
      {props.children}
    </BudgetContext.Provider>
  )
}