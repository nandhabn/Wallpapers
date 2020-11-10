/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Mainstack from './navigations/MainStack';

const App = () => {
  const [splash, setSplash] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  useEffect(() => {
    setTimeout(() => setSplash(false), 5000);
    setFirstTime(true);
  }, []);

  function finishIntro() {
    setFirstTime(false);
  }
  return ( <View>
    <Mainstack />
    {/* <Text>hello</Text> */}
  </View>);

  if (splash) {
    console.log(splash);
    return <View />;
  }
  return firstTime ? (
    <View
      style={{
        backgroundColor: '#1D2022',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 60,
          color: 'white',
          textAlign: 'center',
          fontFamily: 'JustMeAgainDownHere-Regular',
        }}>
        Wallpapers
      </Text>
      <Image
        source={require('./src/assets/images/getStarted.jpg')}
        style={{height: 400, width: 400, resizeMode: 'center'}}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#35383A',
          width: 285,
          height: 71,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={finishIntro}>
        <Text
          style={{
            fontFamily: 'Raleway',
            fontWeight: '900',
            color: 'white',
            fontSize: 30,
          }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <Mainstack />
    </View>
  );
};

export default App;
