import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../src/Components/home/Home';
import DisplayWallper from '../src/Components/DisplayWallper';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              elevation: 1,
            },
            headerTitle: 'Wallpapers',
          }}
        />
        <Stack.Screen
          name="DisplayWallpaper"
          component={DisplayWallper}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
