/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Row from './Row';

export const Context = createContext(null);
function Home(props) {
  const [wallpapers, setWallpapers] = useState([]);
  useEffect(() => {
    var list = ['avatar-male.png', 'wall1.jpg'];
    setWallpapers(list);
  }, []);
  console.log('working2');

  return (
    <ScrollView style={{backgroundColor: 'black', flex: 1}}>
      <Context.Provider value={props.navigation}>
        {renderRows(wallpapers)}
      </Context.Provider>
    </ScrollView>
  );
}
function renderRows(wallpapers) {
  const spilitted = [],
    l = wallpapers.length;
  for (var i = 0; i < l; i += 2) {
    if (i + 1 < l) {
      spilitted.push([wallpapers[i], wallpapers[i + 1]]);
    } else {
      spilitted.push([wallpapers[i]]);
    }
  }
  return (
    <>
      {spilitted.map((val, index) => (
        <Row image={val} key={index} />
      ))}
    </>
  );
}

export default Home;
