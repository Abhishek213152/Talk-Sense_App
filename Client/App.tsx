import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from './components/Screen';
import ToastManager, {Toast} from 'toastify-react-native';

export default function App() {
  return (
    <View>
      <ToastManager />
      <Screen />
    </View>
  );
}

const styles = StyleSheet.create({});
