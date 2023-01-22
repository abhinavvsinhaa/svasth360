import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import {styleConstants} from '../constants/constant';

export const EnterOTP = ({navigation, mobileNumber}) => {
  function submitOTP() {
    navigation.navigate('Sign Up');
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Image source={require('../assets/images/Logo.png')} />
        <Image source={require('../assets/images/Lock.png')} />
        <Text style={styles.otpVerificationHeader}>OTP Verification</Text>
        <Text style={styles.otpVerificationDescription}>
          Enter the OTP sent to +91 {mobileNumber}
        </Text>
        <View style={styles.enterOTPInputView}>
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
          <TextInput style={styles.otpInput} />
        </View>
        <Pressable style={styles.getOTPButton} onPress={submitOTP}>
          <Text style={styles.OTPButtonText}>Submit</Text>
        </Pressable>
        <Text style={{marginTop: 10}}>Didn't recieve the OTP? </Text>
        <Pressable>
          <Text style={styles.resendText}>Resend</Text>
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
  otpInput: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    width: '15%',
    marginHorizontal: 10,
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
  enterOTPInputView: {
    display: 'flex',
    flexDirection: 'row',
  },
  resendText: {
    fontFamily: 'Poppins-Medium',
    marginTop: 5,
  },
});
