import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, PixelRatio, TouchableOpacity, ScrollView } from 'react-native';
import { signOut } from '../../../../auth/useAuth';
import { useSelector } from 'react-redux';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';

import { styles } from './ChatPageStyles';
import ChatScreen from '../../stack/chatScreen/ChatScreen';

export type ChatPageProps = EmptyProps;

export default function ChatPage({ route, navigation }: TabPageProps<'chats'> & { navigation: any }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT LIST</Text>
      </View>

      {/* Back Button */}
      <Pressable
        style={styles.joinButton}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>To Join</Text>
      </Pressable>

      {/* Current Class List*/}
      <Text style={styles.category}>Current Class</Text>

      {/* Chat List */}
      <View style={styles.chatList}>
        <TouchableOpacity style={styles.chatItem}
        // onPress={() => navigation.navigate(ChatScreen, { chatName: 'Class 1' })}
        onPress={() => navigation.navigate('chat', { screen: 'ChatScreen', params: { chatName: 'Class 1' } })}
        >
          <Text style={styles.chatName}>Class 1</Text>
          <Text style={styles.chatMessage}>Sender: This is a preview of the last sent message...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chatList}>
        <TouchableOpacity style={styles.chatItem}
        onPress={() => navigation.navigate('chat', { screen: 'ChatScreen', params: { chatName: 'Class 2' } })}>
          <Text style={styles.chatName}>Class 2</Text>
          <Text style={styles.chatMessage}>Sender: This is a preview of the last sent message...</Text>
        </TouchableOpacity>
      </View>

      {/* Waitlist Class List */}
      <Text style={styles.category}>Waitlist Class</Text>

      <View style={styles.chatList}>
        <TouchableOpacity style={styles.chatItem}
        onPress={() => navigation.navigate('chat', { screen: 'ChatScreen', params: { chatName: 'Class 3' } })}>
          <Text style={styles.chatName}>Class 3</Text>
          <Text style={styles.chatMessage}>Sender: This is a preview of the last sent message...</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
