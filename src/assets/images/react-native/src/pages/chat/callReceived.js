import React, { useEffect } from 'react';
import {
  Text
} from '@ui-kitten/components';
import {
  StyleSheet,
  View,
  Pressable,
  Alert
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useZIM } from '../../hooks/zim';
import Avatar from 'react-native-boring-avatars';
import { call } from 'react-native-reanimated';

const CallReceived = ({ navigation, route }) => {
  const [{ callID }, zimAction] = useZIM();
  const { id, name } = route.params;
  if (!callID) {
    navigation.goBack()
  }
  return (
    <View style={styles.alert}>
      <Avatar
        square={true}
        size={150}
        name={`${name + id}`}
        variant='beam'
        colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}
      />
      <Text style={styles.alertText}>{name}</Text>
      <View style={styles.buttonBox}>
        <Pressable style={styles.rejectButton} onPress={() => zimAction.callReject(callID, { extendedData: 'Reject call' })}>
          <Icon name='phone-off-outline' fill='#fff' style={{ height: 50 }} />
        </Pressable>
        <Pressable style={styles.acceptButton} onPress={() => zimAction.callAccept(callID, { extendedData: 'Accept call' })}>
          <Icon name='phone-call-outline' fill='#fff' style={{ height: 50 }} />
        </Pressable>
      </View>
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
  acceptButton: {
    height: 80,
    width: 80,
    backgroundColor: '#32cd32',
    borderColor: '#32cd32',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
  },
  rejectButton: {
    height: 80,
    width: 80,
    backgroundColor: '#ff6347',
    borderColor: '#ff6347',
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
  },
  buttonBox: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})
export default CallReceived;