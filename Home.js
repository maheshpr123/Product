import axios from 'axios';
import React, {useEffect, useState} from 'react';
import locator from '../module/assets/locator.png';
import arrow from '../module/assets/arrow.png';
import fav from '../module/assets/fav.png';
import fav2 from '../module/assets/fav2.png';
import home from '../module/assets/home.png';
import diversity from '../module/assets/diversity.png';
import cart from '../module/assets/cart.png';
import search from '../module/assets/search.png';
import profile from '../module/assets/profile.png';
import {useDispatch, useSelector} from 'react-redux';

import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { Slice } from './Redux/Slice';
import { useNavigation } from '@react-navigation/native';
import { SearchBAr } from './SearchBAr';

function Home() {
  const {width} = Dimensions.get('window');
  const height = (width * 100) / 60;
  const [product, setproduct] = useState();
  const [banner, setbanner] = useState();
  const navigation = useNavigation();
  const dispatcher = useDispatch();
  const select = useSelector(state => state.changeProductReducer.product);
  

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

    // banner
    axios
      .get(
        'https://wpr.intertoons.net/kmshoppyapi/api/v2/Products/HomeProducts',
      )
      .then(response => {
        console.log('data', response?.data?.Data.MobilePromoFull);
        
        response?.data?.Data.MobilePromoFull.map((bn)=>{
console.log(bn.imageUrl);
setbanner(bn.imageUrl);
        })
        
      })
      .catch(e => {
        console.log('error', e);
      });
  }, []);
  console.log('ANOTHER DATA==========', product);
  return (
    <View
      style={[
        {width, height: '100%', backgroundColor: 'white'},
        {flexDirection: 'column'},
      ]}>
      <View
        style={[
          { flex:0.6, backgroundColor: '#621EB2',maxHeight:90},
          {flexDirection: 'column'},
        ]}>
        <View style={[ {flexDirection: 'row'}]}>
          <View style={styles.locpin}>
            <Image
              source={locator}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
          <View style={styles.loc}>
            <Text style={{fontWeight: 'bold',color:"white"}}>Choose Location</Text>
          </View>
          <View style={styles.locarr}>
            <Image
              source={arrow}
              style={{
                width: 15,
                height: 15,
              }}
            />
          </View>
          <View style={styles.heart}>
            <Image
              source={fav}
              style={{
                width: 15,
                height: 15,
              }}
            />
          </View>
        </View>
        <View style={[ {flexDirection: 'column'}]}>
          
          <SearchBAr
          name="Search for over 500 products"
          
          
          />
        </View>
      </View>
      <View style={[{flex:1,paddingLeft:10,paddingRight:10,maxHeight:100}, {flexDirection: 'column'}]}>
      <View >
      <Image
                          source={{
                            uri: `https://wpr.intertoons.net/kmshoppyadmin/${banner}`,
                          }}
                          style={{
                            marginTop:5,
                            borderRadius: 15,
                            width: '99%',
                            height: '95%',
                          }}
                        />
          </View>
      </View>
      <View style={[{ flex:2,maxHeight:300,paddingTop:30}, {flexDirection: 'column'}]}>
        <View
          style={[
            {
              justifyContent: 'space-between',
              paddingLeft: 15,
              paddingBottom:30,
              flexDirection: 'row',
            },
          ]}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Featured products
          </Text>
          <Text
            style={{
              color: '#c70c89',
              fontSize: 20,
              fontWeight: 'bold',
              right: 15,
            }}>
            See More
          </Text>
        </View>
        <View style={{padding: 10, backgroundColor: '#f0edef'}}>
          <ScrollView horizontal={true}>
            {product?.map(pr => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 15,
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
      </View>
      <View style={{flex:1,paddingLeft:10,paddingRight:10,maxHeight:150}}>
      <Image
                          source={{
                            uri: `https://wpr.intertoons.net/kmshoppyadmin/${banner}`,
                          }}
                          style={{
                            
                            borderRadius: 15,
                            width: '99%',
                            height: '95%',
                          }}
                        />
      </View>
      <View style={[{flex:0.8,backgroundColor:"white",position:'absolute',bottom:0,},{flexDirection:'row'}]}>
<View style={{flex:1,alignItems:"center"}}>
<Image
                          source={home}
                          style={{
                            
                            marginTop: 5,
                            width: 35,
                            height: 35,
                          }}
                        />
                        <Text style={{color:"black",fontWeight:"bold"}}>
                          Home
                        </Text>
</View>
<View style={{flex:1,alignItems:"center"}}>
<Image
                          source={diversity}
                          style={{
                            
                            marginTop: 5,
                            width: 35,
                            height: 35,
                          }}
                        />
                        <Text style={styles.navun}>
                          Categories
                        </Text>
</View>
<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
  <TouchableOpacity onPress={() => {navigation.navigate('cart')}}>
<Image
                          source={cart}
                          style={{
                            
                            marginTop: 5,
                            width: 40,
                            height: 40,
                          }}
                        />
                  </TouchableOpacity>      
</View>
<View style={{flex:1,alignItems:"center"}}>
<Image
                          source={search}
                          style={{
                            
                            marginTop: 5,
                            width: 35,
                            height: 35,
                          }}
                        />
                        <Text style={styles.navun}>
                          Search
                        </Text>
</View>
<View style={{flex:1,alignItems:"center"}}>
<Image
                          source={profile}
                          style={{
                            
                            marginTop: 5,
                            width: 35,
                            height: 35,
                          }}
                        />
                        <Text style={styles.navun}>
                          Profile
                        </Text>
</View>
      </View>
    </View>
  );
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

      justifyContent: 'center',
      alignItems: 'center',
    },
  ],
  heart: [
    {position: 'absolute', maxHeight: 35, maxWidth: 45, right: 15, top: 7},
  ],
  navun:[{
    color:"#999ba3",
    fontWeight:"bold",

  }]
});
export default Home;
