import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native"
import { styleConstants } from "../constants/constant";

export const Chat = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Chat</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.SAND
    }
})