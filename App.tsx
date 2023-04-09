import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigator} from './src/navigation/Navigator';
import {AuthProvider} from './src/context/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

function App(): JSX.Element {
  // clear async storage
  const clearAsyncStorage = async () =>
    await AsyncStorage.removeItem('@AuthData');

  useEffect(() => {
    // clearAsyncStorage();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <AuthProvider>
      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
