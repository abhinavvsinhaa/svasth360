import React, { useEffect, useState} from 'react';
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
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useAuth } from '../context/Auth';

export const EnterOTP = ({navigation, route}) => {
  const {phoneNumber} = route.params;
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOTP] = useState('');
  const { signIn, loading } = useAuth() 

  async function generateOTP() {
    const generatedOTP = await auth().signInWithPhoneNumber(
      JSON.stringify(phoneNumber),
    );
    setConfirmation(generatedOTP);
  }

  useEffect(() => {
    generateOTP();
  }, []);

  async function validateOTP() {
    try {
      if (confirmation != null) {
        const res = await confirmation.confirm(String(otp));

        // if new user navigate to sign up page, else sign in user
        if (res.additionalUserInfo.isNewUser) {
          navigation.navigate('Sign Up')
        } 
        else {
          signIn(res.user)
        }
      }
    } catch (error) {
      Alert.alert("Incorrect OTP", "Please check again and fill the correct OTP")
      console.log('error validating OTP', error);
    }
  }

  function submitOTP(event) {
    event.preventDefault();
    if ((otp == '')) {
      Alert.alert('Invalid OTP', 'Please fill OTP again.');
      return;
    }

    validateOTP();
    // navigation.navigate('Sign Up');
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
          Enter the OTP sent to {phoneNumber}
        </Text>
        <View style={styles.enterOTPInputView}>
          <OTPInputView
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.otpInput}
            onCodeFilled={code => setOTP(code)}
          />
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
    // paddingVertical: 15,
    // paddingHorizontal: 20,
    // backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 10,
    textAlign: 'center',
    color: "#000"
    // paddingHorizontal: 10,
    // paddingVertical: 10,
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
    height: 75,
  },
  resendText: {
    fontFamily: 'Poppins-Medium',
    marginTop: 5,
  },
});
