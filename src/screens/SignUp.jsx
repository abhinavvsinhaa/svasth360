import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '../api/axios';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';

const samplePhoneNumber = '1234567899';

export const SignUp = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {signIn} = useAuth();
  const [loading, setLoading] = useState(false);

  async function checkIfUserExists() {
    try {
      const res = await axiosInstance.post(`doctor/find`, {
        mobileNumber: `+91${phoneNumber}`,
      });

      // no need to enter otp if user is already registered
      if (res.data) {
        await signIn(res.data);
        navigation.navigate('Tab Navigator');
      } else {
        navigation.navigate('Enter OTP', {phoneNumber: `+91${phoneNumber}`});
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGetOTP(event) {
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

    // handle flow
    setLoading(true);
    if (phoneNumber != samplePhoneNumber) {
      checkIfUserExists();
    } else {
      // delete dummy user and then navigate
      const res = await axiosInstance.delete('doctor')
      console.log(res.data)
      if (res.data == 'deleted') {
        navigation.navigate('Sign Up', {
          mobileNumber: phoneNumber,
          user: JSON.stringify({
            phoneNumber,
          }),
        });
      }

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Image source={require('../assets/images/Logo.png')} />
        <Image source={require('../assets/images/SignupMob.png')} />
        {loading == false ? (
          <>
            <Text style={styles.otpVerificationHeader}>Mobile Number</Text>
            <Text style={styles.otpVerificationDescription}>
              Please type your mobile number in the text field below.
            </Text>
            <TextInput
              placeholder="Enter your mobile number"
              style={styles.mobileNumberInput}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              inputMode="numeric"
              keyboardType="numeric"
            />
            <Pressable style={styles.getOTPButton} onPress={handleGetOTP}>
              <Text style={styles.OTPButtonText}>Next</Text>
            </Pressable>
          </>
        ) : (
          <ActivityIndicator style={{marginTop: 10}} />
        )}
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
