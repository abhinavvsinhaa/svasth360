import React, { useState } from 'react';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useZIM } from '../../hooks/zim';


const EditGroupName = ({ navigation, route }) => {
  const { groupID } = route.params;
  const [, zimAction] = useZIM();
  const [name, setValue] = useState('');
  const [submit, setSubmit] = useState(false);
  const submitName = () => {
    if (!!name) {
      zimAction.updateGroupName(groupID, name).then(() => {
        navigation.goBack()
      })
    }
  }

  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>Group name</Text>
        <Input
          placeholder='Place group name'
          value={name}
          status={!name && submit ? 'danger' : ''}
          onChangeText={Value => { setValue(Value), setSubmit(true) }}
          style={styles.input}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitName(), setSubmit(true) }}> Submit</Button>

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
    textAlign: "center",
    width: 71
  }
})

export default EditGroupName;
