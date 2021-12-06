import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {globalStyle} from "../styles/global";

export const Weather = ({temp}) => {

    return (
        <View style={globalStyle.container}>
            <Text style={styles.text}>
                The temp of the Tomsk is: {temp}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        color: 'black',
    }
})
