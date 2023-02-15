import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { styleConstants } from "../../constants/constant";
import { CHSearchModal } from "./CHSearchModal";

export const CHSearchDashboard = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={{width: "24%"}}>
            <CHSearchModal visible={visible} setVisible={setVisible} navigation={navigation}/>
            <Pressable style={styles.button} onPress={() =>  setVisible(!visible)}>
                <Text style={styles.text}>CH</Text>
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
    },
    text: {
        textAlign: "center",
        fontFamily: "Poppins-SemiBold"
    }
})