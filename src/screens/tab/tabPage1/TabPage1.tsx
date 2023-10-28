import React from 'react';
import {View, Text, Button, Pressable} from 'react-native';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {signOut} from '../../../../auth/useAuth';
import {useSelector} from 'react-redux';

export type TabPage1Props = EmptyProps;

export default function TabPage1({
  route,
  navigation,
}: TabPageProps<'tabpage1'>) {
  const googleUser = useSelector((state: ReduxState) => state.data.googleUser);

  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {'Tab Page 1'}
      </Text>
      <Pressable onPress={signOut}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Sign Out
        </Text>
      </Pressable>

      <Text
        style={{
          color: '#fff',
          fontSize: 20,
        }}>
        {`${googleUser?.email}\n${googleUser?.givenName}\n${googleUser?.familyName}`}
      </Text>
    </View>
  );
}