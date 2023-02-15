import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { styleConstants } from "../../constants/constant";
import { ZHSearchModal } from "./ZHSearchModal";

export const ZHSearchDashboard = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={{ width: "24%" }}>
            <ZHSearchModal visible={visible} setVisible={setVisible} navigation={navigation}/>
            <Pressable style={styles.button} onPress={() => setVisible(!visible)}>
                <Text style={styles.text}>ZH</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: styleConstants.ORANGE,
        padding: 5,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#fff",
        // width: "24%"
    },
    text: {
        textAlign: "center",
        fontFamily: "Poppins-SemiBold"
    }
})