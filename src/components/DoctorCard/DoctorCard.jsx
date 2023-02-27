import 'react-native-get-random-values';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import {styleConstants} from '../../constants/constant';
import SocketService from '../../utils/socket';
import {v4 as uuidv4} from 'uuid';

export const DoctorCard = ({
  name,
  designation,
  HF,
  userId,
  navigation,
  mobileNumber,
  fcmToken,
  availability
}) => {
  const [rtcToken, setRTCToken] = useState('');
  const openDialScreen = () => {
    if (Platform.OS == 'android') {
      const phone = `tel:${mobileNumber}`;
      Linking.openURL(phone);
    } else if (Platform.OS == 'ios') {
      const phone = `telprompt:${mobileNumber}`;
      Linking.openURL(phone);
    }
  };

  const fetchAgoraToken = async () => {
    try {
      const uid = uuidv4();
      console.log('roomId', uid);
      
      navigation.navigate('Video Call', {
        channel: uid,
      });

      SocketService.emit('create_room', {
        channel: uid,
        userId,
        fcmToken
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.doctorDetailsOuterContainer}>
        <View style={styles.doctorDetailContainer}>
          <Image
            source={require('../../assets/images/DoctorSamplePhoto.png')}
          />
          <View style={{marginLeft: 5}}>
            <Text style={{color: styleConstants.BLUE}}>{name}</Text>
            <Text style={{color: styleConstants.BLUE}}>{designation}</Text>
            <Text style={{color: styleConstants.BLUE}}>{HF}</Text>
          </View>
        </View>
        {
          availability == 'offline' 
          ?
          <Image source={require('../../assets/images/red-icon.png')} style={{ width: 30, height: 30 }}/>
          :
          <Image source={require('../../assets/images/green-icon.png')} style={{ width: 30, height: 30 }}/>
        }
      </View>
      <View style={styles.actionButtonsContainer}>
        <Pressable onPress={openDialScreen}>
          <Image
            source={require('../../assets/images/VoiceCallCardIconDash.png')}
          />
        </Pressable>
        {/* <Pressable>
                    <Image source={require("../../assets/images/ChatCardIconDash.png")}/>
                </Pressable> */}
        <Pressable
          onPress={() => {
            navigation.navigate(
              'Personal Chat',
              // JSON.stringify(
                {
                  userId,
                  name,
                  mobileNumber,
                  navigation,
                },
            );
          }}>
          <Image source={require('../../assets/images/ChatCardIconDash.png')} />
        </Pressable>
        <Pressable onPress={fetchAgoraToken}>
          <Image source={require('../../assets/images/VideoCallIcon.png')} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  doctorDetailsOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorDetailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: styleConstants.SAND,
    width: '35%',
    borderRadius: 10,
    paddingVertical: 5,
  },
});
