import React, { useState } from 'react';
import {
  Layout, Button, Input, Text
} from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';
import { useZIM } from '../../hooks/zim';


const CreateRoom = ({ navigation }) => {
  const [, zimAction] = useZIM();
  const [data, setData] = useState({ name: '', id: '', submit: false });
  const submitForm = (roomName, roomID) => {
    if (!!roomName && !!roomID) {
      zimAction.createRoom({ roomName, roomID }).then(() => {
        const convInfo = { type: 1, id: roomID, name: roomName };
        zimAction.setConvInfo({ ...convInfo });
        navigation.push('Chat', { ...convInfo });
      })
    }
  }
  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={{ paddingRight: 10, lineHeight: 40, textAlign: "center" }}>Room ID</Text>
        <Input
          placeholder='ruquired'
          value={data.id}
          status={!data.id && data.submit ? 'danger' : ''}
          onChangeText={nextValue => { setData({ ...data, id: nextValue, submit: true }) }}
          style={styles.input}
        />
      </Layout>
      <Layout style={styles.inputBox}>
        <Text style={{ paddingRight: 10, Height: 40, textAlign: "center", width: 71 }}>Room name</Text>
        <Input
          placeholder='ruquired'
          value={data.name}
          status={!data.name && data.submit ? 'danger' : ''}
          onChangeText={nextValue => { setData({ ...data, name: nextValue, submit: true }) }}
          style={styles.input}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitForm(data.name, data.id), setData({ ...data, submit: true }) }}> Submit</Button>
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
    paddingHorizontal: 10,
    paddingBottom: 15
  },
  input: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    marginTop: 25,
    height: 50,
    minWidth: "90%"
  }
})

export default CreateRoom;
