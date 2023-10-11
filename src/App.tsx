import React from 'react';
import {SafeAreaView, Text} from 'react-native';

export default function App() {
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fff456',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Ethan Pletcher
      </Text>
    </SafeAreaView>
  );
}
