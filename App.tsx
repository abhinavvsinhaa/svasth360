import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigator} from './src/navigation/Navigator';
import {AuthProvider} from './src/context/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import SocketService from './src/utils/socket';

function App(): JSX.Element {

  // clear async storage
  const clearAsyncStorage = async () => await AsyncStorage.removeItem('@AuthData');

  useEffect(() => {
    clearAsyncStorage();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)

    // initialize socket service
    SocketService.initializeSocket();

    // handle all events
    SocketService.on('recieve_message', (data: any) => {
      console.log(data)
    })
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
