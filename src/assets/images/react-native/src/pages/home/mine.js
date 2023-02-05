import React, { useEffect } from 'react';
import { useZIM } from '../../hooks/zim';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';

const Item = (title, context, func) => {
  return (
    <Pressable style={styles.contain} onPress={() => func()} key={title}>
      <Text style={{ fontWeight: '400', fontSize: 18 }}>{title}</Text>
      <View style={styles.content}>
        <Text style={{ fontSize: 16, color: "#696969" }}>{context}</Text>
        <Icon name='arrow-ios-forward' fill='#dcdcdc' style={styles.icon} />
      </View>
    </Pressable>
  )
}

const Mine = ({ navigation }) => {
  const [state, zimAction] = useZIM();
  const user = state.user || {};
    useEffect(() => {
        zimAction.queryUsersInfo([user.userID]);
    }, []);

  const dataArr = [
    { title: 'Name', context: user?.baseInfo?.userName, func: () => navigation.push('UpdateUser') },
    { title: 'ID', context: user?.baseInfo?.userID, func: () => navigation.push('UpdateUser') },
    { title: 'Extended Data', context: user.extendedData, func: () => navigation.push('UpdateUser') },

  ]
  return (
    <View>
      <Pressable style={[styles.contain, { paddingVertical: 8 }]} onPress={() => navigation.push('UpdateUser')} >
        <Text style={{ fontWeight: '400', fontSize: 18 }}>Avatar</Text>
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={{
              uri: user.userAvatarUrl,
            }} />
          <Icon name='arrow-ios-forward' fill='#dcdcdc' style={styles.icon} />
        </View>
      </Pressable>
      {/* {Item('Name', user.userName, () => navigation.push('UpdateUser'))}
      {Item('ID', user.userID)}
      {Item('Extended Data', user.extendedData)} */}
      {
        dataArr.map((item) => (Item(item.title, item.context, item.func)))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    minHeight: 50,
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    paddingLeft: 30,
    paddingRight: 10
  },
  avatar: {
    height: 60,
    width: 60
  }
})
export default Mine;
