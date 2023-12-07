// UserSettingPage.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps, appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import Header from '../../../components/header/Header';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import {black} from '../../../utilities/colors';
import {leaveCourseChat} from '../../../firebaseReduxUtilities/useChatData';
import {leaveCourse} from '../../../firebaseReduxUtilities/useCourseData';


export type ChatSettingsProps = {
  id: string;
};
export default function ChatSettings({
  route,
  navigation,
}: AppStackPageProps<'chatSettings'>) {
  const { id: currentChatID } = route.params; 
  console.log('currentChatID:', currentChatID);
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
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
            {/* <TouchableOpacity
              style={[styles.UserNewNameBox]}
              activeOpacity={0.6}
              onPress={() => setIsSelected(!isSelected)}>
              <Text style={styles.UserNewNameText}>Chat Name : </Text>
              <TextInput
                style={styles.UserNewName}
                placeholder="new name"
              />
            </TouchableOpacity> */}


            <TouchableOpacity
              style={styles.longBox}
              activeOpacity={0.6}
              onPress={() => {
                () => setIsSelected(!isSelected);
                leaveCourseChat(currentChatID);
                // leaveCourse(currentChatID);
                appStackNavigate(navigation,'tabNavigator');
              }}>
              <Text style={styles.longBarText}>Leave Chat</Text>
              <Ionicons
                name={'trash-outline'}
                size={scale(25)}
                color={black}
                style={styles.longBoxIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.longBox}
              activeOpacity={0.6}
              onPress={() => setIsSelected(!isSelected)}>
              <Text style={styles.longBarText}>Course About</Text>
              <Ionicons
                name={'information-circle-outline'}
                size={scale(25)}
                color={black}
                style={styles.longBoxIcon}
              />
            </TouchableOpacity>

          </View>


          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
