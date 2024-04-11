// UserSettingPage.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import {grey} from '../../../utilities/colors';
import {AntDesign} from '@expo/vector-icons';
import Header from '../../../components/header/Header';

export type AboutScreenProps = EmptyProps;
export default function AboutScreen({
  route,
  navigation,
}: AppStackPageProps<'about'>) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <Header
            leftHandler={navigation.goBack}
            centerElement={'About Coral'}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
}
