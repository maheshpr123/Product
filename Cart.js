import React, {useEffect, useState} from 'react';
import locator from '../module/assets/cartback.png';
import arrow from '../module/assets/arrow.png';
import fav from '../module/assets/fav.png';
import fav2 from '../module/assets/fav2.png';
import home from '../module/assets/carthome.png';
import diversity from '../module/assets/diversity.png';
import cart from '../module/assets/cartslt.png';
import rightsort from '../module/assets/rightsort.png';
import search from '../module/assets/search.png';
import profile from '../module/assets/profile.png';
import {useDispatch, useSelector} from 'react-redux';
import { Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Cart() {
    const {width} = Dimensions.get('window');
    const height = (width * 100) / 60;
    const [product, setproduct] = useState();
    const [banner, setbanner] = useState();
    // const navigation = useNavigation();
    const [count, setcount] = useState(1);
    const navigation = useNavigation();

    const discount=5;
    const dispatcher = useDispatch();
    const select = useSelector(state => state.changeProductReducer.product);
    const prname = useSelector(state => state.changeProductReducer.product.name);
  const primg = useSelector(state => state.changeProductReducer.product.image);
  const prrate = useSelector(state => state.changeProductReducer.product.price);
  const prqty = useSelector(state => state.changeProductReducer.product.prqty);
  
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
          { flex:.3, backgroundColor: '#621EB2'},
          {flexDirection: 'column'},
        ]}>
        <View style={[ {flexDirection: 'row'}]}>
          <View style={styles.locpin}>
            <TouchableOpacity onPress={() => {navigation.navigate('home')}}>
            <Image
              source={locator}
              style={{
                marginTop: 15,
                width: 35,
                height: 35,
              }}
            />
            </TouchableOpacity>
          </View>
          <View style={styles.loc}>
            <Text style={{fontWeight: 'bold',fontSize:20,color:"white"}}>Cart (1)</Text>
          </View>
          <View style={styles.locarr}>
            
          </View>
          <View style={styles.heart}>
            <Text style={{fontWeight: 'bold',fontSize:20,color:"white"}}>
                Empty Cart
            </Text>
          </View>
        </View>
        
      </View>
      <View style={[{flex:.5, height: 70}, {flexDirection: 'row'}]}>
      <View style={{flex:1}}>
      <Image
                          source={{
                            uri: `https://wpr.intertoons.net/kmshoppyadmin/${primg}`,
                          }}
                          style={{
                            marginTop:5,
                            marginLeft: 10,
                            borderRadius: 5,
                            width: 60,
                            height: 60,
                          }}
                        />
          </View>
          <View style={{flex:1.5,padding:10}}>
     <Text style={{color:"black",fontWeight:"bold"}}>
      {prname}
     </Text>
          </View>
          <View style={{flex:1}}>
          <View
            style={[
              {
                flex: 1,
                borderRadius: 10,
                backgroundColor: '#f765a0',
                marginTop: 20,
                marginBottom: 40,
                alignItems: 'center',
                justifyContent: 'center',
              },
              {flexDirection: 'row'},
            ]}>
            <View
              style={{
                flex: 2,
                paddingBottom: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{}}
                onPress={() =>
                  count === 1 ? setcount(count) : setcount(count - 1)
                }>
                <Text style={{color: 'white'}}>-</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                paddingBottom: 5,
                alignItems: 'center',
                //justifyContent: 'center',
              }}>
              <Text style={{marginTop:5,color:"white"}}>{count}</Text>
            </View>
            <View
              style={{
                flex: 2,
                paddingBottom: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{}}
                onPress={() => setcount(count + 1)}>
                <Text style={{color: 'white'}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
          <View style={{flex:1,marginTop:25,marginLeft:10}}>
     <Text>₹ {prrate*count}.00</Text>
          </View>
      </View>
      <View style={[{flex:1.5}, {flexDirection: 'column'}]}>
        <View
          style={[
            {
              justifyContent: 'space-between',
              paddingLeft: 15,
              margin:10,
              flexDirection: 'row',
            },
          ]}>
          <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
            Avail offers / Coupons
          </Text>
          <Image
              source={rightsort}
              style={{
              
                width: 35,
                height: 35,
              }}
            />
        </View>
        <View style={{padding: 10, backgroundColor: '#f0edef'}}>
        <Text style={{fontWeight:"bold",marginTop:10}}>You Might Also Like</Text>
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
                  
                  dispatcher(
                    Slice.actions.prodStatus({
                     
                      //fishratingstatus:false
                      name:pr.prName,
                      price:pr.unitPrice,
                      image:pr.imageUrl,
                      // productlog:false,
                      prodid:0,

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
      <View style={[{flex:1.6,padding:20},{flexDirection:"column"}]}>

<View style={{flex:1.7,}}>
  <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
  Bill Details
</Text>
<Text style={{marginTop:10}}>
  Item Total 
</Text>

<Text style={{position:"absolute",right:0,top:30}}>
₹ {prrate*count}.00
</Text>
<Text style={{marginTop:3}}>
  Product Discount
</Text>
<Text style={{position:"absolute",right:0,top:50}}>
₹ {discount}.00
</Text>
</View>
<View style={{flex:.5,borderBottomColor:"#f0edef",borderBottomWidth:1,borderTopColor:"#f0edef",borderTopWidth:1,justifyContent:"center"}}>
<Text>Sub Total</Text>
<Text style={{position:"absolute",right:0,top:10}}>
₹ {prrate*count-discount}.00
</Text>
</View>
<View style={{flex:1.5}}>
<View style={{backgroundColor:"#f765a0",padding:15,borderRadius:5,alignItems:"center",marginTop:15}}>
<TouchableOpacity onPress={() => {navigation.navigate('cart')}}>
<Text style={{color:"#dedad9",fontWeight:"bold"}}>
  SELECT DELIVERY OPTIONS
</Text>
</TouchableOpacity>

</View>
</View>
      </View>
      <View style={[{position:'absolute',bottom:0,backgroundColor:"white"},{flexDirection:'row'}]}>
<View style={{flex:1,alignItems:"center"}}>
  <TouchableOpacity onPress={() => {navigation.navigate('home')}}>
<Image
                          source={home}
                          style={{
                            
                            marginTop: 5,
                            width: 35,
                            height: 35,
                          }}
                        />
                        <Text style={{color:"#99979F",fontWeight:"bold"}}>
                          Home
                        </Text>
                        </TouchableOpacity>
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
<Image
                          source={cart}
                          style={{
                            
                            marginTop: 5,
                            width: 40,
                            height: 40,
                          }}
                        />
                        
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
      {flex: 1, maxHeight: 50, maxWidth: 135, padding: 10},
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
      {position: 'absolute', right: 15, top: 7},
    ],
    navun:[{
      color:"#999ba3",
      fontWeight:"bold",
  
    }]
  });

export default Cart