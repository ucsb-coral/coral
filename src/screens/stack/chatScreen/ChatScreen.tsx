import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';

import Loading from '../../../components/Loading';
import {useSelector} from 'react-redux';
import {coursemap} from '../../../redux/dummyData';
import Header from '../../../components/header/Header';
import InputFooter from './components/inputFooter/InputFooter';
import ChatDisplay from './components/chatDisplay/ChatDisplay';
import {styles} from './ChatScreenStyles';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export type ChatScreenProps = {
  id: string;
};

export default function ChatScreen({
  route,
  navigation,
}: AppStackPageProps<'chat'>) {
  const {id} = route.params;
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

  // console.log('myUserId:', myUserId);

  const sendMessage = async () => {
    if (message.trim().length === 0) {
      // check if message is empty
      return;
    }

    try {
      await firestore().collection('chats').doc(id).collection('messages').add({
        type: 'TEXT',
        fromUserId: myUserId, // TODO: need to change to user name
        content: message,
        createdAt: firestore.FieldValue.serverTimestamp(),
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
        setMessages(messages);
        flatListRef.current?.scrollToEnd({animated: true});
      });

    return () => unsubscribe(); // unsubscribe when unmount
  }, [id]);

  console.log('messages:', messages);

  return (
    <Loading isReady={!!chat}>
      <KeyboardAvoidingView
        style={{flex: 1, display: 'flex', flexDirection: 'column-reverse'}}>
        <InputFooter
          message={message}
          setMessage={setMessage}
          selectedInput={selectedInput}
          setSelectedInput={setSelectedInput}
          handleSendMessage={sendMessage}
        />
        {/* Input Area */}
        {/* <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={messageText}
            onChangeText={Text => setMessageText(Text)}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Text style={styles.sendButton}>Send</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{flex: 1}}>
          <Header centerElement={courseTitle} leftHandler={navigation.goBack} />
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
