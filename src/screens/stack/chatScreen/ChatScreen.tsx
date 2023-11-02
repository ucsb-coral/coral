import React from 'react';
import {View, Text} from 'react-native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {signInWithGoogle} from '../../../../auth/useAuth';
import Loading from '../../../components/Loading';
import {useSelector} from 'react-redux';

export type ChatScreenProps = {
  id: string;
};

export default function ChatScreen({
  route,
  navigation,
}: AppStackPageProps<'chat'>) {
  const {id} = route.params;
  const chat = useSelector((state: ReduxState) => state.data.chatmap[id]);
  const course = useSelector((state: ReduxState) => state.data.coursemap[id]);

  return (
    <Loading isReady>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {id}
      </Text>
    </Loading>
  );
}
