import React from 'react';
import { View, Text, StyleSheet, Pressable, PixelRatio, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AppStackPageProps } from '../../../navigation/navigators/StackNavigator';
import { signInWithGoogle } from '../../../../auth/useAuth';

import { styles } from './ChatScreenStyles';

const DEVICEPIXELRATIO = PixelRatio.get();

export type ChatScreenProps = {
  id: string;
  chatName: string;
};

export default function ChatScreen({
  route,
  navigation,
}: AppStackPageProps<'chat'>) {
  const { chatName } = route.params;
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        {/* chat name dont show here, need to fix later*/}
        <Text style={styles.headerText}>{chatName}</Text>  
      </View>

      {/* Message List */}
      <ScrollView style={styles.messageList}>
        <Text style={styles.message}>Example message1</Text>
        <Text style={styles.message}>Example message2</Text>
        <Text style={styles.message}>Example message3</Text>
        <Text style={styles.message}>Example message4</Text>
        <Text style={styles.message}>Example message5</Text>
        <Text style={styles.message}>Example message6</Text>
        <Text style={styles.message}>Example message7</Text>
        <Text style={styles.message}>Example message8</Text>
        <Text style={styles.message}>Example message9</Text>
        <Text style={styles.message}>Example message10</Text>
        <Text style={styles.message}>Example message11</Text>
        <Text style={styles.message}>Example message12</Text>
        <Text style={styles.message}>Example message13</Text>
        <Text style={styles.message}>Example message14</Text>
        <Text style={styles.message}>Example message15</Text>
        <Text style={styles.message}>Example message16</Text>
        <Text style={styles.message}>Example message17</Text>
        <Text style={styles.message}>Example message18</Text>
        <Text style={styles.message}>Example message19</Text>
        <Text style={styles.message}>Example message20</Text>
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput style={styles.input} placeholder="Type a message" />
        <TouchableOpacity>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

