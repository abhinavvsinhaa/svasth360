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

export const Dashboard = ({navigation, route}) => {
  const {authData} = useAuth();
  const [cards, setCards] = useState([]);
  const [channelForVideo, setChannelForVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const rejectCallNotificationHandler = () => {
    setModalVisible(false);
    Alert.alert('You rejected');
    console.log('rejected');
  };

  const acceptCallNotificationHandler = () => {
    setModalVisible(false);
    Alert.alert('You accepted');
    navigation.navigate(
      'Video Call',
      JSON.stringify({
        channel: channelForVideo,
      }),
    );

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
      console.log('message arrived', remoteMessage);
      Alert.alert('INCOMINGG');
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('message arrived in background', remoteMessage);
      if (remoteMessage?.data?.type === 'call') {
        setChannelForVideo(prev => remoteMessage.data.channel);
        console.log('SHOW MODAL');
        // setModalVisible(true);
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('opened app');
      if (remoteMessage.data.type == 'call') {
        console.log('matched');
        // navigation.navigate(
        //   'Video Call',
        //   JSON.stringify({
        //     channel: remoteMessage.data.channel,
        //   }),
        // );
        setChannelForVideo(prev => remoteMessage.data.channel);
        setModalVisible(prev => true);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Call</Text>
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

      <ScrollView>
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
              />
            );
          })
        )}
      </ScrollView>
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
    padding: 35,
    paddingVertical: 50,
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
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    elevation: 2,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 25,
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
    color: 'white',
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: styleConstants.BLUE,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    // color: styleConstants.BLUE,
  },
});
