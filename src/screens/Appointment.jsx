import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native"
import { styleConstants } from "../constants/constant";

export const Appointment = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Appointment</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.SAND
    }
})