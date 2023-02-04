import React, {useState} from 'react';
import {TextInput, View, StyleSheet, Image} from 'react-native';
import {styleConstants} from '../../constants/constant';

export const ChatInput = () => {
  const [messageBody, setMessageBody] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Type message'}
        value={messageBody}
        onChangeText={setMessageBody}
        style={styles.input}
        multiline={true}
        numberOfLines={2}
      />
      <View style={styles.attachOuterContainer}>
        <Image
          source={require('../../assets/images/ChatCameraAttachIcon.png')}
        />
      </View>
      <View style={styles.attachOuterContainer}>
        <Image source={require('../../assets/images/ChatAttachIcon.png')} />
      </View>
      <View style={styles.attachOuterContainer}>
        <Image
          source={require('../../assets/images/ChatSendIcon.png')}
          style={{width: 25, height: 25}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
