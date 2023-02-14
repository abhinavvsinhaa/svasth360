import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import {useAuth} from '../context/Auth';

// const {pushNotificationStatus, setPushNotificationStatus} = useAuth();

async function requestUserPermission() {
  if (Platform.OS == 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Push Notification status:', granted);
      return true;
    } else return false;
  } else if (Platform.OS == 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Push Notification status:', authStatus);
      return true;
    } else return false;
  }
}

export async function getFCMToken() {
  // if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages()
    const token = await messaging().getToken()
    console.log('FCM Token', token)
  // }
}

export async function handlePushNotifications() {
  const enabled = await requestUserPermission();
  if (enabled) await getFCMToken()
  return enabled;
}

