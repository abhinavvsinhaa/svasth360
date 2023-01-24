import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {styleConstants} from '../constants/constant';


export const SignUp = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleGetOTP(event) {
    event.preventDefault();
    if (
      phoneNumber == '' ||
      phoneNumber.length != 10 ||
      !String(phoneNumber).match(/^\d{10}$/)
    ) {
      Alert.alert(
        'Invalid Phone Number',
        'Please fill a valid phone number upto 10 digits.',
      );
      return;
    }
    // signInWithPhoneNumber();
    navigation.navigate('Enter OTP', { phoneNumber: `+91${phoneNumber}` })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Image source={require('../assets/images/Logo.png')} />
        <Image source={require('../assets/images/SignupMob.png')} />
        <Text style={styles.otpVerificationHeader}>OTP Verification</Text>
        <Text style={styles.otpVerificationDescription}>
          We will send you a One Time Password on this mobile number
        </Text>
        <TextInput
          placeholder="Enter your mobile number"
          style={styles.mobileNumberInput}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <Pressable style={styles.getOTPButton} onPress={handleGetOTP}>
          <Text style={styles.OTPButtonText}>Get OTP</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  otpVerificationHeader: {
    color: styleConstants.BLUE,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  otpVerificationDescription: {
    color: styleConstants.BLUE,
    width: '75%',
    textAlign: 'center',
    marginTop: 5,
  },
  mobileNumberInput: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    width: '75%',
    marginTop: 20,
  },
  getOTPButton: {
    backgroundColor: styleConstants.BLUE,
    fontSize: 20,
    color: styleConstants.SAND,
    borderRadius: 100,
    width: '50%',
    paddingVertical: 10,
    marginTop: 20,
  },
  OTPButtonText: {
    color: styleConstants.SAND,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
