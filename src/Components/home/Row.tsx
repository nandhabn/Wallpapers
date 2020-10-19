/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Thumbnail from './Thumbnail';
function Row(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 300,
        width: props.image.length === 2 ? '100%' : '50%',
      }}>
      <Thumbnail image={props.image[0]} />
      {props.image.length === 2 ? <Thumbnail image={props.image[1]} /> : null}
    </View>
  );
}
export default Row;
