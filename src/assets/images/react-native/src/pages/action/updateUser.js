import React from 'react';
import { useReducer } from 'react';
import { Layout, Button, Text, Select, SelectItem } from '@ui-kitten/components';
import { StyleSheet, View, } from 'react-native';
import { useZIM } from '../../hooks/zim';

const renderOption = (title) => (<SelectItem title={title} />);

const UpdateUser = ({ navigation }) => {
  const [, zimAction] = useZIM();

  const submit = ({ name, avatar }) => {
      zimAction.updateUserInfo(name, avatar);
  }
  const data = [
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
    '5.jpeg',
  ];

  const formData = {
    name: '',
    avatar: '',
    isSubmit: false,
    selectAvatarIndexPath: 0,
  }

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'avatar':
        const indexPath = action.indexPath;
        return { ...state, avatar: data[indexPath.row], selectAvatarIndexPath: indexPath };
      // case 'name':
      //   return { ...state, name: action.value, isSubmit: true };
      case 'submit':
        submit(state);
        return { ...state, isSubmit: true };
    }
  }
  const [state, dispatch] = useReducer(userReducer, formData, () => formData);

  return (
    <View style={styles.content}>
      <Layout style={[styles.inputBox, { paddingBottom: 15 }]} >
        <Text style={styles.text}>User avatar</Text>
        <Select
          value={state.avatar}
          placeholder='Default'
          style={styles.select}
          selectedIndex={state.selectAvatarIndexPath}
          onSelect={indexPath => dispatch({ type: 'avatar', indexPath })}>
          {data.map(renderOption)}
        </Select>

      </Layout>
      {/* <Layout style={styles.inputBox}>
        <Text style={styles.text}>User name</Text>
        <Input
          placeholder='ruquired'
          value={state.name}
          status={!state.name && state.isSubmit ? 'danger' : ''}
          onChangeText={value => dispatch({ type: 'name', value })}
          style={styles.input}
        />
      </Layout> */}
      <Button
        style={styles.button}
        onPressIn={() => { dispatch({ type: 'submit' }) }} >
        Submit
      </Button>
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
    Height: 40,
    textAlign: "center",
    width: 71
  },
  select: {
    flex: 1,
    margin: 2,
  },
})

export default UpdateUser;
