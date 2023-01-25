import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { styleConstants } from "../../constants/constant";

export const ZHSearchDashboard = () => {
    return (
        <Pressable style={styles.button}>
            <Text style={styles.text}>ZH</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: styleConstants.ORANGE,
        marginTop: 10,
        padding: 5,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#fff",
        width: "24%"
    },
    text: {
        textAlign: "center",
        fontFamily: "Poppins-SemiBold"
    }
})