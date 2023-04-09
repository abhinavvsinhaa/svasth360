import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { styleConstants } from "../../constants/constant";
import { PHCSearchModal } from "./PHCSearchModal";

export const PHCSearchDashboard = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={{ width: "24%" }}>
            <PHCSearchModal visible={visible} setVisible={setVisible} navigation={navigation}/>
            <Pressable style={styles.button} onPress={() => setVisible(!visible)}>
                <Text style={styles.text}>PHC/CHC</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: styleConstants.ORANGE,
        // marginTop: 10,
        padding: 5,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#fff",
        // width: "24%"
    },
    text: {
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
        color: styleConstants.BLUE
    }
})