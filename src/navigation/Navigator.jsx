import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import { View, Text } from 'react-native';
import { SignUp } from '../screens/SignUp';
import { EnterOTP } from '../screens/EnterOTP';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

enableScreens();

export const Navigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={SignUp}/>
            <Stack.Screen name='Details' component={EnterOTP}/>
        </Stack.Navigator>
    );
}