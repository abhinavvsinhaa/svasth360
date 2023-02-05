import React, { useState } from 'react';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';


const CreateC2C = ({ navigation }) => {

  const [data, setData] = useState({ value: '', submit: false })
  const submitID = (id) => {
    if (!!id) {
      navigation.push('Chat', { type: 0, id, name: id });
    }
  }

  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>user ID</Text>
        <Input
          placeholder='Place user ID'
          value={data.value}
          status={!data.value && data.submit ? 'danger' : ''}
          onChangeText={nextValue => { setData({ ...data, value: nextValue, submit: true }) }}
          style={styles.input}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitID(data.value), setData({ ...data, submit: true }) }}> Submit</Button>

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

export default CreateC2C;
