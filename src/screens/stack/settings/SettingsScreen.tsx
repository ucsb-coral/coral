// UserSettingPage.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import {signOut} from '../../../../auth/useAuth';
import {red, white} from '../../../utilities/colors';
import Header from '../../../components/header/Header';
import {Ionicons, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import {coral} from '../../../utilities/colors';

import {scale, standardMargin} from '../../../utilities/scale';
import {withTokens} from '../../../firebaseReduxUtilities/tokens';
import IconButton from '../../../components/iconButton/IconButton';

export type SettingsScreenProps = {};
export default function SettingsScreen({
  route,
  navigation,
}: AppStackPageProps<'settings'>) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      <Header leftHandler={navigation.goBack} centerElement={'Settings'} />
      <ScrollView style={styles.ScrollView}>
        {/* go to different pages */}
        <View style={styles.settingBarContainer}>
          <IconButton
            onPress={() => {
              appStackNavigate(navigation, 'editProfile');
            }}
            label="Edit Profile"
            Icon={FontAwesome5}
            iconName={'user-edit'}
            style={{marginTop: 5}}
            iconSize={scale(17)}
          />
          <IconButton
            onPress={() => appStackNavigate(navigation, 'settings')}
            label="Settings"
            Icon={Ionicons}
            iconName={'settings-outline'}
            style={{marginTop: 5}}
          />
        </View>

        <View style={styles.signOutContainer}>
          <IconButton
            onPress={signOut}
            label="Sign Out"
            Icon={Ionicons}
            iconName={'log-out-outline'}
            iconColor={'red'}
          />
        </View>
      </ScrollView>
    </View>
  );
}
