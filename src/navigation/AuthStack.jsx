import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {SignUp} from '../screens/SignUp';
import {EnterOTP} from '../screens/EnterOTP';
import {FillSignUpDetails} from '../screens/FillSignUpDetails';

const Stack = createNativeStackNavigator();

enableScreens();

export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Enter Mobile Number">
      <Stack.Screen name="Enter Mobile Number" component={SignUp} />
      <Stack.Screen name="Enter OTP" component={EnterOTP} />
      <Stack.Screen name="Sign Up" component={FillSignUpDetails} />
    </Stack.Navigator>
  );
};
