import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import axiosInstance from '../api/axios';
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

export async function getFCMToken(userId) {
  // if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages()
    const token = await messaging().getToken()
    const res = await axiosInstance.post('doctor/fcm', {
      token,
      userId
    })
    console.log('updated fcm token', res.data)
    console.log('FCM Token', token)
  // }
}

export async function handlePushNotifications(userId) {
  const enabled = await requestUserPermission();
  if (enabled) await getFCMToken(userId)
  return enabled;
}

