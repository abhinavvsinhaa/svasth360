import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, ImageBackground } from "react-native"
import { Chat as ChatP } from "../components/Chat/Chat";
import { ChatHeader } from "../components/Chat/ChatHeader";
import { ChatInput } from "../components/Chat/ChatInput";
import { styleConstants } from "../constants/constant";

export const Chat = ({ navigation, route }) => {
    useEffect(() => {
        console.log(route.params)
    }, [])
    return(
        <SafeAreaView style={styles.container}>
            <ChatHeader/>
            <ImageBackground source={require('../assets/images/Splash.png')} style={{flex: 1}}>
            <ChatP userId={route.params.userId}/>
            <ChatInput/>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})