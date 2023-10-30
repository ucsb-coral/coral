import React from 'react';
import {View, Text, Button, Pressable} from 'react-native';
//import {TabPageProps} from '../../navigation/navigators/TabNavigator';
import {signOut} from '../../../../auth/useAuth';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';

export type UserPageProps = EmptyProps;

export default function UserPage({route, navigation}: TabPageProps<'user'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );

  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text
        style={{
          // color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {'User Page'}
      </Text>
      <Pressable onPress={signOut}>
        <Text
          style={{
            // color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
          }}>
          Sign Out
        </Text>
      </Pressable>

      <Text
        style={{
          // color: '#fff',
          fontSize: 20,
        }}>
        {`${user?.email}\n${user?.firstName}\n${user?.lastName}`}
      </Text>
    </View>
  );
}
