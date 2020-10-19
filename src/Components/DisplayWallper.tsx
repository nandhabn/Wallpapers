/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {State, PinchGestureHandler} from 'react-native-gesture-handler';
import {ManageWallpaper, TYPE} from 'react-native-manage-wallpaper';
import ImageEditor from '@react-native-community/image-editor';
import Animated, {
  Value,
  event,
  add,
  cond,
  eq,
  call,
  or,
  set,
  block,
  useCode,
  multiply,
} from 'react-native-reanimated';
import {vec} from 'react-native-redash';

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
  const [loading, setLoading] = useState(true);
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
        <TouchableWithoutFeedback onPress={() => showModel(!modelvisible)}>
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
        </TouchableWithoutFeedback>
      ) : (
        <></>
      )}

      <View
        style={{
          position: 'absolute',
          height: '25%',
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#0008',
          flexDirection: 'row',
          borderRadius: 20,
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
  const state = new Value(State.UNDETERMINED);
  const focal = vec.createValue(0, 0);
  const origin = vec.createValue(0, 0);
  const baseScale = new Animated.Value(1);
  const pinchScale = new Animated.Value(1);
  const scale = Animated.multiply(baseScale, pinchScale);
  let lastScale = 1;
  const onGestureEvent = event([
    {nativeEvent: {focalX: focal.x, focalY: focal.y, scale}},
    // {useNativeDriver: true},
  ]);
  const onHandlerStateChange = ({nativeEvent}) =>
    block([
      state.setValue(nativeEvent.state),
      cond(
        or(
          eq(state, State.CANCELLED),
          eq(state, State.END),
          eq(state, State.FAILED),
        ),
        block([
          (lastScale *= nativeEvent.scale),
          baseScale.setValue(lastScale),
        ]),
      ),
      console.log(lastscale),
    ]);
  return (
    <>
      <PinchGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{flex: 1, backgroundColor: 'black'}}>
          <Animated.Image
            source={{uri}}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              transform: [{scale}],
            }}
          />
        </Animated.View>
      </PinchGestureHandler>
    </>
  );
}
