import React, { useState } from 'react';
import { Text, Button, Toggle } from '@ui-kitten/components';
import { StyleSheet, View, FlatList, Pressable, TouchableHighlight } from 'react-native';
import { useZIM } from '../../hooks/zim';
import { Icon } from 'react-native-eva-icons';
import { useFocusEffect } from '@react-navigation/native';
import Avatar from 'react-native-boring-avatars';

const Item = ({ showData, navigation, item, index, groupID }) => {
  if (index == showData.length - 2) {
    return <AddMember navigation={navigation} groupID={groupID} />
  } else if (index == showData.length - 1) {
    return <KickMember navigation={navigation} groupID={groupID} />
  }

  return (
    <View style={styles.single}>
      <Avatar
        square={true}
        size={42}
        name={`${item.userID + item.userName}`}
        variant='beam'
        colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}
      />
      <Text style={{ fontSize: 12, textAlign: 'center' }}>{item.userName.length > 5 ? `${item.userName.slice(0, 4)}...` : item.userName}</Text>
    </View>
  )
}

const AddMember = ({ navigation, groupID }) => (
  <TouchableHighlight underlayColor={'#fff'} onPress={() => navigation.push('MemberChange', { state: 'Add', groupID })}>
    <View style={styles.button} >
      <Icon name='plus-outline' fill='black' />
    </View>
  </TouchableHighlight>
)

const KickMember = ({ navigation, groupID }) => (
  <TouchableHighlight underlayColor={'#fff'} onPress={() => navigation.push('MemberChange', { state: 'Kick', groupID })}>
    <View style={styles.button} >
      <Icon name='minus-outline' fill='black' />
    </View>
  </TouchableHighlight>
)

const CheckAll = ({ navigation, id }) => (
  <View style={styles.checkAll}>
    <Button onPress={() => navigation.push('Allmembers', { id, type: 2 })} appearance='ghost' status='basic' >
      <Text>check all members {'>'}</Text>
    </Button>
  </View>
)

const GroupInfo = ({ navigation, route }) => {
  const { id } = route.params;
  const [groupInfo, setGroupInfo] = useState({ baseInfo: { groupName: '', groupID: '' }, groupNotice: '' });
  const [memberList, setMemberList] = useState([]);
  const [on, setON] = useState(false);
  const [state, zimAction] = useZIM();

  useFocusEffect(
    React.useCallback(() => {

      zimAction.queryGroupInfo(id).then(res => {
        setGroupInfo(res.groupInfo || {});
        setON(!!(res.groupInfo.notificationStatus - 1));


      });
      zimAction.queryGroupMemberList(id, { count: 17, nextFlag: 0 }).then(res => {
        if (res) {
          setMemberList([...res.userList, 'last1', 'last2'])
        }
      });
    }, [])
  );

  const leaveGroupHandle = () => {
    zimAction.leaveGroup(groupInfo.baseInfo.groupID).then(() => {
      navigation.replace('Home');
    });
  };

  const dismissGroupHandle = () => {
    zimAction.dismissGroup(groupInfo.baseInfo.groupID).then(() => {
      navigation.replace('Home');
    });
  };

  const clearHistoryHandle = () => {
    zimAction.deleteAllMessage(groupInfo.baseInfo.groupID, 2, { isAlsoDeleteServerMessage: true }).then(() => {
      navigation.replace('Home');
    });
  };

  const changeStatus = (sta) => {
    zimAction.setConversationNotificationStatus(sta, groupInfo.baseInfo.groupID, 2).then(() => {
      setGroupInfo({ ...groupInfo, notificationStatus: sta })
    })
  }

  const onCheckedChange = (value) => {
    setON(value);
    changeStatus(value ? 2 : 1);
  };

  return (
    <View style={styles.content}>
      <Pressable >
        <FlatList style={styles.member}
          data={memberList}
          renderItem={(props) => <Item navigation={navigation} showData={memberList} {...props} groupID={groupInfo.baseInfo.groupID} />}
          keyExtractor={item => item.id}
          numColumns={6}
        />
      </Pressable>
      <CheckAll navigation={navigation} id={groupInfo.baseInfo.groupID} />
      <View style={{ backgroundColor: '#fff' }}>

        <Pressable onPress={() => navigation.push('EditGroupName', { ...groupInfo.baseInfo })}  >
          <View style={styles.menuItem}>
            <Text style={{ fontWeight: '600' }}>Group name</Text>
            <View style={styles.rightBox}>
              <Text>{groupInfo?.baseInfo.groupName ? groupInfo.baseInfo.groupName.length > 15 ? `${groupInfo.baseInfo.groupName.slice(0, 14)}...` : groupInfo.baseInfo.groupName : ''}</Text>
              <Icon name='arrow-ios-forward' fill='gray' style={styles.icon} />
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('GroupNotice', { ...groupInfo })}  >
          <View style={styles.menuItem}>
            <Text style={{ fontWeight: '600' }}>Group notice</Text>
            <View style={styles.rightBox}>
              <Text>{groupInfo?.groupNotice ? groupInfo?.groupNotice.length > 15 ? `${groupInfo?.groupNotice.slice(0, 14)}...` : groupInfo?.groupNotice : ''}</Text>
              <Icon name='arrow-ios-forward' fill='gray' style={styles.icon} />
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.menuItem} >
          <Text style={{ fontWeight: '600' }}>Mute notification</Text>
          <Toggle checked={on} onChange={onCheckedChange} >
            {`${on ? 'on' : 'off'}`}
          </Toggle>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => navigation.push('Remark', { groupID: groupInfo.baseInfo.groupID })}  >
          <Text style={{ fontWeight: '600' }}>Remark</Text>
          <Icon name='arrow-ios-forward' fill='gray' style={styles.icon} />
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => navigation.push('ChangeOwner', { ...groupInfo.baseInfo })}   >
          <Text style={{ fontWeight: '600' }}>Change group owner</Text>
          <Icon name='arrow-ios-forward' fill='gray' style={styles.icon} />
        </Pressable>
      </View>


      <View style={{ backgroundColor: '#fff', marginTop: 20 }}>

        <TouchableHighlight style={styles.lastItem} onPress={() => clearHistoryHandle()} underlayColor='##d3d3d3'>
          <Text style={{ fontWeight: '600' }}>Clear chat history</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.lastItem} onPress={() => leaveGroupHandle()} underlayColor='##d3d3d3'>
          <Text style={{ fontWeight: '600' }}>Delete and leave</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.lastItem} onPress={() => dismissGroupHandle()} underlayColor='##d3d3d3'>
          <Text style={{ fontWeight: '600' }}>Ungroup and leave</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#f0f0f0"
  },
  menu: {
    paddingBottom: 20,
  },
  menuItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerItem: {
    height: 50,
    paddingHorizontal: 125,

  },
  member: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    flexWrap: "wrap",
  },
  single: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  avatar: {
    tintColor: null,
    width: 41,
    height: 41,
    borderRadius: 5
  },
  button: {
    height: 45,
    width: 45,
    borderColor: "#f0f0f0",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    margin: 10,
  },
  rightBox: {
    flexDirection: 'row'
  },
  icon: {
    width: 20,
    height: 20,
    paddingLeft: 30
  },
  lastItem: {
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  checkAll: {
    marginBottom: 20,
    backgroundColor: "#fff",
  }


})

export default GroupInfo;
