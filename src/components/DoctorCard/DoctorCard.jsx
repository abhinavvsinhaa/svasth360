import React from "react";
import {View, StyleSheet, Text, Image, Pressable} from "react-native"
import { styleConstants } from "../../constants/constant";

export const DoctorCard = () => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.doctorDetailsOuterContainer}>
                <View style={styles.doctorDetailContainer}>
                    <Image source={require("../../assets/images/DoctorSamplePhoto.png")}/>
                    <View style={{marginLeft: 5}}>
                        <Text style={{color: styleConstants.BLUE}}>NAME</Text>
                        <Text style={{color: styleConstants.BLUE}}>DESIGNATION</Text>
                        <Text style={{color: styleConstants.BLUE}}>HEALTHCARE FACILITY</Text>
                    </View>
                </View>
                <Text>RED</Text>
            </View>
            <View style={styles.actionButtonsContainer}>
                <Pressable>
                    <Image source={require("../../assets/images/VoiceCallCardIconDash.png")}/>
                </Pressable>
                <Pressable>
                    <Image source={require("../../assets/images/ChatCardIconDash.png")}/>
                </Pressable>
                <Pressable>
                    <Image source={require("../../assets/images/ChatCardIconDash.png")}/>
                </Pressable>
                <Pressable>
                    <Image source={require("../../assets/images/ChatCardIconDash.png")}/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10
    },
    doctorDetailsOuterContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    doctorDetailContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    actionButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "center",
        backgroundColor: styleConstants.SAND,   
        width: "50%",
        borderRadius: 10,
        paddingVertical:  5
    }
})