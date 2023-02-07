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
} from 'react-native';
import {Chat as ChatP} from '../components/Chat/Chat';
import {ChatHeader} from '../components/Chat/ChatHeader';
import {ChatInput} from '../components/Chat/ChatInput';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';

export const Chat = ({navigation, route}) => {
  const {zim, userInfo} = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'sent',
      messageContent: 'Lorem ipsum',
    },
    {
      type: 'recieved',
      messageContent: 'Lorem ipsum',
    },
  ]);

  const sendMessage = () => {
    var toUserID = route.params.userId;
    var config = {
      priority: 1, // Set priority for the message. 1: Low (by default). 2: Medium. 3: High.
    };
    var type = 0; // Session type. Values are: 0: One-on-one chat.  1: Chat room  2: Group chat.
    var notification = {
      onMessageAttached: function (message) {
        // todo: Loading
        console.log(message);
      },
    };

    setMessages([
      ...messages,
      {
        type: 'sent',
        messageContent: messageBody,
      },
    ]);
    // Send one-to-one text messages.
    var messageTextObj = {type: 1, message: messageBody};
    zim
      .sendMessage(messageTextObj, toUserID, type, config, notification)
      .then(function ({message}) {
        // Message sent successfully.

        console.log('message sent successfully');
      })
      .catch(function (err) {
        // Failed to send the message.
        console.error('err in sending message', err);
      });
  };

  const getHistory = async () => {
    const res = await zim.queryHistoryMessage(route.params.userId, 0, {
      nextMessage: null,
      count: 50,
      reverse: true,
    });

    console.log(res);
  };
  useEffect(() => {
    getHistory();
    // Set up and listen for the callback for receiving error codes.
    zim.on('error', function (zim, errorInfo) {
      console.log('error', errorInfo.code, errorInfo.message);
    });

    // Set up and listen for the callback for connection status changes.
    zim.on(
      'connectionStateChanged',
      function (zim, {state, event, extendedData}) {
        console.log('connectionStateChanged', state, event, extendedData);
      },
    );

    // Set up and listen for the callback for receiving one-to-one messages.
    zim.on(
      'receivePeerMessage',
      function (zim, {messageList, fromConversationID}) {
        if (userId == fromConversationID) {
          setMessages([
            ...messages,
            {
              type: 'recieved',
              messageContent: messageList[0],
            },
          ]);
        }
        console.log('receivePeerMessage', messageList, fromConversationID);
      },
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        name={route.params.name}
        navigation={navigation}
        mobileNumber={route.params.mobileNumber}
      />
      <ImageBackground
        source={require('../assets/images/Splash.png')}
        style={{flex: 1}}>
        {/* <ChatP userId={route.params.userId}/> */}
        <ScrollView style={styles.container}>
          {/* <Pressable
            onPress={() =>
              setMessages([
                ...messages,
                {
                  type: 'recieved',
                  messageContent: 'lorem ipsum',
                },
              ])
            }>
            <Text>Send Message</Text>
          </Pressable> */}
          {messages != [] &&
            messages.map(msg => {
              if (msg.type == 'sent') {
                return (
                  <View style={styles.sendOuterContainer}>
                    <Text style={styles.sendContainer}>
                      {msg.messageContent}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.recieveOuterContainer}>
                    <Text style={styles.recieveContainer}>Lorem Ipsum</Text>
                  </View>
                );
              }
            })}
        </ScrollView>
        <View style={styles.container2}>
          <TextInput
            placeholder={'Type message'}
            value={messageBody}
            onChangeText={setMessageBody}
            style={styles.input}
          />
          <View style={styles.attachOuterContainer}>
            <Image
              source={require('../assets/images/ChatCameraAttachIcon.png')}
            />
          </View>
          <View style={styles.attachOuterContainer}>
            <Image source={require('../assets/images/ChatAttachIcon.png')} />
          </View>
          <Pressable onPress={sendMessage} style={styles.attachOuterContainer}>
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
  container: {
    flex: 1,
  },
  sendOuterContainer: {
    width: '50%',
    alignSelf: 'flex-end',
    margin: 10,
  },
  recieveOuterContainer: {
    width: '50%',
    alignSelf: 'flex-start',
    margin: 10,
  },
  sendContainer: {
    backgroundColor: styleConstants.LIGHT_BLUE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
  },
  recieveContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: styleConstants.LIGHT_BLUE,
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
