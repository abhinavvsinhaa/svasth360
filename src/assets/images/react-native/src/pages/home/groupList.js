import React, { useEffect } from 'react';
import { useZIM } from '../../hooks/zim';
import { Divider, ListItem } from '@ui-kitten/components';
import {FlatList, Image, StyleSheet, View} from 'react-native';

const GroupList = ({ navigation }) => {
  const [{ groupList }, zimAction] = useZIM();
  console.warn({ groupList });
  useEffect(() => {
    zimAction.getGroupList();
  }, []);

  const GroupAvatar = (props) => {
    return (
      < View style={styles.leftBox} >
          <Image
              style={styles.avatar}
              source={{
                  uri: props.item.baseInfo.groupAvatarUrl,
              }} />
      </View>
    )
  }


  const renderItem = ({ item }) => {
    return (
      (
        <ListItem
          key={item.baseInfo.groupID}
          title={`${item.baseInfo.groupID}-${item.baseInfo.groupName}`}
          accessoryLeft={<GroupAvatar item={item} />}
          style={styles.item}
          onPress={() => navigation.push('Chat', { type: 2, id: item.baseInfo.groupID, name: item.baseInfo.groupName })}

        />
      )
    )
  }
  return (
    <View style={styles.contain}>
      <FlatList
        data={groupList}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  context: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    height: 35,
    width: 35,
    marginTop: 13,
  },
  item: {
    height: 65
  },
  leftBox: {
    position: 'relative'
  },
  point: {
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    right: 0,
    zIndex: 999
  },
  pointNumber: {
    color: "white",
    fontWeight: '700',
    alignSelf: 'center',
  },
  min: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    zIndex: 999
  }
})
export default GroupList;
