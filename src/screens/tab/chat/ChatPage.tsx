import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, PixelRatio, TouchableOpacity, ScrollView } from 'react-native';
//import {TabPageProps} from '../../navigation/navigators/TabNavigator';
import {signOut} from '../../../../auth/useAuth';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';


import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { appStackNavigate } from '../../../navigation/navigators/StackNavigator';

import { styles } from '../styles/ChatPageStyles';



export type ChatPageProps = EmptyProps;

export default function ChatPage({route, navigation}: TabPageProps<'chats'>) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CHAT</Text>
      </View>
      {/* <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Back</Text>
      </Pressable> */}
      <Text style={styles.category}>Current Class</Text>
      {/* Chat List */}
      <View style={styles.chatList}>
        {/* Repeat this block for each chat item */}
        <TouchableOpacity style={styles.chatItem} 
        onPress={() => navigation.navigate('ChatRoom', { chatName: 'Class 1' })} 
        >
          <Text style={styles.chatName}>Class 1</Text>
          <Text style={styles.chatMessage}>Sender: This is a preview of the last sent message...</Text>
        </TouchableOpacity>
        {/* ... */}
      </View>
      <View style={styles.chatList}>
        {/* Repeat this block for each chat item */}
        <TouchableOpacity style={styles.chatItem}>
          <Text style={styles.chatName}>Class 2</Text>
          <Text style={styles.chatMessage}>Sender: This is a preview of the last sent message...</Text>
        </TouchableOpacity>
        {/* ... */}
      </View>
      <Text style={styles.category}>Waitlist Class</Text>
      <View style={styles.chatList}>
        {/* Repeat this block for each chat item */}
        <TouchableOpacity style={styles.chatItem}>
          <Text style={styles.chatName}>Class 3</Text>
          <Text style={styles.chatMessage}>Sender: This is a preview of the last sent message...</Text>
        </TouchableOpacity>
        {/* ... */}
      </View>
      <Pressable
        style={styles.joinButton}
        // onPress={() => navigation.navigate('About')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>To Join</Text>
      </Pressable>
    </View>
  );
}
