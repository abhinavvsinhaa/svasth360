import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native"
import { styleConstants } from "../constants/constant";

export const Notifications = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Notifications</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.SAND
    }
})