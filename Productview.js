import React, { useEffect, useState } from 'react'
import { Text } from 'react-native';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageBackground, View } from 'react-native'
import back from '../module/assets/back.png';
import blackcart from '../module/assets/blackcart.png';

import blacksearch from '../module/assets/blacksearch.png';
import fav2 from '../module/assets/fav2.png';
import expand from '../module/assets/expand.png';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Slice } from './Redux/Slice';
// import { useNavigation } from '@react-navigation/native';

function Productview() {
    const {width} = Dimensions.get('window');
  const height = (width * 100) / 60;
  const [down,setdown] = useState(false);
  const [product, setproduct] = useState();
  const prid = useSelector(state => state.changeProductReducer.product.prodid);
  const prname = useSelector(state => state.changeProductReducer.product.name);
  const primg = useSelector(state => state.changeProductReducer.product.image);
  const prrate = useSelector(state => state.changeProductReducer.product.price);
  const prqty = useSelector(state => state.changeProductReducer.product.prqty);
  const dispatcher = useDispatch();

  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get(
        `https://wpr.intertoons.net/kmshoppyapi/api/v2/FeaturedProduct?custId=''&guestId=4653631114''`,
        {
          headers: {
            vendorUrlKey: 'kmshoppy',
          },
        },
      )

      .then(response => {
        console.log(response.data);
        response?.data?.Data.map(res => {
          console.log('DATA++++', res.prName);
        });

        setproduct(response?.data?.Data);
      })
      .catch(e => {
        console.log('error', e);
      });
    }, []);
  return (
    <View
      style={[
        {width, height: '100%', },
        {flexDirection: 'column'},
      ]}>
        <View
        style={[
          {flex: 1, height: 50,maxHeight:50 },
          {flexDirection: 'column'},
        ]}>
        <View style={[{flex: 1}, {flexDirection: 'row'}]}>
          <View style={styles.locpin}>
            <TouchableOpacity 
            onPress={() => {navigation.navigate('home')}}
            >
          <Image
              source={back}
              style={{
                marginTop: 15,
                width: 25,
                height: 25,
              }}
            />
            </TouchableOpacity>
          </View>
          
          <View style={styles.heart}>
            <TouchableOpacity onPress={() => {navigation.navigate('cart')}}>
          <Image
                          source={blackcart}
                          style={{
                            
                            marginTop: 5,
                            width: 30,
                            height: 30,
                          }}
                        />
                     </TouchableOpacity>
          </View>
          <View style={{position: 'absolute',right:70}}>
          <Image
                          source={blacksearch}
                          style={{
                            
                            marginTop: 12,
                            width: 30,
                            height: 30,
                          }}
                        />  
          </View>
        </View>
       
      </View>
      <View style={{flex:2,backgroundColor:"white",height:250}}>
      <Image
                          source={{
                            uri: `https://wpr.intertoons.net/kmshoppyadmin/${primg}`,
                          }}
                          style={{
                            marginTop:20,
                            marginLeft: 50,
                            borderRadius: 15,
                            width: 220,
                            height: 220,
                          }}
                        />
        <Image
                          source={fav2}
                          style={{
                            position:'absolute',
                            top:10,
                            right:25,
                            marginTop: 12,
                            width: 20,
                            height: 20,
                          }}
                        /> 
                        <Image
                          source={expand}
                          style={{
                            position:'absolute',
                            top:200,
                            right:25, 
                            marginTop: 12,
                            width: 25,
                            height: 25,
                          }}
                        /> 
      </View>
      <View style={{flex:3}}>





      <View style={{margin:15,borderBottomColor:"#dedad9",borderBottomWidth:1,height:100,maxWidth:330}}>
<Text style={{marginLeft:10,color:"black",fontWeight:"bold",fontSize:18}}>
  {prname}
</Text>
<Text style={{marginLeft:10,marginTop:15,color:"black",fontSize:10}}>
{prqty}
</Text>
<Text style={{marginLeft:10,marginTop:15,color:"black",fontWeight:"bold",fontSize:18}}>
₹ {prrate}.00
</Text>
<View style={{backgroundColor:"#f765a0",padding:5,borderRadius:5,paddingLeft:30,paddingRight:30,position:"absolute",bottom:10,right:10}}>
<TouchableOpacity onPress={() => {navigation.navigate('cart')}}>
<Text style={{color:"#dedad9",fontWeight:"bold"}}>
  Add
</Text>
</TouchableOpacity>

</View>
      </View>
      
        <ScrollView>

        

      
{down?(<View style={{marginLeft:20,marginRight:20,padding:15}}>
<Text style={{color:"black",fontWeight:"bold"}}>
  About Product
</Text>
<TouchableOpacity style={{position:"absolute",right:10,top:15}}
onPress={() => {setdown(false)}}>
<Text style={{color:"black",fontWeight:"bold",fontSize:20}}>
  ^
</Text>

</TouchableOpacity>
<Text style={{margin:20,fontWeight:"bold"}}>
{prname}
</Text>

      </View>):
      (<View style={{marginLeft:20,marginRight:20,padding:15}}>
<Text style={{color:"black",fontWeight:"bold"}}>
  About Product
</Text>
<TouchableOpacity style={{position:"absolute",right:10,top:15}}
onPress={() => {setdown(true)}}>
<Text style={{color:"black",fontWeight:"bold",fontSize:15}}>
  v
</Text>
</TouchableOpacity>


      </View>)}
      <View style={{marginLeft:20,marginRight:20,paddingLeft:10,backgroundColor:"#e5d4fa"}}>
        <Text style={{fontWeight:"bold",marginTop:10}}>You Might Also Like</Text>
      <ScrollView horizontal={true} style={{marginTop:30}} >
            {product?.map(pr => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    
                    borderRadius: 10,
                    minWidth: 100,
                    maxWidth: 100,
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  <TouchableOpacity onPress={() => {
                navigation.navigate('product');
                  dispatcher(
                    Slice.actions.prodStatus({
                     
                      name:pr.prName,
                      price:pr.unitPrice,
                      image:pr.imageUrl,
                      // productlog:false,
                      prodid:0,
                      prqty:pr.prWeight,

                    }),
                  );

                  
                }}>
                    <View>
                      <View>
                        <Image
                          source={fav2}
                          style={{
                            marginLeft: 5,
                            marginTop: 5,
                            width: 15,
                            height: 15,
                          }}
                        />
                        <Image
                          source={{
                            uri: `https://wpr.intertoons.net/kmshoppyadmin/${pr.imageUrl}`,
                          }}
                          style={{
                            marginLeft: 20,
                            borderRadius: 15,
                            width: 60,
                            height: 50,
                          }}
                        />
                      </View>
                      <View style={{maxHeight: 42, padding: 5}}>
                        <Text
                          style={{
                            color: 'black',
                            overflow: 'hidden',
                            fontWeight: 'bold',
                          }}>
                          {pr.prName}
                        </Text>
                      </View>
                      <View style={{padding: 5}}>
                        <Text
                          style={{
                            color: 'black',
                            overflow: 'hidden',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                          ₹ {pr.unitPrice}
                        </Text>
                      </View>
                      <View style={{padding:10}}>
                      <Text
                          style={{
                            color: 'black',
                            overflow: 'hidden',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                             {pr.prWeight}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
      </View>




      
      </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    locpin: [
      {
        flex: 1,
        maxHeight: 35,
        maxWidth: 45,
        
        justifyContent: 'center',
        alignItems: 'center',
      },
      {flexDirection: 'column'},
    ],
    loc: [
      {flex: 1, maxHeight: 35, maxWidth: 135, padding: 10},
      {flexDirection: 'column'},
    ],
    locarr: [
      {
        flex: 1,
        maxHeight: 35,
        maxWidth: 45,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      },
    ],
    heart: [{position: 'absolute',maxHeight: 35,
    maxWidth: 45, right: 15, top: 7}],
  });
export default Productview