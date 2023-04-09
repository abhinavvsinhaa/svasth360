import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
  TextInput,
  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '../api/axios';
import {Chat as ChatP} from '../components/Chat/Chat';
import {ChatHeader} from '../components/Chat/ChatHeader';
import {ChatInput} from '../components/Chat/ChatInput';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';
import SocketService from '../utils/socket';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {v4 as uuid} from 'uuid'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Chat = ({navigation, route}) => { 
  // const params = JSON.parse(route.params)
  const params = route.params;
  const {userId} = params;
  console.log(params)
  const {authData} = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [imageUploading, setImageUploading] = useState(false)

  async function fetchConversation() {
    const response = await axiosInstance.get(
      `conversation?userId1=${userId}&userId2=${authData.id}`,
    );
    setMessages(response.data.messages);
    setConversationId(response.data.id);
  }

  async function sendImageMessage(url) {
    try {
      const payload = {
        conversationId,
        type: 1,
        content: url,
        timestamp: new Date(),
        sender: authData.id,
        reciever: userId,
      };
  
      const response = await axiosInstance.patch('conversation', payload);
      SocketService.emit('send_message', payload);
      setMessages([...messages, payload]);
    } catch (error) {
      console.log('error in sending message', error)
    }
  }

  async function sendMessage() {
    try {
      const payload = {
        conversationId,
        type: 0,
        content: messageBody,
        timestamp: new Date(),
        sender: authData.id,
        reciever: userId,
      };
  
      const response = await axiosInstance.patch('conversation', payload);
      SocketService.emit('send_message', payload);
      setMessages([...messages, payload]);
    } catch (error) {
      console.log('error in sending message', error)
    }
  }

  const cameraLaunch = async () => {
    launchCamera(response => {
      console.log(response);
    });
  };

  const launchLibrary = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async response => {
        if (response.assets) {
          const res = response.assets[0];

          const uid = await uuid();
          const reference = storage().ref(`${uid}.png`);
          const task = reference.putFile(res.uri);
          task.then(async () => {
            console.log('Image uploaded');
            const url = await reference.getDownloadURL()
            sendImageMessage(url)
            console.log('download url', url);
          });
        }
      },
    );
  };

  useEffect(() => {
    fetchConversation();
    // uploadImageToS3Bucket();

    SocketService.on('recieve_message', data => {
      console.log('recieve', data);
      setMessages([...messages, data]);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        name={params.name}
        navigation={navigation}
        mobileNumber={params.mobileNumber}
        fcmToken={params.fcmToken}
        userId={userId}
      />
      <ImageBackground
        source={require('../assets/images/Splash.png')}
        style={{flex: 1}}>
        {/* <ChatP userId={route.params.userId}/> */}
        <KeyboardAwareScrollView style={styles.scrollContainer}> 
          {/* <ScrollView style={styles.container}> */}
            {messages != [] &&
              messages.map((msg, i) => {
                if (msg.sender == authData.id) {
                  return (
                    <View style={styles.sendOuterContainer} key={i}>
                      {
                        msg.type == 0 &&
                        <Text style={styles.sendContainer}>{msg.content}</Text>
                      }
                      {
                        msg.type == 1 &&
                        <Pressable style={styles.sendContainer} onPress={() => { 
                          Linking.openURL(msg.content)
                        }}>
                          <Image source={require('../assets/images/imageIcon.png')} style={{ height: 50, width: 50 }}/>
                          <Text style={{ color: '#fff', marginLeft: 5 }}>View Image</Text>
                        </Pressable>
                      }
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.recieveOuterContainer} key={i}>
                      {
                        msg.type == 0 &&
                        <Text style={styles.recieveContainer}>{msg.content}</Text>
                      }
                      {
                        msg.type == 1 &&
                        <Pressable style={styles.recieveContainer} onPress={() => { 
                          Linking.openURL(msg.content)
                        }}>
                          <Image source={require('../assets/images/imageIcon.png')} style={{ height: 50, width: 50 }}/>
                          <Text style={{ color: `${styleConstants.BLUE}`, marginLeft: 5 }}>View Image</Text>
                        </Pressable>
                      }
                    </View>
                  );
                }
              })}
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
        <View style={styles.container2}>
          <TextInput
            placeholder={'Type message'}
            value={messageBody}
            onChangeText={setMessageBody}
            style={styles.input}
          />
          <View style={styles.attachOuterContainer}>
            <Pressable onPress={cameraLaunch}>
              <Image
                source={require('../assets/images/ChatCameraAttachIcon.png')}
              />
            </Pressable>
          </View>
          <View style={styles.attachOuterContainer}>
            <Pressable onPress={launchLibrary}>
              <Image source={require('../assets/images/ChatAttachIcon.png')} />
            </Pressable>
          </View>
          <Pressable style={styles.attachOuterContainer} onPress={sendMessage}>
            <View>
              <Image
                source={require('../assets/images/ChatSendIcon.png')}
                style={{width: 25, height: 25}}
              />
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    // flex: 1,
    marginBottom: 80
  },
  sendOuterContainer: {
    maxWidth: '50%',
    alignSelf: 'flex-end',
    marginTop: 7,
    marginRight: 5,
  },
  recieveOuterContainer: {
    maxWidth: '50%',
    alignSelf: 'flex-start',
    marginTop: 7,
    marginLeft: 5,
  },
  sendContainer: {
    backgroundColor: styleConstants.BLUE,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  recieveContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: styleConstants.BLUE,
  },
  container2: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: styleConstants.BLUE,
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  attachOuterContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    width: '60%',
  },
});
