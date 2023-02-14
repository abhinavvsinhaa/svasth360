import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Socket } from "socket.io-client";
import { styleConstants } from "../../constants/constant";
import { useAuth } from "../../context/Auth";
import SocketService from "../../utils/socket";

export const Chat = ({ userId }) => {
  const { zim, userInfo } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'sent',
      messageContent: 'Lorem ipsum'
    },
    {
      type: 'recieved',
      messageContent: 'Lorem ipsum'
    }
  ])

  const sendMessage = () => {
    console.log(userId)
    var toUserID = userId;
    var config = {
      priority: 1, // Set priority for the message. 1: Low (by default). 2: Medium. 3: High.
    };
    var type = 0; // Session type. Values are: 0: One-on-one chat.  1: Chat room  2: Group chat.
    var notification = {
      onMessageAttached: function (message) {
        // todo: Loading
        console.log(message)
      },
    };

    // Send one-to-one text messages.
    var messageTextObj = { type: 1, message: "Text message content" };
    zim
      .sendMessage(messageTextObj, toUserID, type, config, notification)
      .then(function ({ message }) {
        // Message sent successfully.
        setMessages([...messages, {
          type: 'sent',
          messageContent: messageTextObj.message
        }])
        console.log('message sent successfully')
      })
      .catch(function (err) {
        // Failed to send the message.
        console.error('err in sending message', err)
      });
  };

  const getHistory = async() => {
    const res = await zim.queryHistoryMessage(userId, 0, {
      nextMessage: null,
      count: 50,
      reverse: true
    })

    console.log(res)
  }

  const sendMessageCustom =  async() => {
    SocketService.emit('send_message', {
      userId,
      message: {
        timestamp: new Date(),
        type: 0, // 0 -> for text message, 1 for media messages
        content: 'lorem ipsum'
      }
    })
  }

  useEffect(() => {
    SocketService.emit('connect_user', {
      userId
    })

    SocketService.on('connection_status', data => {
      console.log("Is socket connected", data)
    })

    SocketService.on('recieve_message', data => {

    })

    getHistory();
    // Set up and listen for the callback for receiving error codes.
    zim.on("error", function (zim, errorInfo) {
      console.log("error", errorInfo.code, errorInfo.message);
    });


    // Set up and listen for the callback for connection status changes.
    zim.on(
      "connectionStateChanged",
      function (zim, { state, event, extendedData }) {
        console.log("connectionStateChanged", state, event, extendedData);
      }
    );

    // Set up and listen for the callback for receiving one-to-one messages.
    zim.on(
      "receivePeerMessage",
      function (zim, { messageList, fromConversationID }) {
        if (userId == fromConversationID) {
          setMessages([...messages, {
            type: 'recieved',
            messageContent: messageList[0]
          }])
        }
        console.log("receivePeerMessage", messageList, fromConversationID);
        
      }
    );
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => setMessages([...messages, {
        type: 'recieved',
        messageContent: 'lorem ipsum'
      }])}>
          <Text>Send Message</Text>
      </Pressable>
      {
        messages != [] &&
        messages.map(msg => {
          if (msg.type == 'sent') {
            return (
              <View style={styles.sendOuterContainer}>
                <Text style={styles.sendContainer}>Lorem Ipsum</Text>
              </View>
            )
          } else {
            return (
              <View style={styles.recieveOuterContainer}>
                <Text style={styles.recieveContainer}>Lorem Ipsum</Text>
              </View>
            )
          }
        })
      }
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sendOuterContainer: {
    width: '50%',
    alignSelf: 'flex-end',
    margin: 10
  },
  recieveOuterContainer: {
    width: '50%',
    alignSelf: 'flex-start',
    margin: 10
  },
  sendContainer: {
    backgroundColor: styleConstants.LIGHT_BLUE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff'
  },
  recieveContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: styleConstants.LIGHT_BLUE
  }
})