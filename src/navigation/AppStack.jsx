import React from 'react';
import { TabNavigator } from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VideoCall } from '../components/VideoCall/VideoCall';
import { Chat, Search } from '../screens';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='Tab Navigator' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Tab Navigator' component={TabNavigator} />
      <Stack.Screen name='Video Call' component={VideoCall} />
      <Stack.Screen name='Personal Chat' component={Chat} />
      <Stack.Screen name='Search' component={Search} />
    </Stack.Navigator>
  );
};
