/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import Home from './src/component/module/Home';
import Productview from './src/component/module/Productview';
import {Provider} from 'react-redux';
import mainstore from './src/component/module/Redux/Store';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Cart from './src/component/module/Cart';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={mainstore}>
     
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="product" component={Productview} />
          <Stack.Screen name="cart" component={Cart}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
