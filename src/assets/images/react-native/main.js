import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <TouchableOpacity>
                    {/* <Icon name='left' size={26} style={{ color: '#f00' }} ></Icon> */}
                    <Text>《</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerInner}>
                <Text>userID-username</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 30 }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.btn}>
                <TouchableOpacity>
                    <Text style={{ color: '#999999' }}>Conversation</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity>
                    <Text style={{ color: '#999999' }}>Group List</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Body = () => {
    return (
        <View style={styles.body}>
            <SingleMessage></SingleMessage>
            <GroupMessage></GroupMessage>
            <GroupListItem></GroupListItem>
        </View>
    );
};
const SingleMessage = () => {
    return (
        <View style={styles.singleMessage}>
            <Image style={styles.img} source={require('./static/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png')}></Image>
            <View style={styles.messageBox}>
                <View>
                    <Text style={styles.groupname}>[1v1]-name</Text>
                    <Text style={styles.newMessage}>message</Text>
                </View>
                <View>
                    <Text>2022-06-21 11:-5:23</Text>
                </View>
            </View>
        </View>
    );
};

const GroupMessage = () => {
    return (
        <View style={styles.singleMessage}>
            <Image style={styles.img} source={require('./static/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png')}></Image>
            <View style={styles.messageBox}>
                <View>
                    <Text style={styles.groupname}>[group]-name</Text>
                    <Text style={styles.newMessage}>message</Text>
                </View>
                <View>
                    <Text style={{ direction: 'rtl' }}>2022-06-21 11:-5:23</Text>
                    <Text style={styles.eye}>eye</Text>
                </View>
            </View>
        </View>
    );
};

const GroupListItem = () => {
    return (
        <View style={styles.groupListItem}>
            <Image style={styles.listImg} source={require('./static/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png')}></Image>
            <View style={{ paddingRight: 8, flex: 1, justifyContent: 'center' }}>
                <Text style={styles.itemText}>groupName-name</Text>
            </View>
        </View>
    );
};

const Main = () => {
    return (
        <View style={styles.contain}>
            <Header></Header>
            <Body></Body>
            <Footer></Footer>
        </View>
    );
};
const styles = StyleSheet.create({
    contain: {
        paddingTop: 40,
        backgroundColor: '#f5f5f5',
        height: '100%',
    },
    header: {
        height: 44,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowColor: 'gray',
    },
    headerLeft: {
        paddingLeft: 10,
    },
    headerInner: {
        flex: 4,
        alignItems: 'center',
    },
    headerRight: {
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    footer: {
        flexDirection: 'row',
        height: 50,
        borderTopColor: 'gray',
        borderTopWidth: 1,
    },
    btn: {
        width: '50%',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
    },
    singleMessage: {
        height: 71,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    img: {
        width: 43,
        height: 45,
    },
    messageBox: {
        paddingLeft: 10,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    groupname: {
        fontSize: 16,
        flex: 1,
    },
    newMessage: {
        fontSize: 12,
        color: '#999999',
        alignItems: 'center',
        flex: 1,
        paddingTop: 3,
    },
    eye: {
        width: '100%',
        textAlign: 'right',
    },
    groupListItem: {
        height: 64,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    listImg: {
        height: 40,
        width: 40,
        marginRight: 19,
    },
    itemText: {
        fontSize: 16,
    },
});

export default Main;
