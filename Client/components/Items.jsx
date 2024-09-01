import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Items() {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-3 bg-gray-200 p-3 rounded-xl">
        <Image
          style={{width: 60, height: 60}}
          source={require('../assets/machine.png')}
        />
        <View>
          <Text className="text-black text-base">Shirt</Text>
          <Text className="text-black font-semibold">$ 10</Text>
        </View>
        <TouchableOpacity className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full">
          <Text className="text-white text-base">Add</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-3 bg-gray-200 p-3 rounded-xl">
        <Image
          style={{width: 60, height: 60}}
          source={require('../assets/machine.png')}
        />
        <View>
          <Text className="text-black text-base">Shirt</Text>
          <Text className="text-black font-semibold">$ 10</Text>
        </View>
        <TouchableOpacity className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full">
          <Text className="text-white text-base">Add</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-3 bg-gray-200 p-3 rounded-xl">
        <Image
          style={{width: 60, height: 60}}
          source={require('../assets/machine.png')}
        />
        <View>
          <Text className="text-black text-base">Shirt</Text>
          <Text className="text-black font-semibold">$ 10</Text>
        </View>
        <TouchableOpacity className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full">
          <Text className="text-white text-base">Add</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-3 bg-gray-200 p-3 rounded-xl">
        <Image
          style={{width: 60, height: 60}}
          source={require('../assets/machine.png')}
        />
        <View>
          <Text className="text-black text-base">Shirt</Text>
          <Text className="text-black font-semibold">$ 10</Text>
        </View>
        <TouchableOpacity className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full">
          <Text className="text-white text-base">Add</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mb-3 bg-gray-200 p-3 rounded-xl">
        <Image
          style={{width: 60, height: 60}}
          source={require('../assets/machine.png')}
        />
        <View>
          <Text className="text-black text-base">Shirt</Text>
          <Text className="text-black font-semibold">$ 10</Text>
        </View>
        <TouchableOpacity className="w-14 h-7 flex justify-center items-center bg-blue-600 rounded-full">
          <Text className="text-white text-base">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({})