import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';

const Stack = createNativeStackNavigator();

enableScreens();

export const AuthStack = () => {
  <Stack.Navigator>
    <Stack.Screen name="Enter Mobile Number" component={SignUp} />
    <Stack.Screen name="Enter OTP" component={EnterOTP} />
    <Stack.Screen name="Sign Up" component={FillSignUpDetails} />
  </Stack.Navigator>;
};
