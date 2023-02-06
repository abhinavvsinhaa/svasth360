import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text } from "react-native";
import { useAuth } from "../../context/Auth";

export const Chat = ({ userId }) => {
  const { zim, userInfo } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false)

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
  useEffect(() => {
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
        console.log("receivePeerMessage", messageList, fromConversationID);
        Alert.alert('message recieved')
      }
    );
  }, []);
  return (
    <Pressable onPress={sendMessage}>
        <Text>Send Message</Text>
    </Pressable>
  );
};
