// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// export const getFCMToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('@FCMToken');
//   console.log(fcmToken)
//   if (!fcmToken) {
//     try {
//         messaging().registerDeviceForRemoteMessages().then(async () => {
//             const fcmToken = await messaging().getToken();
//             console.log(fcmToken);
//             if (fcmToken) {
//               await AsyncStorage.setItem('@FCMToken', fcmToken);
//             }
//         })
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };

// export const NotificationServices = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//     navigation.navigate(remoteMessage.data.type);
//   });

//   messaging().onMessage(async remoteMessage => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   });

//   // Check whether an initial notification is available
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
// };
