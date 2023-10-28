import React from 'react';
import {View, Text} from 'react-native';
import {AuthStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {signInWithGoogle} from '../../../../auth/useAuth';

export type WelcomeScreenProps = EmptyProps;

export default function WelcomeScreen({
  route,
  navigation,
}: AuthStackPageProps<'welcome'>) {
  return (
    <View
      style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Welcome
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        onPress={signInWithGoogle}
      />
    </View>
  );
}
