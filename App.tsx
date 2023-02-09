import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigator} from './src/navigation/Navigator';
import {AuthProvider} from './src/context/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import SocketService from './src/utils/socket';
import RNCallKeep from 'react-native-callkeep';
import { Alert, PermissionsAndroid } from 'react-native';

function App(): JSX.Element {

  const options = {
    ios: {
      appName: 'My app name',
    },
    android: {
      alertTitle: 'Permissions required',
      alertDescription: 'This application needs to access your phone accounts',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'phone_account_icon',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
      // Required to get audio in background when using Android 11
      foregroundService: {
        channelId: 'com.company.my',
        channelName: 'Foreground service for my app',
        notificationTitle: 'My app is running on background',
        notificationIcon: 'Path to the resource icon of the notification',
      }, 
    }
  };
  
  
  const setupCall = async () => {
    try {
      
      const ans = await RNCallKeep.setup({
        ios: {
          appName: 'My app name',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription: 'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
          imageName: 'phone_account_icon',
          additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
          // Required to get audio in background when using Android 11
          foregroundService: {
            channelId: 'com.company.my',
            channelName: 'Foreground service for my app',
            notificationTitle: 'My app is running on background',
            notificationIcon: 'Path to the resource icon of the notification',
          }, 
        }
      })
      RNCallKeep.setAvailable(true)
      console.log(ans)
    } catch (error) {
      console.error(error)
    }
  }
  // clear async storage
  const clearAsyncStorage = async () => await AsyncStorage.removeItem('@AuthData');
  
  useEffect(() => {
    clearAsyncStorage();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)

    // setupCall();
    

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
