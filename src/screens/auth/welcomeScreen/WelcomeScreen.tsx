import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {AuthStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {styles} from './WelcomeScreenStyle';
import {signIn} from '../../../../auth/useAuth';

export type WelcomeScreenProps = EmptyProps;

export default function WelcomeScreen({
  route,
  navigation,
}: AuthStackPageProps<'welcome'>) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../utilities/image/Coral_pink.png')}
        style={styles.image}
      />
      <GoogleSigninButton
        style={styles.button}
        size={GoogleSigninButton.Size.Wide}
        onPress={signIn}
      />

      <Text style={styles.text}>Connect Collaborate Conquer</Text>
    </View>
  );
}
