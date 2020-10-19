/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import storage from '@react-native-firebase/storage';
import {Context} from './Home';
function Thumbnail(props) {
  const nav = useContext(Context);
  const [image, setImage] = useState(null);
  useEffect(() => {
    storage()
      .ref()
      .child('person')
      .child(props.image)
      .getDownloadURL()
      .then((url) => {
        setImage({uri: url});
      })
      .catch(console.log);
  });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        nav.navigate('DisplayWallpaper', {image: image});
      }}
      style={{
        flex: 1,
        margin: 10,
        backgroundColor: 'gray',
      }}>
      <Image
        source={image}
        style={{width: '100%', resizeMode: 'cover', height: '100%'}}
      />
    </TouchableOpacity>
  );
}

export default Thumbnail;
