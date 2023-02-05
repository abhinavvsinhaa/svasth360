import { Icon } from 'react-native-eva-icons';
import { Button, Layout, MenuItem, OverflowMenu } from '@ui-kitten/components';
import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

const Add = () => {

  const jumpArr = [
    // { title: 'Update user info', name: 'UpdateUser' },
    { title: 'Create a 1v1 chat', name: 'CreateC2C' },
    { title: 'Create a group chat', name: 'CreateGroup' },
    { title: 'Join a group', name: 'JoinGroup' },
    { title: 'Create a room', name: 'CreateRoom' },
    { title: 'Join a room', name: 'JoinRoom' },
  ]

  const navigation = useContext(NavigationContext);

  const [visible, setVisible] = useState(false);

  const onItemSelect = ({ row }) => {
    setVisible(false);
    navigation.push(jumpArr[row].name);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)} style={styles.button}>
      <Icon name='plus-outline' fill='black' />
    </Button>
  );

  return (
    <Layout level='1' style={{ marginRight: 10 }}>
      <OverflowMenu
        anchor={renderToggleButton}
        visible={visible}
        onBackdropPress={() => setVisible(false)}
        onSelect={onItemSelect}
      >
        {
          jumpArr.map((item) => (<MenuItem key={item.name} title={item.title} />))
        }
      </OverflowMenu>

    </Layout>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    paddingHorizontal: 0,
    paddingVertical: 0
  },

})
export default Add;
