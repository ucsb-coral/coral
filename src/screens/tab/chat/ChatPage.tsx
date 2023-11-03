import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  PixelRatio,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {signOut} from '../../../../auth/useAuth';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';

import {styles} from './ChatPageStyles';
import ChatScreen from '../../stack/chatScreen/ChatScreen';
import {CompositeScreenProps} from '@react-navigation/native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';

export type ChatPageProps = EmptyProps;

type ChatScreenProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

export default function ChatPage({route, navigation}: ChatScreenProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );

  let resolvedChats = chats ?? ['NONE'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT LIST</Text>
      </View>

      {/* Back Button */}
      <Pressable style={styles.joinButton}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
          To Join
        </Text>
      </Pressable>

      {/* Current Class List*/}
      <Text style={styles.category}>Current Class</Text>

      {/* Chat List */}
      <View style={styles.chatList}>
        <TouchableOpacity
          style={styles.chatItem}
          // onPress={() => navigation.navigate(ChatScreen, { chatName: 'Class 1' })}
          onPress={() =>
            appStackNavigate(navigation, 'chat', {id: resolvedChats[0]})
          }>
          <Text style={styles.chatName}>Class 1</Text>
          <Text style={styles.chatMessage}>
            Sender: This is a preview of the last sent message...
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chatList}>
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() =>
            appStackNavigate(navigation, 'chat', {id: resolvedChats[0]})
          }>
          <Text style={styles.chatName}>Class 2</Text>
          <Text style={styles.chatMessage}>
            Sender: This is a preview of the last sent message...
          </Text>
        </TouchableOpacity>
      </View>

      {/* Waitlist Class List */}
      <Text style={styles.category}>Waitlist Class</Text>

      <View style={styles.chatList}>
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() =>
            appStackNavigate(navigation, 'chat', {id: resolvedChats[0]})
          }>
          <Text style={styles.chatName}>Class 3</Text>
          <Text style={styles.chatMessage}>
            Sender: This is a preview of the last sent message...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
