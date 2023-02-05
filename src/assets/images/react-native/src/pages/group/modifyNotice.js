import React, { useState } from 'react';
import { Layout, Button, Text } from '@ui-kitten/components';
import { StyleSheet, View, TextInput } from 'react-native';
import { useZIM } from '../../hooks/zim';

const ifSubmit = (notice, submit) => {
  if (!notice && submit) {
    return { borderColor: "red" }
  } else {
    return { borderColor: "#f0f0f0" }
  }
};

const GroupNotice = ({ navigation, route }) => {
  const [, zimAction] = useZIM()

  const { baseInfo, groupNotice: oldNotice } = route.params;
  const [notice, setNotice] = useState('');
  const [submit, setSubmit] = useState(false);

  const submitNotice = () => {

    if (!!notice) {
      zimAction.updateGroupNotice(baseInfo.groupID, notice).then(() => {
        navigation.goBack()
      })
    }
  }

  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>Group notice</Text>
        <TextInput
          placeholder={oldNotice}
          value={notice}
          multiline={true}
          onChangeText={value => { setNotice(value), setSubmit(true) }}
          style={[styles.textarea, ifSubmit(notice, submit)]}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitNotice(), setSubmit(true) }}> Submit</Button>

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
  },
  textarea: {
    flex: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: 8,
    minHeight: 80,
    paddingLeft: 15
  }
})

export default GroupNotice;
