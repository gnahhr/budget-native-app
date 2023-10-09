import { router, useSegments, useRootNavigation } from 'expo-router';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', (event) => {
      setIsNavigationReady(true);
    })

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [rootNavigation])

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inUserGroup = segments[0] === '(user)';
    const inRoot = segments[0] === undefined;
    const isBudgetAllocationExists = JSON.parse(user)?.ifBudgetAllocationExists;
    if (!isNavigationReady && !inRoot) return;

    if (!user && inUserGroup){
      router.replace('/');
    } else if (user && inAuthGroup) {
      router.replace('/homepage');
    } else if (user && inRoot) {
      router.replace('/homepage');
    } else if (!isBudgetAllocationExists && inUserGroup) {
      router.replace('/onboarding');
    }
  }, [user, segments, isNavigationReady])

}

export function Provider(props) {
  const [ user, setUser ] = useState(null);
  const [[isLoading, userData], setUserData] = useStorageState('user');

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [isLoading])

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: (value) => {setUser(value); setUserData(value);},
        signOut: () => {setUser(null); setUserData(null)},
        user
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}