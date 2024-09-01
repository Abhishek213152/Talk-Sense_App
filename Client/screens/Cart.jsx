import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Caart from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {decrementQuantity, incrementQuantity} from '../CartReducer';
import {decrementQty, incrementQty} from '../ProductReducer';
import Plus from 'react-native-vector-icons/AntDesign';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.cart);
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <SafeAreaView>
      <ScrollView style={{height: '89%'}}>
        <View className="p-4">
          <View className="flex-row justify-center items-center gap-2 mb-5">
            <Text className="text-black text-3xl font-semibold">Cart</Text>
            <Caart size={25} name="shopping-cart" color="black" />
          </View>
          <View className="p-5">
            {cart.map((item, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center mb-8 mt-1">
                <Text style={{width: 67, fontSize: 14}} className="text-black">
                  {item.name}
                </Text>

                <View className="flex-row gap-4">
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(decrementQuantity(item));
                      dispatch(decrementQty(item));
                    }}
                    className="bg-blue-500 rounded-full">
                    <Plus name="minus" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text className="text-black">{item.quantity}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(incrementQuantity(item));
                      dispatch(incrementQty(item));
                    }}
                    className="bg-blue-500 rounded-full">
                    <Text>
                      <Plus name="plus" size={20} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={{fontSize: 14}} className="text-black">
                  ₹{item.price * item.quantity}
                </Text>
              </View>
            ))}
          </View>

          <View>
            <Text className="text-black text-lg font-semibold">
              Billing Details
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 7,
                padding: 10,
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 18, fontWeight: '400', color: 'gray'}}>
                  Item Total
                </Text>
                <Text
                  className="text-black"
                  style={{fontSize: 18, fontWeight: '400'}}>
                  ₹{total}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text style={{fontSize: 18, fontWeight: '400', color: 'gray'}}>
                  Delivery Fee | 1.2KM
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F',
                  }}>
                  FREE
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                  Free Delivery on Your order
                </Text>
              </View>

              <View
                style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                  Selected Date
                </Text>
                <Text
                  className="text-black"
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F',
                  }}>
                  July 12
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                  No Of Days
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F',
                  }}>
                  2-3 days
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{fontSize: 18, fontWeight: '500', color: 'gray'}}>
                  Selected Pick Up Time
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#088F8F',
                  }}>
                  8:00 AM
                </Text>
              </View>
              <View
                style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <Text
                  className="text-black"
                  style={{fontSize: 18, fontWeight: 'bold'}}>
                  To Pay
                </Text>
                <Text
                  className="text-black"
                  style={{fontSize: 18, fontWeight: 'bold'}}>
                  ₹ {total + 27}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View>
        {total === 0 ? null : (
          <View className="bg-blue-500 p-2 ml-3 mr-3 rounded-xl flex-row justify-between items-center">
            <View className="p-2">
              <Text className="text-white font-semibold">
                {cart.length} items | ₹{total + 27}
              </Text>
              <Text className="text-white text-xs">Select payment method</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('pay')}
              className="p-2">
              <Text style={{fontSize: 16}} className="text-white font-semibold">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;
