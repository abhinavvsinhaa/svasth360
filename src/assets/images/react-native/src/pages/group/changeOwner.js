import React, { useState } from 'react';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';
import { useZIM } from '../../hooks/zim';


const ChangeOwner = ({ navigation, route }) => {
  const [, zimAction] = useZIM();
  const [id, setID] = useState('');
  const [submit, setSubmit] = useState(false);
  const { groupID } = route.params;
  const submitID = () => {

    if (!!id) {
      zimAction.transferGroupOwner(groupID, id).then((res) => {
        navigation.goBack();
      })
    }
  }

  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>User ID</Text>
        <Input
          placeholder='Place user ID'
          value={id}
          status={!id && submit ? 'danger' : ''}
          onChangeText={value => { setID(value), setSubmit(true) }}
          style={styles.input}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitID(), setSubmit(true) }}> Submit</Button>

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
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    width: 71
  }
})

export default ChangeOwner;
