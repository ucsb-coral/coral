import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';

import {styles} from './ChatPageStyles';
import {CompositeScreenProps} from '@react-navigation/native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import Header from '../../../components/header/Header';
import {Ionicons} from '@expo/vector-icons';
import {coral, white, black} from '../../../utilities/colors';
import {scale} from '../../../utilities/scale';
import { avenirBlackCentered} from '../../../utilities/textfont';
import { loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';

export type ChatsScreenProps = EmptyProps;

type ChatsPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

export default function ChatsScreen({route, navigation}: ChatsPageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );
  const tempCourses = useSelector((state: ReduxState) => state.data.usermap[myUserId!].courses);
  const courses: string[] = tempCourses ? tempCourses : [];
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);

  // load user.courses list into coursemap
  useEffect(() => {
    loadCoursesData(courses);
  }, [courses]);

  let resolvedChats = chats ?? ['NONE'];
  console.log(resolvedChats);

  // filter out all chats that only joined in the chat
  // const joinedCourses = resolvedChats.filter((chatId) => {
  //   return coursemap[chatId]?.courseTitle;
  // });
  const [joinedChats, setJoinedChats] = useState<string[]>([]);
  useEffect(() => {
    const filteredChats = courses.filter(courseId =>
      chats?.includes(courseId),
    );
    setJoinedChats(filteredChats);
  }, [chats]);

  return (
    <View style={{flex: 1 , backgroundColor:white}}>
      <Header
        centerElement={'Chat List'}
        rightHandler={() => appStackNavigate(navigation, 'joinChats', {})}
        rightElement={joinButton}
      />

      {/* Current Class List*/}
      {/* <Text style={styles.category}>Current Classes</Text> */}
      
      {joinedChats.length === 0 ? 
      <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: avenirBlackCentered, fontSize: 20, color: 'black' }}>
        You have not joined any chats
      </Text>
       : null}

      <ScrollView style={styles.CurrentClasschatList}>
        {joinedChats.map(chatId => (
          <TouchableOpacity
            key={chatId}
            style={styles.chatItem}
            onPress={() => appStackNavigate(navigation, 'chat', {id: chatId})}>
            <Text style={styles.chatName}>
              {coursemap[chatId]?.courseId || 'Unknown Chat'}
            </Text>
            <Ionicons
                name={'chevron-forward-outline'}
                size={scale(25)}
                color={black}
                //style={styles.longBoxIcon}
              />
            {/* <Text style={styles.chatMessage}>
              Sender: This is a placeholder of the last sent msg ...
            </Text> */}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Waitlist Class List */}
      {/* <Text style={styles.category}>Waitlist Class</Text> */}
    </View>
  );
}

const joinButton = (
  <View
    style={{
      backgroundColor: coral,
      height: scale(32),
      width: scale(66),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(28),
    }}>
    <Text
      style={{
        color: white,
        textAlign: 'center',
        fontFamily: avenirBlackCentered,
        fontSize: scale(15),
        includeFontPadding: false,
        textAlignVertical: 'center',
      }}>
      Join
    </Text>
  </View>
);
