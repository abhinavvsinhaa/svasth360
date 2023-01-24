import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/Auth';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export const Navigator = () => {
  const {authData, loading} = useAuth(); // return context value

  // TODO: if loading true, return some loading component

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
