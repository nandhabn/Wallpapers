/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {ManageWallpaper, TYPE} from 'react-native-manage-wallpaper';
import ImageEditor from '@react-native-community/image-editor';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

function DisplayWallper(props: any) {
  const {navigation, route} = props;
  const {image} = route.params;
  const {uri} = Image.resolveAssetSource(image);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [zoomheight, setZoomHeight] = useState(Dimensions.get('window').height);
  const [zoomWidth, setZoomWidth] = useState(Dimensions.get('window').width);
  const [modelvisible, showModel] = useState(false);
  useEffect(() => {
    if (!height || !width) {
      Image.getSize(uri, (h, w) => {
        setHeight(h > zoomheight ? h : zoomheight);
        setWidth(w > zoomWidth ? w : zoomWidth);
      });
    }
  });

  function setWallpaper(type = TYPE.BOTH) {
    ImageEditor.cropImage(uri, {
      offset: {x, y},
      size: {width: zoomWidth, height: zoomheight},
    }).then((newUri) => {
      ManageWallpaper.setWallpaper({uri: newUri}, console.log, type);
    });
  }
  return (
    <View style={{flex: 1}}>
      <PinchGestureComponent uri={uri} />
      {modelvisible ? (
        <>
          <View
            style={{
              position: 'absolute',
              zIndex: 10,
              bottom: '35%',
              height: '30%',
              width: '90%',
              left: '5%',
              right: '5%',
              backgroundColor: '#0008',
              flexDirection: 'column',
            }}>
            <Button onPress={() => setWallpaper(TYPE.HOME)} name={'Home'} />
            <Button onPress={() => setWallpaper(TYPE.LOCK)} name={'Lock'} />
            <Button onPress={() => setWallpaper()} name={'Both'} />
          </View>
          <TouchableWithoutFeedback onPress={() => showModel(!modelvisible)}>
            <View style={{flex: 1, position: 'absolute', zIndex: 9}} />
          </TouchableWithoutFeedback>
        </>
      ) : (
        <></>
      )}

      <View
        style={{
          position: 'absolute',
          height: '25%',
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#0008',
          flexDirection: 'row',
          borderRadius: 20,
          borderBottomStartRadius: 0,
          borderBottomEndRadius: 0,
          elevation: 1,
        }}>
        <BottomModel
          navigation={navigation}
          model={{modelvisible, showModel}}
        />
      </View>
    </View>
  );
}

export default DisplayWallper;

function Button({onPress, name}) {
  return (
    <View style={{flex: 1, borderBottomColor: 'black', borderBottomWidth: 1}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Text style={{color: 'white'}}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

function BottomModel({navigation, model}) {
  const {modelvisible, showModel} = model;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          backgroundColor: '#f0f2ac',
          paddingVertical: 8,
          paddingHorizontal: 16,
          elevation: 10,
          borderRadius: 2,
        }}>
        <Text style={{fontSize: 20, color: '#5357a6'}}>cancle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showModel(!modelvisible);
        }}
        style={{
          backgroundColor: 'blue',
          paddingVertical: 8,
          paddingHorizontal: 16,
          elevation: 10,
          borderRadius: 2,
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>Set as</Text>
      </TouchableOpacity>
    </>
  );
}

function PinchGestureComponent({uri}) {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [translateX,setTranslateX] = useState(0)
  const [translateY,setTranslateY] = useState(0)
  function gesturehandler(e) {
    const {focalX, focalY, bvelocity} = e.nativeEvent;
    // setX(Number(x + x * velocity*100));
    // setY(Number(y + y * velocity*100));
    let tempX = 
    setTranslateX((2*+720)/2)
    setTranslateX((2*+720)/2)
    // console.log(State.END)
  }
  console.log(x, y);
  return (
    <PinchGestureHandler onHandlerStateChange={gesturehandler}>
      <Image
        source={{uri}}
        style={{
          height: '100%',
          width: '100%',
          resizeMode: 'cover',
          transform: [{translateX}, {translateY}],
        }}
      />
    </PinchGestureHandler>
  );
}
