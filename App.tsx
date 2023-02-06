import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigator} from './src/navigation/Navigator';
import {AuthProvider} from './src/context/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { getFCMToken, NotificationServices, requestUserPermission } from './src/utils/PushNotifications';

function App(): JSX.Element {
  const clearAsyncStorage = async () => await AsyncStorage.clear();

  useEffect(() => {
    // clearAsyncStorage();
    SplashScreen.hide();
    // requestUserPermission();
    // getFCMToken();
    // NotificationServices();
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
