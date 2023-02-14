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
import axiosInstance from '../api/axios';
import {Chat as ChatP} from '../components/Chat/Chat';
import {ChatHeader} from '../components/Chat/ChatHeader';
import {ChatInput} from '../components/Chat/ChatInput';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';
import SocketService from '../utils/socket';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AWS from 'aws-sdk';
import decode from 'base64-arraybuffer';
import RNFS from 'react-native-fs';
import {RNS3} from 'react-native-aws3';

export const Chat = ({navigation, route}) => {
  const {userId} = route.params;
  const {authData} = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');
  const [conversationId, setConversationId] = useState('');

  AWS.config.update({
    region: 'ap-south-1',
    credentials: {
      accessKeyId: 'AKIAQMEXTK3GWN6G3MQC',
      secretAccessKey: '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',
    },
    signatureVersion: 'v4',
  });

  async function fetchConversation() {
    const response = await axiosInstance.get(
      `conversation?userId1=${userId}&userId2=${authData.id}`,
    );
    setMessages(response.data.messages);
    setConversationId(response.data.id);
  }

  async function sendMessage() {
    const payload = {
      conversationId,
      type: 0,
      content: messageBody,
      timestamp: new Date(),
      sender: authData.id,
      reciever: userId,
    };

    SocketService.emit('send_message', payload);
    const response = await axiosInstance.patch('conversation', payload);
    setMessages([...messages, payload]);
  }

  const uploadImageToS3Bucket = async file => {
    try {
      console.log('upload image to s3');
      console.log(file);

      // let contentType = 'image/jpeg';
      // let contentDeposition = 'inline;filename="' + file.name + '"';
      // const base64 = await RNFS.readFile(file.uri, 'base64');
      // const arrayBuffer = await decode(base64);

      // const s3 = new AWS.S3({
      //   region: 'ap-south-1',
      //   logger: console
      // });
      // console.log("her", Object.getOwnPropertyNames(AWS.S3.prototype))
      // s3.upload({
      //   Bucket: 'svasth360has-chat',
      //   Key: file.name,
      //   Body: arrayBuffer,
      //   ContentDisposition: contentDeposition,
      //   ContentType: contentType
      // }, (err, data) => {
      //   if (err) console.error(err)
      //   else console.log(data)
      // });
      // const options = {
      //   keyPrefix: "/",
      //   bucket: "svasth360has-chat",
      //   region: "ap-south-1",
      //   accessKey: "AKIAQMEXTK3G5VXPYNWB",
      //   secretKey: "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",
      //   successActionStatus: 201
      // }

      // RNS3.put(file, options).then(response => {
      //   if (response.status !== 201)
      //     throw new Error("Failed to upload image to S3");
      //   console.log(response.body);
      // })
    } catch (error) {
      console.error(error);
    }
    // s3Bucket.createBucket({}, () => {
    //   const params = {
    //     Bucket: '',
    //     Key: file.name,
    //     Body: arrayBuffer,
    //     ContentDisposition: contentDeposition,
    //     ContentType: contentType,
    //   };
    // });
  };

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
          // const file = {
          //   uri: res.uri,
          //   name: res.fileName,
          //   type: 'image/jpeg'
          // }
          const data = new FormData();
          data.append('name', 'avatar');
          data.append('fileData', {
            uri: res.uri,
            type: res.type,
            name: res.fileName,
          });
          const re = await axiosInstance.post('upload', data)
          console.log(re)
        }
        // await uploadImageToS3Bucket(file)
      },
    );

    // if (response) {
    //   console.log(response)
    // }
  };

  useEffect(() => {
    fetchConversation();
    // uploadImageToS3Bucket();

    SocketService.on('recieve_message', data => {
      console.log('recieve', data);
      const msgs = messages;
      msgs.push(data);
      setMessages(msgs);
    });
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
            messages.map((msg, i) => {
              if (msg.sender == authData.id) {
                return (
                  <View style={styles.sendOuterContainer} key={i}>
                    <Text style={styles.sendContainer}>{msg.content}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.recieveOuterContainer} key={i}>
                    <Text style={styles.recieveContainer}>{msg.content}</Text>
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
  container: {
    flex: 1,
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
    backgroundColor: styleConstants.LIGHT_BLUE,
    borderRadius: 10,
    paddingVertical: 8,
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
