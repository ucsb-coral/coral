// UserSettingPage.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import Header from '../../../components/header/Header';

export type EditProfileScreenProps = {};
export default function EditProfileScreen({
  route,
  navigation,
}: AppStackPageProps<'editProfile'>) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <Header
            leftHandler={navigation.goBack}
            centerElement={'Edit Profile'}
          />

          <View style={styles.settingBarContainer}>
            <View style={styles.UserNewNameBox}>
              <Text style={styles.UserNewNameText}>Nick name:</Text>
              <TextInput
                style={styles.UserNewName}
                placeholder="Enter your new name"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
