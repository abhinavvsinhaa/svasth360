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

export default ChatHead = ({navigation}) => {
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
    try {
      const response = await axiosInstance.post('conversation', {
        userId: authData.id,
      });

      // console.log(response.data);

      const convs = response.data.map(convo => {
        // const users = Array(convo.users)
        // const messages = Array(convo.messages)
        // if (users.length > 0) {
        let user =
          convo.users[0].id == authData.id ? convo.users[1] : convo.users[0];
        // console.log(user.id)
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
          fcmToken: user.fcmToken
          // timestamp: `${dt.toTimeString()}`,
        };
        // }
      });

      setConvos(convs);
    } catch (error) {
      console.error('Error here', error);
    }
  };

  useEffect(() => {
    fetchMyConvos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Inbox</Text>
      <ScrollView style={{paddingVertical: 10}}>
        {convos != [] &&
          convos.map((convo, i) => {
            return (
              <View key={i}>
                <Divider />
                <View style={styles.listContainer}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Image
                      source={require('../../assets/images/DoctorSamplePhoto.png')}
                      style={{height: 50, width: 50}}
                    />
                    <View style={{marginLeft: 10}}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate('Personal Chat', {
                            userId: convo.id,
                            name: convo.name,
                            mobileNumber: convo.mobileNumber,
                            fcmToken: convo.fcmToken
                          });
                        }}>
                        <Text>{convo.name}</Text>
                        <Text>{convo.lastMessage}</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View>
                    {
                      convo.availability == 'offline' 
                      ?
                      <Image source={require('../../assets/images/red-icon.png')} style={{ height: 25, width: 25 }}/>
                      :
                      <Image source={require('../../assets/images/green-icon.png')} style={{ height: 25, width: 25 }}/>
                    }
                    <Text>{convo.timestamp}</Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
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
