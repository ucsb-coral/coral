import React from 'react';
import {Card, Button} from 'react-native-paper';
import {Text} from 'react-native';
import {black, coral, grey0} from '../../../../utilities/colors';
import {sfProTextRegular, sfProTextSemibold} from '../../../../utilities/textfont';

// Assuming getLastMessageDetails is implemented as previously described

export type ChatCardProps = {
  chatId: string;
  courseTitle: string;
  lastMessage: string; // Last message and sender name
  openChat: (chatId: string) => void;
  joined: boolean; // This might always be true if showing in chat list
};

export default function ChatCard({
  chatId,
  courseTitle,
  lastMessage,
  openChat,
  joined,
}: ChatCardProps) {
  return (
    <Card style={{marginBottom: 16}}>
      <Card.Title
        title={courseTitle} // Now uses courseTitle as the main title
        titleStyle={{
          fontFamily: sfProTextSemibold,
          fontSize: 26,
          color: black,
        }}
        subtitle={lastMessage} // Uses the last message and sender's name
        subtitleStyle={{
          fontFamily: sfProTextRegular,
          fontSize: 18,
          color: grey0,
        }}
      />
      <Card.Actions>
        <Button
          onPress={() => openChat(chatId)}
          mode="contained"
          style={{backgroundColor: coral}}
        >
          {joined ? 'Open Chat' : 'Join Chat'} 
        </Button>
      </Card.Actions>
    </Card>
  );
}