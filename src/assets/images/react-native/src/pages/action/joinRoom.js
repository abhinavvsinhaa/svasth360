import React, { useState } from 'react';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';
import { useZIM } from '../../hooks/zim';


const JoinRoom = ({ navigation }) => {
  const [, zimAction] = useZIM();
  const [value, setValue] = useState('');
  const [submit, setSubmit] = useState(false);

  const submitID = (id) => {
    if (!!id) {
      zimAction.joinRoom(id).then((res) => {
        if (!res) return;
        const convInfo = {
          id: res.roomInfo.baseInfo.roomID,
          type: 1,
          name: res.roomInfo.baseInfo.roomName,
        };
        navigation.push('Chat', { ...convInfo });
      })
    }
  }

  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>room ID</Text>
        <Input
          placeholder='Place user ID'
          value={value}
          status={!value && submit ? 'danger' : ''}
          onChangeText={nextValue => { setValue(nextValue), setSubmit(true) }}
          style={styles.input}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitID(value), setSubmit(true) }}> Submit</Button>

    </View>
  )
}

const styles = StyleSheet.create({

  content: {
    flex: 1,
    paddingTop: 150,
    alignItems: "center",
    height: "100%",
    backgroundColor: "white"
  },
  inputBox: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    marginTop: 30,
    height: 50,
    minWidth: "90%"
  },
  text: {
    paddingRight: 10,
    lineHeight: 40,
    textAlign: "center"
  }
})

export default JoinRoom;
