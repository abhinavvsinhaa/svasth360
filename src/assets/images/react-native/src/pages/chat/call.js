import React, { useEffect } from 'react';
import {
  Text
} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useZIM } from '../../hooks/zim';
import Avatar from 'react-native-boring-avatars';

const Call = ({ navigation, route }) => {
  const [{ callID }, zimAction] = useZIM();
  const { id, inviter } = route.params;

  return (
    <View style={styles.alert}>
      <Avatar
        square={true}
        size={150}
        name={`${inviter}`}
        variant='beam'
        colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}
      />
      <Text style={styles.alertText}>{name}</Text>
      <Pressable style={styles.alertButton} onPress={() => { zimAction.callCancel([id], callID, {}).then(() => navigation.goBack(), zimAction.callClear()) }}>
        <Icon name='phone-missed-outline' fill='#fff' style={{ height: 50 }} />
      </Pressable>
    </View>

  )
}

const styles = StyleSheet.create({
  alert: {
    zIndex: 0,
    height: '100%',
    backgroundColor: '#f0f0f0',
    paddingTop: 180,
    alignItems: 'center'
  },
  alertText: {
    paddingTop: 10,
    fontWeight: '500',
    fontSize: 18
  },
  alertButton: {
    height: 80,
    width: 80,
    backgroundColor: '#ff6347',
    borderColor: '#ff6347',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: 150
  }
})
export default Call;