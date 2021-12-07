import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import {globalStyle} from "../styles/global";
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";

export const Weather = ({temp, condition}) => {
    return (
        <LinearGradient
            colors={weatherOptions[condition].colors}
            style={globalStyle.container}>
            <View style={styles.wrapper}>
                <Ionicons name={weatherOptions[condition].icon} size={66} color="#f2fcfe"/>
                <Text style={styles.text}>
                    The temperature is: {temp}°{'\n'}
                    The Weather is: {condition}.{'\n'}
                </Text>
            </View>
            <StatusBar barStyle="light-content"/>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const weatherOptions = {
    Rain: {
        icon: 'rainy',
        colors: ['#00F260', '#0575E6']
    },
    Snow: {
        icon: 'snow',
        colors: ['#1c92d2', '#f2fcfe']
    },
    Clear: {
        icon:'weather-sunny',
        colors: ['#EDE574', '#E1F5C4', '#78ffd6']
    },
    Clouds: {
        icon: 'cloud',
        colors: ['#4b4b4b', '#FFFFFF']
    }
}
