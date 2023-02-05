import { Icon } from 'react-native-eva-icons';
import { Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContext } from '@react-navigation/native';


const More = () => {
  const navigation = React.useContext(NavigationContext);
  return (
    <Button onPress={() => navigation.navigate('GroupInfo')} style={styles.button} >
      <Icon name='list-outline' fill='black' style={styles.icon} />
    </Button>
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
export default More;
