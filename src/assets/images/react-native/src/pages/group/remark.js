

import React, { useState, useEffect } from 'react';
import { Layout, Button, Text } from '@ui-kitten/components';
import {
  StyleSheet, View, TextInput
} from 'react-native';
import { useZIM } from '../../hooks/zim';

const Remark = ({ navigation, route }) => {
  const [, zimAction] = useZIM()
  const { groupID } = route.params
  const [attributes, setAttributes] = useState({ remark: '' })
  const [remark, setRemark] = useState('');
  const [submit, setSubmit] = useState(false);
  const submitRemark = () => {

    if (!!remark) {

      zimAction.setGroupAttributes(groupID, { remark }).then((res) => {
        setAttributes({ remark })
        navigation.goBack()
      })
    }
  }

  useEffect(() => {
    zimAction.queryGroupAttributes(groupID).then((res) => {
      setAttributes({ remark: res.groupAttributes.remark });
    });
  })

  const ifSubmit = (remark, submit) => {
    if (!remark && submit) {
      return { borderColor: "red" }
    } else {
      return { borderColor: "#f0f0f0" }
    }
  }
  return (
    <View style={styles.content}>
      <View style={{ alignContent: 'flex-start', paddingLeft: 10, paddingBottom: 20 }}>
        <Text >Group remark</Text>
        <Text>{attributes.remark}</Text>
      </View>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>Remark</Text>
        <TextInput
          placeholder='Place group remark'
          value={remark}
          multiline={true}
          onChangeText={value => { setRemark(value), setSubmit(true) }}
          style={[styles.textarea, ifSubmit(remark, submit)]}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitRemark(groupID, remark), setSubmit(true) }}> Submit</Button>

    </View>
  )
}

const styles = StyleSheet.create({

  content: {
    flex: 1,
    paddingTop: 130,
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

export default Remark;
