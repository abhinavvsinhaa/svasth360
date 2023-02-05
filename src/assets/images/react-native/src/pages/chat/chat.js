import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Layout, Button, Input, Text } from '@ui-kitten/components';
import { StyleSheet, View, FlatList } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useZIM } from '../../hooks/zim';
import Avatar from 'react-native-boring-avatars';
import { launchImageLibrary } from 'react-native-image-picker';

const msgStyles = (isMe) =>
    isMe
        ? {
              messageDirection: { flexDirection: 'row-reverse' },
              bgc: { backgroundColor: '#D9FEDA' },
              idDirection: { textAlign: 'right' },
          }
        : {
              messageDirection: { flexDirection: 'row' },
              bgc: { backgroundColor: '#fff' },
              idDirection: { textAlign: 'left' },
          };

const MessageItem = ({ avatarMap, item }) => {
    const currAvatar = avatarMap[item.senderUserID];
    const transMsg = (item) => {
        const msg = item.message || item.fileName;
        return <Text style={styles.messageText}>{msg}</Text>;
    };
    return (
        <View style={[styles.message, msgStyles(item.direction == 0).messageDirection]}>
            {currAvatar ? (
                <Avatar source={avatarMap[item.senderUserID]} style={styles.avatar} />
            ) : (
                <Avatar
                    size={36}
                    name={`${item.senderUserID}`}
                    variant="beam"
                    colors={['#E3D88C', '#7BAEF3', '#C08FEF', '#EF9F9F', '#73CAAE']}
                />
            )}
            <View style={styles.messageBox}>
                <View style={styles.idBox}>
                    <Text style={[styles.id, msgStyles(item.direction == 0).idDirection]}>{item.senderUserID}</Text>
                </View>
                <View style={[styles.messageTextBox, msgStyles(item.direction == 0).bgc]}>{transMsg(item)}</View>
            </View>
        </View>
    );
};

const Chat = ({ navigation, route }) => {
    const { id, type, name } = route.params;
    const [isOpenBar, setIsOpenBar] = useState(false);
    const [isByte, setIsByte] = useState(false);
    const [inputText, setInputText] = useState('');
    // const [count, setCount] = useState(0);
    const flatList = React.useRef(null);

    const [{ avatarMap, chatMap }, zimAction] = useZIM();

    const featureBar = [
        { name: 'image-outline', func: () => sendMediaMessage(11) },
        { name: 'video-outline', func: () => sendMediaMessage(14) },
        {
            name: 'phone-call-outline',
            func: () => {
                navigation.push('Call', { id, type, name }),
                    zimAction.callInvite([id], { timeout: 30, extendedData: 'This is voice call' });
            },
        },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            title: type == 2 ? `${name}[${id}]` : `${name}[${id}]`,
            headerTintColor: 'black',
            headerLeft: () => (
                <Button onPress={() => navigation.navigate('Home')} style={styles.more}>
                    <Icon name="arrow-ios-back-outline" fill="black" />
                </Button>
            ),
            headerRight: () => {
                if (type == 0) {
                    return;
                } else {
                    return (
                        <Button
                            onPress={() => navigation.push(type == 2 ? 'GroupInfo' : 'Allmembers', { ...route.params })}
                            style={styles.more}
                        >
                            <Icon name="more-horizontal-outline" fill="black" />
                        </Button>
                    );
                }
            },
        });
    }, []);

    useEffect(() => {
        zimAction.setScrollView(flatList);
        zimAction.queryHistoryMessage(id, type, { count: 1000, reverse: true }).then((res) => {
            setTimeout(() => {
                flatList.current.scrollToEnd();
            }, 300);
        });

        return () => {
            zimAction.clearConversationUnreadMessageCount(id, type);
        };
    }, []);

    const msgs = chatMap[id] || [];

    const sendMessage = (msg) => {
        setInputText('');
        zimAction.sendChatMessage(type, msg, id, isByte).then(() => {
            setTimeout(() => {
                flatList.current.scrollToEnd();
            }, 200);
        });
    };

    const sendMediaMessage = (msgType) => {
        setIsByte(!isByte);

        const mediaType = msgType == 11 ? 'photo' : 'video';
        launchImageLibrary({ mediaType })
            .then((res) => {
                const path = res.assets[0].uri.replace('file://', '');
                console.log('launchImageLibrary', res.assets[0], path);

                const msg = { type: msgType, fileLocalPath: path };
                if (msgType == 14) msg.videoDuration = 100;
                zimAction.sendMediaMessage(msg, id, type).then(() => {
                    setTimeout(() => {
                        flatList.current.scrollToEnd();
                    }, 200);
                });
            })
            .catch((err) => console.error('launchImageLibrary:error', err));
    };

    return (
        <View style={styles.contain}>
            <FlatList
                ref={flatList}
                data={msgs}
                renderItem={(props) => (
                    <MessageItem
                        key={props.item.messageID != '0' ? props.item.messageID : props.item.localMessageID}
                        avatarMap={avatarMap}
                        {...props}
                    />
                )}
                keyExtractor={(item) => (item.messageID != '0' ? item.messageID : item.localMessageID)}
            ></FlatList>

            <View style={styles.footer}>
                <Button
                    status="control"
                    accessoryLeft={<Icon style={styles.plus} name="plus-circle-outline" fill="black" />}
                    onPress={() => setIsOpenBar(!isOpenBar)}
                />
                <View style={styles.input}>
                    <Input value={inputText} onChangeText={(nextValue) => setInputText(nextValue)} />
                </View>
                <Button onPress={() => sendMessage(inputText)} style={styles.sendButton} appearance="ghost">
                    Send{' '}
                </Button>
            </View>

            {isOpenBar && (
                <Layout style={styles.chooseMore} level="1">
                    <Button
                        onPress={() => setIsByte(!isByte)}
                        style={styles.chooseButton}
                        status="control"
                        accessoryLeft={
                            <Icon style={styles.plus} name={!isByte ? 'behance-outline' : 'behance'} fill="black" />
                        }
                    />
                    {featureBar.map((item, index) => (
                        <Button
                            onPress={item.func}
                            style={styles.chooseButton}
                            status="control"
                            accessoryLeft={<Icon style={styles.plus} name={item.name} fill="black" />}
                            key={index}
                        />
                    ))}
                </Layout>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        zIndex: 600,
    },
    converse: {
        flex: 1,
    },
    footer: {
        backgroundColor: 'white',
        height: 58,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
    },
    plus: {
        height: 25,
        width: 25,

        backgroundColor: 'white',
        borderColor: 'white',
    },
    input: {
        flex: 1,
    },
    inputButton: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 0,
        borderColor: 'white',
    },
    sendButton: {
        paddingLeft: 0,
        paddingVertical: 4,
    },
    inputIcon: {
        height: 30,
        width: 30,
    },
    chooseMore: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-around',
        height: 80,
        alignItems: 'center',
    },
    chooseButton: {
        height: 50,
        width: 50,
    },
    message: {
        paddingHorizontal: 15,
        paddingVertical: 4,
    },
    avatar: {
        height: 35,
        width: 35,
        marginTop: 13,
    },
    messageBox: {
        paddingHorizontal: 10,
    },
    id: {
        fontSize: 14,
        paddingBottom: 3,
    },
    idBox: {
        justifyContent: 'flex-end',
    },
    messageTextBox: {
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 8,
    },
    messageText: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        maxWidth: 300,
    },
    more: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
});

export default Chat;
