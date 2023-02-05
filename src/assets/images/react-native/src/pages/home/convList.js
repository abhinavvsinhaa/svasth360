import React, { useEffect } from 'react';
import { useZIM } from '../../hooks/zim';
import { Divider, Layout, ListItem } from '@ui-kitten/components';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Avatar from 'react-native-boring-avatars';

const timestampToTime = (timestamp) => {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
};

const RightBox = (props) => (
    <Layout style={{ direction: "rtl" }}>
        <Text>{props.text}</Text>
        {props.notify !== 1 && <Icon name='bell-off-outline' fill='#a5a5a5' style={{ width: 15, height: 15 }} />}
    </Layout>
);

const LeftBox = ({ item }) => (
    <View style={styles.leftBox}>
        {item.unreadMessageCount > 0 &&
            (item.notificationStatus == 1 ?
                <View style={styles.point}>
                    <Text style={styles.pointNumber}>{item.unreadMessageCount}</Text>
                </View> :
                <View style={styles.min}></View>)
        }

        <Image
            style={styles.avatar}
            source={{
                uri: item.conversationAvatarUrl,
            }} />
        {/*<Avatar*/}
        {/*    size={42}*/}
        {/*    name={`${item.conversationName + item.conversationID}`}*/}
        {/*    variant='beam'*/}
        {/*    colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}*/}
        {/*/>*/}
    </View>

);

const ConvList = ({ navigation }) => {

    const [state, zimAction] = useZIM();

    useEffect(() => {
        zimAction.queryConversationList();
    }, []);

    const lastMessage = item => {
        return item.lastMessage && item.lastMessage.message
            ? item.lastMessage.message.length > 20
                ? item.lastMessage.message.slice(0, 20) + '...'
                : item.lastMessage.message
            : '';
    };

    const intoChat = (item) => {
        const convInfo = {
            id: item.conversationID,
            type: item.type,
            name: item.conversationName,
        };
        zimAction.clearConversationUnreadMessageCount(convInfo.id, convInfo.type).then(() => {
            navigation.push('Chat', { ...convInfo });
        });
    }

    const renderItem = ({ item, index }) => (
        <ListItem
            onPress={() => intoChat(item)}
            title={`${item.conversationName || item.conversationID}`}
            description={lastMessage(item)}
            accessoryLeft={<LeftBox item={item} />}
            accessoryRight={<RightBox notify={item.notificationStatus} text={item.lastMessage && timestampToTime(item.lastMessage.timestamp) || ''} />}
        />
    );
    console.log('convs', state.convs);
    return (
        <View style={styles.context}>
            <FlatList
                data={state.convs}
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
    leftBox: {
        position: 'relative'
    },
    rightBox: {
        flexDirection: 'column'
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
    },
    avatar: {
        height: 60,
        width: 60
    }
})

export default ConvList;
