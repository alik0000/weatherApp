import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Image, Text} from 'react-native';
import * as Location from 'expo-location'
import axios from "axios";
import {Weather} from "./components/Weather";


export default function App() {
    const [temperature, setTemp] = useState()
    const [condition, setCondition] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const API_KEY = 'cdfaa876bc03b9b449de745419ea06a7';
    async function getWeather(lat, lon) {
        return await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(res => {
                setTemp(res.data.main.temp)
                setCondition(res.data.weather[0].main)
            })
    }
    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                console.log('success', status)
                const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
                console.log('Location is latitude: ', latitude)
                console.log('Location is longitude: ', longitude)
                await getWeather(latitude, longitude)
            } catch (err) {
                Alert.alert('Error', 'Some Error!')
            }
        })();

        setInterval(()=> {
            let today = new Date()
            const month = today.getMonth()
            const day = today.getDay()
            const date = today.getDate()
            const hour = today.getHours()
            const minutes = today.getMinutes()
            const hoursFormat = hour >= 13 ? hour % 12: hour
            const meridiem = hour >= 12 ? 'pm' : 'am'
            setTime((hoursFormat < 10? '0'+hoursFormat : hoursFormat) + ':' + (minutes < 10? '0'+minutes: minutes) + meridiem)
            setDate(days[day] + ', ' + date+ ' ' + months[month])
        }, 1000)


    }, [])
    const url = () => {
        const hours = new Date().getHours()
        return (
            hours >= 5 && hours <= 11? require(`./assets/morning.jpg`) :
                hours >= 12 && hours <= 16? require(`./assets/afternoon.jpg`) :
                    hours >= 17 && hours <= 23? require(`./assets/evening.jpg`) :
                        hours >= 24 && hours <= 4? require(`./assets/night.jpg`) : ''
        )
    }
    return (
        <View style={styles.container}>
            <Image source={url()} style={styles.ImgStyle}/>
            <View style={styles.Date}>
                <View>
                    <Text style={styles.timeStyle}>{time}</Text>
                </View>
                <View>
                    <Text style={styles.dateStyle}>{date}</Text>
                </View>
            </View>
            <Weather temp={temperature} condition={condition}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImgStyle: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
    },
    Date: {
        position: "absolute",
        fontSize: 30,
        top: 100,
        textAlign: "center",
    },
    timeStyle: {
        fontSize: 40,
        fontWeight: '500',
        textAlign: "center",
        color: 'white',
    },
    dateStyle: {
        fontSize: 25,
        color: '#eee',
        fontWeight: '300'
    }
});
