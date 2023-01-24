import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard } from "../screens/Dashboard";
import {enableScreens} from 'react-native-screens';

const Stack = createNativeStackNavigator()
enableScreens();

export const AppStack = () => {
    <Stack.Navigator>
        <Stack.Screen component={Dashboard} name='Dashboard'/>
    </Stack.Navigator>
}