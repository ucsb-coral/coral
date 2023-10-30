import React from 'react';
import {View, Text} from 'react-native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {signInWithGoogle} from '../../../../auth/useAuth';

export type ChatScreenProps = {
  id: string;
};

export default function ChatScreen({
  route,
  navigation,
}: AppStackPageProps<'chat'>) {
  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        chat
      </Text>
    </View>
  );
}
