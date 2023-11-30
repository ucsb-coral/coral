// UserSettingPage.tsx
import React, { useState } from 'react';
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
import { coral } from '../../../utilities/colors';
import { setMyUserPreferredName } from '../../../firebaseReduxUtilities/useUserData';

export type EditProfileScreenProps = {};
export default function EditProfileScreen({
  route,
  navigation,
}: AppStackPageProps<'editProfile'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  const [newName, setNewName] = useState('');

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
                value = {newName}
                onChangeText = {(text) => setNewName(text)}
              />
            </View>

            {/* <TouchableOpacity
            onPress={() => {
              // TODO
              // get the text from the text input
              setMyUserPreferredName(myUserId, user, newName);
              navigation.goBack();
              navigation.goBack();
            }}
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: '#F88379AA',
              width: '30%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            activeOpacity={0.6}>

            <Text style={styles.longBarText}>Submit</Text>
            </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              setMyUserPreferredName(myUserId, user, newName);
              navigation.goBack();
              navigation.goBack();
            }}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMyUserPreferredName(myUserId, user, '');
              navigation.goBack();
              navigation.goBack();
            }}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>Use Default Name: {user?.firstName}</Text>
          </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
