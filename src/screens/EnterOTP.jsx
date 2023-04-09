import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
import {styleConstants} from '../constants/constant';
import auth from '@react-native-firebase/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useAuth} from '../context/Auth';
import axiosInstance from '../api/axios';
import axios from 'axios';

export const EnterOTP = ({navigation, route}) => {
  const {phoneNumber} = route.params;
  const [confirmation, setConfirmation] = useState(null);
  const [otpGenerated, setOTPGenerated] = useState('');
  const [incorrectOTP, setIncorrectOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const {signIn, loading} = useAuth();

  async function generateOTP() {
    const generateNewOTP = String(Math.floor(100000 + Math.random() * 900000));
    setOTPGenerated(generateNewOTP);

    // remove +91
    const phone = String(phoneNumber).slice(3);

    // generate and send OTP
    const res = await axios.get(
      `https://www.fast2sms.com/dev/bulkV2?authorization=SDjduUQYiyVlNTKwt1C0Je96hzbpnLfFovO3BrPEsakXR84xgmG0B9eZDRxwyra3h8vPXmCHk4UY1ufo&variables_values=${generateNewOTP}&route=otp&numbers=${phone}`,
    );
    console.log(res.data);
  }

  async function fetchUserDataSimulatenously() {}

  useEffect(() => {
    generateOTP();
  }, []);

  async function validateOTP() {
    try {
      if (otpGenerated == otp) {
        navigation.navigate('Sign Up', {
          mobileNumber: phoneNumber,
          user: JSON.stringify({
            phoneNumber,
          }),
        });
      }

      // incorrect otp
      else {
        setIncorrectOTP(true);
        Alert.alert('Incorrect OTP', 'Please re-enter the OTP');
        setIncorrectOTP(false);
      }
    } catch (error) {
      Alert.alert(error);
      console.log('error validating OTP', error);
    }
  }

  function submitOTP(event) {
    event.preventDefault();
    if (otp == '') {
      Alert.alert('Invalid OTP', 'Please fill OTP again.');
      return;
    }

    validateOTP();
    // navigation.navigate('Sign Up');
  }

  return (
    <SafeAreaView style={styles.container}>
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
        {otpGenerated != '' && <Text style={{marginTop: 10}}>OTP Sent ✅</Text>}
        <Text style={{marginTop: 10}}>Didn't recieve the OTP? </Text>
        <Pressable
          onPress={() => {
            setOTPGenerated('');
            generateOTP();
          }}>
          <Text style={styles.resendText}>Resend</Text>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
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
    color: '#000',
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
