import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {styleConstants} from '../constants/constant';
import {
  Profile,
  Appointment,
  Notifications,
  Dashboard,
  FillSignUpDetails,
  Chat,
} from '../screens';
import {ZegoChat} from '../components/Chat/Chat';
import ChatHeads from '../components/Chat/ChatHeads';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: styleConstants.BLUE,
          paddingVertical: 12,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                {focused ? (
                  <Image
                    source={require('../assets/images/profile-active.png')}
                  />
                ) : (
                  <Image
                    source={require('../assets/images/ProfileTabIcon.png')}
                  />
                )}
              </>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../assets/images/NotificationsTabIcon.png')}
              />
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                {focused ? (
                  <Image source={require('../assets/images/HomeTabIcon.png')} />
                ) : (
                  <Image
                    source={require('../assets/images/dashboard-inactive.png')}
                  />
                )}
              </>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image source={require('../assets/images/AppointmentTabIcon.png')} />
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Chat"
        component={ChatHeads}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <>
                {focused ? (
                  <Image
                    source={require('../assets/images/inbox-active.png')}
                  />
                ) : (
                  <Image source={require('../assets/images/ChatTabIcon.png')} />
                )}
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
