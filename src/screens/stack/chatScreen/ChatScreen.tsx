import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { AppStackPageProps, appStackNavigate } from '../../../navigation/navigators/StackNavigator';
import Loading from '../../../components/Loading';
import { useSelector } from 'react-redux';
import { coursemap } from '../../../redux/dummyData';
import Header from '../../../components/header/Header';
import InputFooter from './components/inputFooter/InputFooter';
import ChatDisplay from './components/chatDisplay/ChatDisplay';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {styles} from './ChatScreenStyles';
import { black, white } from '../../../utilities/colors';

export type ChatScreenProps = {
  id: string;
};

export default function ChatScreen({
  route,
  navigation,
}: AppStackPageProps<'chat'>) {
  const { id } = route.params;
  const chat = useSelector((state: ReduxState) => state.data.chatmap[id]);
  const [message, setMessage] = useState<string>('');
  const [selectedInput, setSelectedInput] = useState<string>('');

  const courseTitle = coursemap[id].courseTitle;

  // console.log('chat:', chat); // chat: {"memberIds": ["usr7G8ipgY9FMYgq4fbYaPVPb2Wqb73"], "messages": []}
  // console.log('course title:', courseTitle);
  // console.log('roomid:', id);
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList<Message>>(null);

  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);

  const userName = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  // console.log('myUserId:', myUserId);
  // console.log('userName:', userName?.firstName + ' ' + userName?.lastName);

  const sendMessage = async () => {
    if (message.trim().length === 0) {
      // check if message is empty
      return;
    }

    try {
      await firestore()
        .collection('chats')
        .doc(id)
        .collection('messages')
        .add({
          type: 'TEXT',
          fromUserName: userName?.firstName + ' ' + userName?.lastName,
          fromUserId: myUserId,
          content: message,
          createdAt: new Date().toISOString(),
        });

      setMessage(''); // clear message input when message is sent
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(
          doc =>
          ({
            ...doc.data(),
          } as Message),
        );
        setMessages([...messages]);
        flatListRef.current?.scrollToEnd({ animated: true });
      });

    return () => unsubscribe(); // unsubscribe when unmount
  }, [id]);

  // console.log('messages:', messages);
  return (
    <Loading isReady={!!chat}>
      <KeyboardAvoidingView
        style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse' }}>
        <InputFooter
          message={message}
          setMessage={setMessage}
          selectedInput={selectedInput}
          setSelectedInput={setSelectedInput}
          handleSendMessage={sendMessage}
          chatId={id}
        />
        <View style={{flex: 1,backgroundColor:white}}>
          <Header
            centerElement={courseTitle}
            leftHandler={navigation.goBack}
            rightHandler={() => appStackNavigate(navigation, 'chatSettings')}
          />
          <ChatDisplay
            myUserId={myUserId}
            messages={messages}
            messagemap={{}}
            setSelectedInput={setSelectedInput}
          />
        </View>
      </KeyboardAvoidingView>
    </Loading>
  );
}
