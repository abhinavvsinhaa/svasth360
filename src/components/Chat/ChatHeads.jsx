import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import axiosInstance from '../../api/axios';
import {styleConstants} from '../../constants/constant';
import {useAuth} from '../../context/Auth';

export default ChatHead = ({ navigation }) => {
  const [convos, setConvos] = useState([]);
  const {authData} = useAuth();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const fetchMyConvos = async () => {
    const response = await axiosInstance.post('conversation', {
      userId: authData.id,
    });

    console.log(response.data);

    const convs = response.data.map(convo => {
      const user =
        convo.users[0].id == authData.id ? convo.users[1] : convo.users[0];
      const msgContent =
        convo.messages[convo.messages.length - 1].type == 0
          ? convo.messages[convo.messages.length - 1].content
          : 'Attachment';
      const timestamp = convo.messages[convo.messages.length - 1].timestamp;
      const dt = new Date(timestamp);

      return {
        id: user.id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        lastMessage: msgContent,
        availability: user.availability,
        // timestamp: `${dt.toTimeString()}`,
      };
      //   setConvos([
      //     ...convos,
      //     {
      //       name: username,
      //       lastMessage: msg,
      //     },
      //   ]);
    });

    setConvos(convs);
  };

  useEffect(() => {
    fetchMyConvos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Inbox</Text>
      <ScrollView style={{paddingVertical: 10}}>
        {convos != [] &&
          convos.map(convo => {
            return (
              <>
                <Divider />
                <View style={styles.listContainer}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/images/DoctorSamplePhoto.png')}
                      style={{height: 50, width: 50}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Pressable onPress={() => {
                        navigation.navigate('Personal Chat', {
                            userId: convo.id,
                            name: convo.name,
                            mobileNumber: convo.mobileNumber
                        })
                      }}>
                        <Text>{convo.name}</Text>
                        <Text>{convo.lastMessage}</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View>
                    <Text>{convo.availability}</Text>
                    <Text>{convo.timestamp}</Text>
                  </View>
                </View>
              </>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: styleConstants.SAND,
    flex: 1,
  },
  heading: {
    color: styleConstants.BLUE,
    fontSize: 20,
  },
  listContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
