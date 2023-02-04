import React from "react";
import { SafeAreaView, Text, StyleSheet, ImageBackground } from "react-native"
import { Chat as ChatP } from "../components/Chat/Chat";
import { ChatHeader } from "../components/Chat/ChatHeader";
import { ChatInput } from "../components/Chat/ChatInput";
import { styleConstants } from "../constants/constant";

export const Chat = () => {
    return(
        <SafeAreaView style={styles.container}>
            <ChatHeader/>
            <ImageBackground source={require('../assets/images/Splash.png')} style={{flex: 1}}>
            <ChatP/>
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