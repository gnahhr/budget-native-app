import { router, useSegments, useRootNavigation } from 'expo-router';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
// Protected routes
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
    // Ito yung pagkuha ng current routes ng user, nasa segements
    const inAuthGroup = segments[0] === '(auth)';
    const inUserGroup = segments[0] === '(user)';
    const inOnboarding = segments[0] === '(onboarding)';
    const inRoot = segments[0] === undefined;
    
    // If di pa nakakapag allocate ng budget
    const ifNewUser = JSON.parse(user)?.ifNewUser;

    // Chinecheck if ready na yung pages sa isNavigationReady then sa inRoot if nasa
    // Landing Page

    if (!isNavigationReady && !inRoot) return;

    if (!user && inUserGroup){
      router.replace('/');
    } else if (ifNewUser && inUserGroup) {
      router.replace('/onboarding');
    } else if (user && inAuthGroup) {
      router.replace('/homepage');
    } else if (user && inRoot) {
      router.replace('/homepage');
    } 
  }, [user, segments, isNavigationReady])

}

export function Provider(props) {
  const [ user, setUser ] = useState(null);
  const [[isLoading, userData], setUserData] = useStorageState('user');

  // Pagset ng data not just sa provider pero dun din sa local storage
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