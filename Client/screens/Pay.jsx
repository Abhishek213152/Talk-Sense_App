import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useStripe} from '@stripe/stripe-react-native';

const Pay = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const cart = useSelector(state => state.cart.cart);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const handlePayment = async () => {
    setLoading(true);
    setPaymentSuccess(false);
    try {
      const response = await fetch('https://qsaa.onrender.com/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: total * 100}), 
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment session.');
      }

      const {client_secret} = await response.json();

      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: 'Abhi',
      });

      if (error) {
        console.error('Error initializing payment sheet:', error.message);
        setLoading(false);
        return;
      }

      const {error: paymentError} = await presentPaymentSheet();
      if (paymentError) {
        console.error('Error presenting payment sheet:', paymentError.message);
      } else {
        console.log('Success: Payment successful!');
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Error handling payment:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-5 mt-28">
      <View className="mb-5">
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
      <View className="flex justify-center items-center">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : paymentSuccess ? (
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
            Payment successful! Order placed.
          </Text>
        ) : (
          <TouchableOpacity
            onPress={handlePayment}
            className="bg-blue-600 p-4 rounded-full flex justify-center items-center"
            style={{width: 200}}>
            <Text className="text-white text-base font-semibold">Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});
