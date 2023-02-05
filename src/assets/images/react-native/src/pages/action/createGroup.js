import React, { useReducer } from 'react';
import {
    Layout, Button, Input, Text, Select, SelectItem
} from '@ui-kitten/components';
import {
  StyleSheet, View, TextInput
} from 'react-native';
import { useZIM } from '../../hooks/zim';

const data = [
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
    '5.jpeg',
];

const renderOption = (title) => (<SelectItem title={title} />);

const userReducer = (state, action) => {
  switch (action.type) {
    case 'inputID':
      return { ...state, groupID: action.value, isSubmit: true };
    case 'inputName':
      return { ...state, groupName: action.value, isSubmit: true };
    case 'avatar':
      const indexPath = action.indexPath;
      return { ...state, avatar: data[indexPath.row], selectAvatarIndexPath: indexPath };
    case 'member':
      let memberArr = action.value
      return { ...state, memberID: memberArr, isSubmit: true };
    case 'submit':
      action.cb && action.cb();
      return { ...state, isSubmit: true };
  }
}

const CreateGroup = ({ navigation }) => {
  const [, zimAction] = useZIM();

  const submitForm = ({ groupID, groupName, memberID, avatar }) => {
    if (!!groupID && !!groupName) {
      memberID = memberID.split(',');
      zimAction.createGroup({ groupID, groupName, groupAvatarUrl: avatar }, memberID).then((res) => {
        navigation.push('Chat', { type: 2, id: groupID, name: groupName });
      });
    }
  };

  const ifSubmit = () => {
    if (!state.name && state.isSubmit) {
      return { borderColor: "red" }
    } else {
      return { borderColor: "#f0f0f0" }
    }
  }

  const inputState = {
    groupID: '',
    groupName: '',
    memberID: '',
    avatar: '',
    isSubmit: false,
    selectAvatarIndexPath: 0,
  }

  const [state, dispatch] = useReducer(userReducer, inputState, () => inputState);

  return (
    <View style={styles.content}>
      <Layout style={styles.inputBox}>
        <Text style={[styles.text, { lineHeight: 40 }]}>Group ID</Text>
        <Input
          placeholder='ruquired'
          value={state.groupID}
          status={!state.groupID && state.isSubmit ? 'danger' : ''}
          onChangeText={value => dispatch({ type: 'inputID', value })}
          style={styles.input}
        />
      </Layout>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>Group name</Text>
        <Input
          placeholder='ruquired'
          value={state.groupName}
          status={!state.groupName && state.isSubmit ? 'danger' : ''}
          onChangeText={value => dispatch({ type: 'inputName', value })}
          style={styles.input}
        />
      </Layout>
        <Layout style={styles.inputBox}>
            <Text style={styles.text}>Group avatar</Text>
            <Select
                value={state.avatar}
                placeholder='Default'
                style={styles.select}
                selectedIndex={state.selectAvatarIndexPath}
                onSelect={indexPath => dispatch({ type: 'avatar', indexPath })}>
                {data.map(renderOption)}
            </Select>
        </Layout>
      <Layout style={styles.inputBox}>
        <Text style={styles.text}>Group member</Text>
        <TextInput
          placeholder='  Separated by ",";like:useID1,useID2'
          value={state.memberID}
          multiline={true}
          onChangeText={(value) => dispatch({ type: 'member', value })}
          style={[styles.textarea, ifSubmit(state.name, state.isSubmit)]}
        />
      </Layout>

      <Button style={styles.button} onPressIn={() => dispatch({ type: 'submit', cb: () => submitForm(state) })}>Submit</Button>
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
  },
  text: {
    paddingRight: 10,
    height: 40,
    textAlign: "center",
    width: 71
  },
    select: {
        flex: 1,
        margin: 2,
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

export default CreateGroup;
