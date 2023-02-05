import React, { useState, useEffect } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, View, FlatList } from 'react-native';
import { useZIM } from '../../hooks/zim';
import Avatar from 'react-native-boring-avatars';

const Allmembers = ({ route }) => {
  const { id, type } = route.params;
  const [, zimAction] = useZIM();
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    if (type === 2) {
      zimAction.queryGroupMemberList(id, { count: 200, nextFlag: 0 }).then(res => {
        setMemberList(res.userList || []);
      })
    } else {
      zimAction.queryRoomMember(id).then(res => {

        setMemberList(res.memberList || []);
      })
    }

  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.single}>
        <Avatar
          square={true}
          size={42}
          name={`${item.userID + item.userName}`}
          variant='beam'
          colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}
        />
        <Text style={styles.userName}>{item.userName}</Text>
      </View>
    )
  }
  return (
    <View style={styles.content}>
      <FlatList
        data={memberList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  single: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center'
  },
  avatar: {
    tintColor: null,
    width: 41,
    height: 41,
    borderRadius: 5
  },
  userName: {
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 10
  }
})
export default Allmembers;
