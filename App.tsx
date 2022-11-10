import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'

import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll'


import Geolocation from '@react-native-community/geolocation';
const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';
const img = require('./assets/images/image.png')
const App = () => {
  const [position, setPosition] = useState<any>({});
  const [data, setData] = useState({});

  useEffect(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(pos => {
      const { coords } = pos;
      const { latitude, longitude } = coords;
      setPosition({ latitude, longitude });
      fetchDataFromApi(latitude, longitude);
    });

  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  //console.log(position.latitude, position.longitude);
  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        setData(data)
      })
    }

  }


  return (
    // <View>
    //   <Text>{data.lat}</Text>
    // </View>
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image} >
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} />
        <WeatherScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});

export default App