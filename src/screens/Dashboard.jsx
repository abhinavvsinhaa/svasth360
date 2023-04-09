import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
  Text,
  Pressable,
  Image,
} from 'react-native';
import axiosInstance from '../api/axios';
import {
  ZHSearchDashboard,
  PHCSearchDashboard,
  MedColSearchDashboard,
  DoctorCard,
  DashboardHeaderBar,
  CHSearchDashboard,
} from '../components';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';
import {handlePushNotifications} from '../utils/PushNotifications';
import SocketService from '../utils/socket';
import messaging from '@react-native-firebase/messaging';
import {SearchBar} from '../components/SearchBar/SearchBar';
import Geolocation from '@react-native-community/geolocation';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import notifee, {EventType} from '@notifee/react-native';

export const Dashboard = ({navigation, route}) => {
  const {authData} = useAuth();
  const [cards, setCards] = useState([]);
  const [channelForVideo, setChannelForVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const displayNotification = async message => {
    // required for iOS
    await notifee.requestPermission();

    // required for Android
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.setNotificationCategories([
      {
        id: 'video_call',
        actions: [
          {
            id: 'decline',
            title: 'Decline',
            destructive: true,
          },
          {
            id: 'answer',
            title: 'Answer',
            foreground: true,
          },
        ],
      },
    ]);

    await notifee.displayNotification({
      title: 'Video call',
      body: `Incoming video call from ${message.data.name}, ${message.data.designation}.`,
      id: 'vc_notification',
      android: {
        channelId,
        ongoing: true,
        actions: [
          {
            title: 'REJECT',
            pressAction: {
              id: 'reject',
            },
          },
          {
            title: 'ANSWER',
            pressAction: {
              id: 'answer',
            },
          },
        ],
      },
      ios: {
        categoryId: 'video_call',
      },
    });
  };

  const cancelNotification = async () => {
    try {
      await notifee.cancelDisplayedNotification('vc_notification');
    } catch (error) {
      console.error(error);
    }
  };

  const rejectCallNotificationHandler = () => {
    setModalVisible(false);
    Alert.alert('You rejected');
    console.log('rejected');
  };

  const acceptCallNotificationHandler = () => {
    setModalVisible(false);
    Alert.alert('You accepted');
    navigation.navigate('Video Call', {
      channel: channelForVideo,
    });

    // console.log('accepted');
  };

  async function fetchMyCards() {
    try {
      const designation = String(authData.designation).toLowerCase();
      const res = await axiosInstance.post(
        `doctor/cards?designation=${designation}`,
        {
          stateId: authData.stateId,
          districtId: authData.districtId,
          blockId: authData.blockId,
          healthcareFacilityId: authData.healthcareFacilityId,
          mobileNumber: authData.mobileNumber,
        },
      );
      console.log(res.data);
      setCards(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handlePushNotifications(authData.id);

    notifee.onForegroundEvent(({type, detail}) => {
      if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction.id == 'answer'
      ) {
        navigation.navigate('Video call', {
          channel: channelForVideo
        })
      }
    });

    // ReactNativeForegroundService.add_task(
    //   () => {
    //     SocketService.on('check', data => {
    //       console.log(new Date(), data);
    //       Geolocation.getCurrentPosition(
    //         //Will give you the current location
    //         async position => {
    //           //getting the Longitude from the location json
    //           const currentLongitude = JSON.stringify(
    //             position.coords.longitude,
    //           );

    //           //getting the Latitude from the location json
    //           const currentLatitude = JSON.stringify(position.coords.latitude);

    //           const res = await axios.get('https://www.google.com')
    //           console.log(res.status)

    //           // SocketService.emit('ans', {
    //           //   currentLongitude,
    //           //   currentLatitude,
    //           // });
    //         },
    //         error => {
    //           console.error(error);
    //         },
    //       );
    //     });
    //   },
    //   {
    //     delay: 5000,
    //     onLoop: true,
    //     taskId: 'taskid',
    //     onError: e => console.log(`Error logging:`, e),
    //   },
    // );

    // ReactNativeForegroundService.start({
    //   id: 1244,
    //   title: 'Foreground Service',
    //   message: 'We are live World',
    //   icon: 'ic_launcher',
    // });

    SocketService.emit('combine', {
      userId: authData.id,
    });

    SocketService.on('join_room', data => {
      console.log('INCOMINGGGGGGG');
      navigation.navigate('Video Call', {
        channel: data.channel,
      });
    });

    fetchMyCards();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('recieved notification')
      if (remoteMessage?.data?.type == 'call') {
        displayNotification(remoteMessage)
        setChannelForVideo(remoteMessage.data.channel);
        // setModalVisible(true);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('recieved notification')
      if (remoteMessage?.data?.type == 'call') {
        displayNotification(remoteMessage)
        setChannelForVideo(remoteMessage.data.channel);
        // setModalVisible(true);
      }
    });

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log('opened app');
    //   if (remoteMessage.data.type == 'call') {
    //     console.log('matched');
    //     // navigation.navigate(
    //     //   'Video Call',
    //     //   JSON.stringify({
    //     //     channel: remoteMessage.data.channel,
    //     //   }),
    //     // );
    //     setChannelForVideo(remoteMessage.data.channel);
    //     setModalVisible(true);
    //   }
    // });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Incoming Video Call</Text>
            <View style={styles.btnContainer}>
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
        </View>
      </Modal>
      <DashboardHeaderBar
        name={authData.name}
        designation={authData.designation}
        specialization={authData.specialization}
        userId={authData.id}
      />

      <View style={styles.searchView}>
        <PHCSearchDashboard navigation={navigation} />
        <CHSearchDashboard navigation={navigation} />
        <ZHSearchDashboard navigation={navigation} />
        <MedColSearchDashboard navigation={navigation} />
      </View>

      <ScrollView style={{marginBottom: 10}}>
        {cards == [] ? (
          <ActivityIndicator size={'small'} />
        ) : (
          cards?.map(card => {
            return (
              <DoctorCard
                name={card.name}
                designation={card.designation}
                HF={card.healthcareFacilityName}
                userId={card.id}
                key={card.id}
                navigation={navigation}
                route={route}
                mobileNumber={card.mobileNumber}
                fcmToken={card.fcmToken}
                availability={card.availability}
              />
            );
          })
        )}
      </ScrollView>
      <SearchBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.SAND,
    paddingVertical: 10,
  },
  searchView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
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
    padding: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    marginTop: 25,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
    elevation: 2,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  accept: {
    backgroundColor: 'green',
  },
  reject: {
    backgroundColor: 'orangered',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    width: 200,
    color: styleConstants.BLUE,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    // color: styleConstants.BLUE,
  },
});
