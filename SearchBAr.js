import React from 'react';
import { Image } from 'react-native';
import {Text, View} from 'react-native';
import blacksearch from '../module/assets/blacksearch.png';

export function SearchBAr(props) {
  return (
    <View style={{flexDirection:"column"}}>
      <View style={{backgroundColor:"white",borderRadius:10,padding:5,paddingLeft:20,margin:10}}>
      
                        <Text ><Image
                          source={blacksearch}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                        /> {props.name}</Text>
                        </View>
      
    </View>
  );
}
