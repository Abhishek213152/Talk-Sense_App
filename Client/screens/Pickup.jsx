import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import {useSelector} from 'react-redux';

const Pickup = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [delivery, setDelivery] = useState([]);
  const [address, setAddress] = useState('');

  const cart = useSelector(state => state.cart.cart);
  const total = cart
    .map(item => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 7);

  const deliveryTime = [
    {
      id: '0',
      name: 'Tommorrow',
    },
    {
      id: '1',
      name: '2-3 Days',
    },
    {
      id: '2',
      name: '3-4 Days',
    },
    {
      id: '3',
      name: '4-5 Days',
    },
    {
      id: '4',
      name: '5-6 Days',
    },
  ];

  const times = [
    {id: '0', time: '08:00 AM'},
    {id: '1', time: '11:00 AM'},
    {id: '2', time: '02:00 PM'},
    {id: '3', time: '05:00 PM'},
    {id: '4', time: '09:00 PM'},
    {id: '5', time: '11:00 PM'},
  ];

  const isPastTime = timeString => {
    const [hours, minutes, period] = timeString.split(/[: ]/);
    let date = new Date(selectedDate);
    let hours24 =
      parseInt(hours) + (period === 'PM' && hours !== '12' ? 12 : 0);
    date.setHours(hours24, minutes);

    return date < new Date();
  };

  const handleToCart = () => {
    if (!delivery || !selectedDate || !selectedTime || !address) {
      Alert.alert(
        'Empty or Invalid',
        'Please select all fields',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate('cart');
    }
  };

  return (
    <SafeAreaView>
      <View className="p-4 flex gap-2">
        <Text className="text-black text-base font-semibold">
          Enter your full address
        </Text>
        <View className="border-[1px] ml-3 mr-2 h-20 rounded-lg">
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Type here..."
            placeholderTextColor="gray"
            multiline={true}
            className="text-black"
          />
        </View>
      </View>

      <View className="mt-3 ml-4">
        <Text className="text-black text-base font-semibold">Pick Up Date</Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={currentDate}
          endDate={endDate}
          initialSelectedDate={currentDate}
          onSelectedDateChange={date => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="white"
        />
      </View>

      <View className="mt-3 ml-4">
        <Text className="text-black text-base font-semibold">Select Time</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {times.map((item, index) => {
            const pastTime = isPastTime(item.time);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => !pastTime && setSelectedTime(item.time)}
                style={{
                  margin: 10,
                  borderRadius: 10,
                  padding: 15,
                  borderColor: pastTime ? 'gray' : 'black',
                  borderWidth: 0.7,
                  backgroundColor: pastTime
                    ? '#dcdde1'
                    : selectedTime === item.time
                    ? 'black'
                    : 'white',
                  width: 90, // Adjust width to fit within the screen
                  alignItems: 'center', // Center text within the button
                }}
                disabled={pastTime}>
                <Text
                  style={{
                    color: pastTime
                      ? 'gray'
                      : selectedTime === item.time
                      ? 'white'
                      : 'black',
                    fontSize: 13,
                  }}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="p-4 flex gap-2">
        <Text className="text-black text-base font-semibold">
          Delivery Date
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <TouchableOpacity
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: 'black',
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 8,
                      borderRadius: 7,
                      padding: 15,
                      backgroundColor: 'white',
                      borderColor: 'gray',
                      borderWidth: 0.7,
                    }
              }
              onPress={() => setDelivery(item.name)}
              key={i}>
              <Text
                style={
                  delivery.includes(item.name)
                    ? {
                        color: 'white',
                      }
                    : {color: 'black'}
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {total === 0 ? null : (
        <View className="bg-blue-500 p-2 ml-3 mr-3 mt-24 rounded-xl flex-row justify-between items-center">
          <View className="p-2">
            <Text className="text-white font-semibold">
              {cart.length} items | ₹{total}
            </Text>
            <Text className="text-white text-xs">
              extra charges might apply
            </Text>
          </View>
          <TouchableOpacity onPress={handleToCart} className="p-2">
            <Text style={{fontSize: 16}} className="text-white font-semibold">
              Proceed to Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Pickup;
