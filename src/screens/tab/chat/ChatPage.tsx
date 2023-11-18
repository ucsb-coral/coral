import React, {useEffect, useState} from 'react';
import {
  View, Text, StyleSheet, Button, Pressable, PixelRatio,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { signOut } from '../../../../auth/useAuth';
import { useSelector } from 'react-redux';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';

import { styles } from './ChatPageStyles';
import ChatScreen from '../../stack/chatScreen/ChatScreen';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import { coursemap, courses } from '../../../redux/dummyData';
import { joinCourseChat } from '../../../firebaseReduxUtilities/useChatData';

export type ChatPageProps = EmptyProps;

type ChatScreenProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

export default function ChatPage({ route, navigation }: ChatScreenProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );

  let resolvedChats = chats ?? ['NONE'];
  console.log(resolvedChats);

  // filter out all chats that only joined in the chat
  // const joinedCourses = resolvedChats.filter((chatId) => {
  //   return coursemap[chatId]?.courseTitle;
  // });
  const [joinedCourses, setJoinedCourses] = useState<string[]>([]);
  useEffect(() => {
    const filteredCourses = courses.filter(courseId => chats?.includes(courseId));
    setJoinedCourses(filteredCourses);
  }, [chats]);
  /// TODO: why not working here??
  console.log(joinedCourses);

  return (
    <View style={styles.container}>

      {/* Header & Join Button */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT LIST</Text>
      </View>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => appStackNavigate(navigation, 'ChatJoin', {})}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>


      {/* Current Class List*/}
      <Text style={styles.category}>Current Class</Text>

      <ScrollView style={styles.CurrentClasschatList}>
        {joinedCourses.map((chatId) => (
          <TouchableOpacity
            key={chatId}
            style={styles.chatItem}
            onPress={() => appStackNavigate(navigation, 'chat', { id: chatId })}>
            <Text style={styles.chatName}>{coursemap[chatId]?.courseTitle || 'Unknown Chat'}</Text>
            <Text style={styles.chatMessage}>
              Sender: This is a placeholder of the last sent msg ...
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Waitlist Class List */}
      {/* <Text style={styles.category}>Waitlist Class</Text> */}
    </View>
  );
}