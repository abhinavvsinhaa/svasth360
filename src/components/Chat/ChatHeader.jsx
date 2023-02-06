import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, Pressable, Platform, Linking} from 'react-native';
import {styleConstants} from '../../constants/constant';

export const ChatHeader = ({name, navigation, mobileNumber}) => {
  // const [name, setName] = useState('Dr. Raj Kumar');
  const openDialScreen = () => {
    if (Platform.OS == 'android') {
      const phone = `tel:${mobileNumber}`;
      Linking.openURL(phone);
    } else if (Platform.OS == 'ios') {
      const phone = `telprompt:${mobileNumber}`;
      Linking.openURL(phone);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          source={require('../../assets/images/DoctorSamplePhoto.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{name}</Text>
      </View>
      <View style={styles.iconOuterContainer}>
        <Pressable onPress={() => navigation.navigate('Video Call')}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/ChatVideoCallIcon.png')}
            />
          </View>
        </Pressable>
        <Pressable onPress={openDialScreen}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/ChatVoiceCallIcon.png')}
            />
          </View>
        </Pressable>
        {/* <View style={styles.iconContainer}> */}
        <Image
          source={require('../../assets/images/ChatVerticalDotsIcon.png')}
        />
        {/* </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleConstants.BLUE,
    paddingVertical: 15,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  profileName: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 500,
  },
  iconOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
});
