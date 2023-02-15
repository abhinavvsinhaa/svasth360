import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Navigator} from './src/navigation/Navigator';
import {AuthProvider} from './src/context/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import SocketService from './src/utils/socket';
import RNCallKeep from 'react-native-callkeep';
import {Alert, PermissionsAndroid} from 'react-native';
import {handlePushNotifications} from './src/utils/PushNotifications';
import messaging from '@react-native-firebase/messaging';
import {Modal, Text, View, Pressable, StyleSheet} from 'react-native';
function App(): JSX.Element {
  const [grantedPushNotifications, setGrantedPushNotifications] =
    useState<boolean>(false);

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
    },
  };

  const setupCall = async () => {
    try {
      const ans = await RNCallKeep.setup({
        ios: {
          appName: 'My app name',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription:
            'This application needs to access your phone accounts',
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
        },
      });
      RNCallKeep.setAvailable(true);
      console.log(ans);
    } catch (error) {
      console.error(error);
    }
  };

  const pushNotifications = async () => {
    const grant: any = await handlePushNotifications();
    setGrantedPushNotifications(grant);
    if (grant) return true;
    return false;
  };

  // clear async storage
  const clearAsyncStorage = async () =>
    await AsyncStorage.removeItem('@AuthData');

  useEffect(() => {
    clearAsyncStorage();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    // pushNotifications();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message arrived', remoteMessage);
      Alert.alert('INCOMINGG')
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('message arrived in background', remoteMessage);
      if (remoteMessage?.data?.type === 'call') {
        console.log('SHOW MODAL');
        setModalVisible(true);
      }
    });

    return unsubscribe;

  }, []);

  // useEffect(() => {
  //   if (grantedPushNotifications) {
  //     console.log('called');

  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       console.log('message arrived', remoteMessage);
  //     });

  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       console.log('message arrived in background', remoteMessage);
  //     });

  //     return unsubscribe;
  //   }
  // }, [grantedPushNotifications]);

  const rejectCallNotificationHandler = () => {
    setModalVisible(false);
    Alert.alert('You rejected');

    console.log('rejected');
  };
  const acceptCallNotificationHandler = () => {
    setModalVisible(false);
    Alert.alert('You accepted');
    console.log('accepted');
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <AuthProvider>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Accept or Reject the action</Text>
            <Pressable
              key="1"
              style={[styles.button, styles.accept]}
              onPress={acceptCallNotificationHandler}>
              <Text style={styles.textStyle}>Accept</Text>
            </Pressable>
            <Pressable
              key="2"
              style={[styles.button, styles.reject]}
              onPress={rejectCallNotificationHandler}>
              <Text style={styles.textStyle}>Reject</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <PaperProvider>
        <Navigator />
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginVertical: 25,
    borderRadius: 20,
    padding: 25,
    elevation: 2,
  },

  accept: {
    backgroundColor: 'green',
  },
  reject: {backgroundColor: 'red'},
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
