import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export const BackgroundImage = () => {
    return (
        <ImageBackground source={require("../../assets/images/Background.png")} resizeMode='cover' style={styles.backgroundImage}/>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center'
    }
})