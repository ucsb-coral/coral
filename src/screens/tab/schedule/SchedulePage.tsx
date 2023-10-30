import React from 'react';
import {View, Text, Button, Pressable} from 'react-native';
import {signOut} from '../../../../auth/useAuth';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';

export type SchedulePageProps = EmptyProps;

export default function SchedulePage({
  route,
  navigation,
}: TabPageProps<'schedule'>) {
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
