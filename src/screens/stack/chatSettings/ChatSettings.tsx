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
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import Header from '../../../components/header/Header';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import {black} from '../../../utilities/colors';
import {leaveCourseChat} from '../../../firebaseReduxUtilities/useChatData';
import Participants from './components/Participants';
import IconButton from '../../../components/iconButton/IconButton';

export type ChatSettingsProps = {
  id: string;
};

export default function ChatSettings({
  route,
  navigation,
}: AppStackPageProps<'chatSettings'>) {
  const {id: currentChatID} = route.params;
  console.log('currentChatID:', currentChatID);
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header leftHandler={navigation.goBack} centerElement={'Chat Settings'} />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <Participants chatId={currentChatID} navigation={navigation} />
          <View style={styles.signOutContainer}>
            <IconButton
              label="Leave Chat"
              Icon={Ionicons}
              iconName={'trash-outline'}
              iconColor="red"
              style={{marginTop: 5}}
              onPress={() => {
                () => setIsSelected(!isSelected);
                leaveCourseChat(currentChatID);
                appStackNavigate(navigation, 'tabNavigator');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
