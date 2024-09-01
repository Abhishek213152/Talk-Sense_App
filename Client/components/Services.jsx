import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

export default function Services() {
  return (
    <View>
      <View className="mt-1">
        <Text className="text-xl text-black font-medium">
          Services Available
        </Text>
      </View>
      <ScrollView className="flex gap-5 mt-1" horizontal>
        <View className="flex justify-center items-center gap-1">
          <Image
            style={{width: 70, height: 60}}
            source={require('../assets/technology.png')}
          />
          <Text className="text-gray-700 text-sm">Washing</Text>
        </View>
        <View className="flex justify-center items-center gap-1">
          <Image
            style={{width: 70, height: 60}}
            source={require('../assets/iron.png')}
          />
          <Text className="text-gray-700 text-sm">Wash & Iron</Text>
        </View>
        <View className="flex justify-center items-center gap-1">
          <Image
            style={{width: 70, height: 60}}
            source={require('../assets/dry-cleaning.png')}
          />
          <Text className="text-gray-700 text-sm">Dry Cleaning</Text>
        </View>
        <View className="flex justify-center items-center gap-1">
          <Image
            style={{width: 70, height: 60}}
            source={require('../assets/drying.png')}
          />
          <Text className="text-gray-700 text-sm">Air Dry</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
