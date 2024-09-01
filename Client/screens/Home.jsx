import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Services from '../components/Services';
import {useDispatch, useSelector} from 'react-redux';
import {decrementQty, getProducts, incrementQty} from '../ProductReducer';
import {addToCart, decrementQuantity, incrementQuantity} from '../CartReducer';
import Plus from 'react-native-vector-icons/AntDesign';

export default function Home({navigation}) {
  const profilePictureUri = useSelector(state => state.profilePicture.uri);
  const cart = useSelector(state => state.cart.cart);

  const product = useSelector(state => state.product.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) {
      return;
    }
    const fetchProducts = () => {
      services.map(service => dispatch(getProducts(service)));
    };

    fetchProducts();
  }, []);

  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const services = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4643/4643574.png',
      name: 'Shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '11',
      image: 'https://cdn-icons-png.flaticon.com/128/892/892458.png',
      name: 'T-shirt',
      quantity: 0,
      price: 10,
    },
    {
      id: '12',
      image: 'https://cdn-icons-png.flaticon.com/128/9609/9609161.png',
      name: 'Dresses',
      quantity: 0,
      price: 10,
    },
    {
      id: '13',
      image: 'https://cdn-icons-png.flaticon.com/128/599/599388.png',
      name: 'Jeans',
      quantity: 0,
      price: 10,
    },
    {
      id: '14',
      image: 'https://cdn-icons-png.flaticon.com/128/9431/9431166.png',
      name: 'Sweater',
      quantity: 0,
      price: 10,
    },
    {
      id: '15',
      image: 'https://cdn-icons-png.flaticon.com/128/3345/3345397.png',
      name: 'Shorts',
      quantity: 0,
      price: 10,
    },
    {
      id: '16',
      image: 'https://cdn-icons-png.flaticon.com/128/293/293241.png',
      name: 'Sleeveless',
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4 bg-red-100">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between">
          <View
            style={{width: '80%'}}
            className="bg-gray-200 rounded-full border-[1px]">
            <TextInput
              placeholder="Search"
              placeholderTextColor="black"
              className="text-black ml-5 text-base"
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('profile')}
              className="rounded-full">
              <Image style={styles.logo} className='rounded-full' source={{uri: profilePictureUri}} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-6 border-[1px] rounded-lg">
          <Image
            className="rounded-lg"
            style={styles.slide}
            source={require("../assets/main.jpg")}
          />
        </View>

        <View className="mt-4 mb-4">
          <Services />
        </View>

        <View className="mt-5">
          <View>
            {product.map(item => (
              <View
                className="flex-row justify-between items-center mb-3 bg-gray-200 p-3 rounded-xl"
                key={item.id}>
                <Image
                  style={{width: 60, height: 60}}
                  source={{uri: item.image}}
                />
                <View>
                  <Text className="text-black text-base">{item.name}</Text>
                  <Text className="text-black font-semibold">
                    ₹ {item.price}
                  </Text>
                </View>
                {cart.some(c => c.id === item.id) ? (
                  <View className="flex-row gap-5">
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(decrementQuantity(item));
                        dispatch(decrementQty(item));
                      }}
                      className="bg-blue-600 rounded-full">
                      <Plus name="minus" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className="text-black">{item.quantity}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(incrementQuantity(item));
                        dispatch(incrementQty(item));
                      }}
                      className="bg-blue-600 rounded-full">
                      <Text>
                        <Plus name="plus" size={22} color="#fff" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addToCart(item));
                      dispatch(incrementQty(item));
                    }}
                    className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full">
                    <Text className="text-white text-base">Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <View className="bg-blue-500 p-2 rounded-xl flex-row justify-between items-center">
          <View className="p-2">
            <Text className="text-white font-semibold">
              {cart.length} items | ₹{total}
            </Text>
            <Text className="text-white text-xs">
              extra charges might apply
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('pickup')}
            className="p-2">
            <Text style={{fontSize: 16}} className="text-white font-semibold">
              Proceed to pickup
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  slide: {
    width: '100%',
    height: 200,
  },
});
