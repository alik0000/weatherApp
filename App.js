import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location'
import axios from "axios";
import {Weather} from "./components/Weather";

export default function App() {
    const [temperature, setTemp] = useState()
    const API_KEY = 'cdfaa876bc03b9b449de745419ea06a7';
    async function getWeather(lat, lon) {
        return await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(res => {
                console.log('DATA of api weather are: ', res.data.main.temp)
                setTemp(res.data.main.temp)
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
    }, [])
    return (
        <Weather temp={temperature}/>
    )


}
