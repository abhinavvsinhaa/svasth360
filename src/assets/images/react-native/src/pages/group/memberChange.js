import React, { useState, useLayoutEffect } from 'react';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import {
  StyleSheet, View,
} from 'react-native';
import { useZIM } from '../../hooks/zim';


const MemberChange = ({ navigation, route }) => {
  const { groupID, state } = route.params
  const [, zimAction] = useZIM();
  const [userID, setuserID] = useState('');
  const [submit, setSubmit] = useState(false);

  const submitName = (groupID, userID) => {
    const userIDs = userID.split(',')
    if (!!userID && state === 'Add') {
      zimAction.inviteUsersIntoGroup(userIDs, groupID).then((res) => {
        navigation.pop();
      })
    } else if (!!userID && state === 'Kick') {
      zimAction.kickGroupMembers(userIDs, groupID).then((res) => {
        navigation.pop();
      })
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${state} member`,
      headerTintColor: 'black',

    });
  }, []);
  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>User ID</Text>
        <Input
          placeholder='Place user ID'
          value={userID}
          status={!userID && submit ? 'danger' : ''}
          onChangeText={Value => { setuserID(Value), setSubmit(true) }}
          style={styles.input}
        />
      </Layout>
      <Button style={styles.button} onPress={() => { submitName(groupID, userID), setSubmit(true) }}> Submit</Button>

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

export default MemberChange;
