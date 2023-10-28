import React from 'react';
import {View, Text, Button, Pressable} from 'react-native';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {signOut} from '../../../../auth/useAuth';
import {useSelector} from 'react-redux';

export type TabPage2Props = EmptyProps;

export default function TabPage2({
  route,
  navigation,
}: TabPageProps<'tabpage2'>) {
  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {'Tab Page 2'}
      </Text>
      <Pressable onPress={signOut}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Different Info
        </Text>
      </Pressable>
    </View>
  );
}
