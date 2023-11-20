// UserSettingPage.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import Header from '../../../components/header/Header';

export type ChatSettingsProps = {};
export default function ChatSettings({
  route,
  navigation,
}: AppStackPageProps<'chatSettings'>) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <Header
            leftHandler={navigation.goBack}
            centerElement={'Chat Settings'}
          />
          <View style={styles.settingBarContainer}>
            <TouchableOpacity
              style={styles.longBox}
              activeOpacity={0.6}
              onPress={() => setIsSelected(!isSelected)}>
              <Text style={styles.longBarText}>Chat Name</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
