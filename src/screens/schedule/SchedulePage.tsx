import React from 'react';
import {View, Text, Button, Pressable} from 'react-native';
//import {TabPageProps} from '../../navigation/navigators/TabNavigator';
import {signOut} from '../../../auth/useAuth';
import {useSelector} from 'react-redux';

export default function SchedulePage({}) {
  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text
        style={{
          // color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {'Schedule Page'}
      </Text>
      <Pressable onPress={signOut}>
        <Text
          style={{
            // color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Different Info
        </Text>
      </Pressable>
    </View>
  );
}
