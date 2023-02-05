import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ZimProvider } from './src/hooks/zim';
//pages
import Login from './src/pages/login/login';
import Home from './src/pages/home/home';
import Chat from './src/pages/chat/chat';
import GroupInfo from './src/pages/group/info';

//action
import CreateC2C from './src/pages/action/createC2C';
import CreateGroup from './src/pages/action/createGroup';
import JoinGroup from './src/pages/action/joinGroup';
import CreateRoom from './src/pages/action/createRoom';
import JoinRoom from './src/pages/action/joinRoom';
import UpdateUser from './src/pages/action/updateUser';

//group function
import MemberChange from './src/pages/group/memberChange';
import GroupModifyName from './src/pages/group/modifyName';
import GroupModifyNotice from './src/pages/group/modifyNotice';
import Allmembers from './src/pages/group/allMembers';
import Remark from './src/pages/group/remark';
import ChangeOwner from './src/pages/group/changeOwner';

import Call from './src/pages/chat/call';
import CallReceived from './src/pages/chat/callReceived';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <>
            {/* ui warehouse  */}
            <Toast />
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <ZimProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <NavigationContainer initialRouteName="Login">
                            <Stack.Navigator>
                                <Stack.Screen name="Login" component={Login} options={{ title: 'zego IM' }} />
                                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                                <Stack.Screen name="Chat" component={Chat} />

                                <Stack.Screen
                                    name="CreateC2C"
                                    component={CreateC2C}
                                    options={{ title: 'Create a 1v1 chat' }}
                                />
                                <Stack.Screen
                                    name="CreateGroup"
                                    component={CreateGroup}
                                    options={{ title: 'Create a group chat' }}
                                />
                                <Stack.Screen
                                    name="JoinGroup"
                                    component={JoinGroup}
                                    options={{ title: 'Join a group' }}
                                />
                                <Stack.Screen
                                    name="CreateRoom"
                                    component={CreateRoom}
                                    options={{ title: 'Create a room' }}
                                />
                                <Stack.Screen name="JoinRoom" component={JoinRoom} options={{ title: 'Join a room' }} />
                                <Stack.Screen
                                    name="UpdateUser"
                                    component={UpdateUser}
                                    options={{ title: 'Update user info' }}
                                />

                                <Stack.Screen name="MemberChange" component={MemberChange} />
                                <Stack.Screen
                                    name="EditGroupName"
                                    component={GroupModifyName}
                                    options={{ title: 'Edit group name' }}
                                />
                                <Stack.Screen
                                    name="GroupNotice"
                                    component={GroupModifyNotice}
                                    options={{ title: 'Edit group notice' }}
                                />
                                <Stack.Screen
                                    name="Allmembers"
                                    component={Allmembers}
                                    options={{ title: 'Allmembers' }}
                                />
                                <Stack.Screen
                                    name="Remark"
                                    component={Remark}
                                    options={{ title: 'Edit group remark' }}
                                />
                                <Stack.Screen
                                    name="ChangeOwner"
                                    component={ChangeOwner}
                                    options={{ title: 'Change the group owner to' }}
                                />
                                <Stack.Screen name="GroupInfo" component={GroupInfo} options={{ title: 'GroupInfo' }} />

                                <Stack.Screen name="Call" component={Call} options={{ title: 'Call' }} />
                                <Stack.Screen
                                    name="CallReceived"
                                    component={CallReceived}
                                    options={{ title: 'Call Received' }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </SafeAreaView>
                </ZimProvider>
            </ApplicationProvider>
        </>
    );
};
export default App;
