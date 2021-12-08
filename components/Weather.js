import React from "react";
import { StyleSheet, Text, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";

export const Weather = ({temp, condition}) => {
    return (
        <LinearGradient colors={weatherOptions[condition].colors} style={styles.content}>
            <Ionicons name={weatherOptions[condition].icon} size={40} color="#f2fcfe"/>
            <Text style={styles.text}>
                The temperature is: {temp}°{'\n'}
                The Weather is: {condition}.{'\n'}
            </Text>
            <StatusBar barStyle="light-content"/>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        paddingTop: 10,
    },
    content: {
        position: "absolute",
        width: 300,
        height: 150,
        top: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowRadius: 60.00,
        elevation: 24,
    },
})
const weatherOptions = {
    Rain: {
        icon: 'rainy',
        colors: ['#00F26089', '#0575E689'],
    },
    Snow: {
        icon: 'snow',
        colors: ['#1C92D291', '#F2FCFEA0'],
    },
    Clear: {
        icon:'sunny',
        colors: ['#EDE57487', '#E1F5C491', '#78FFD693'],
    },
    Clouds: {
        icon: 'cloud',
        colors: ['#4B4B4B99', '#FFFFFFA3'],
    },
}
