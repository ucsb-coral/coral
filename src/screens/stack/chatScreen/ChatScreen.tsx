import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, KeyboardAvoidingView} from 'react-native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import Loading from '../../../components/Loading';
import {useSelector} from 'react-redux';
import Header from '../../../components/header/Header';
import InputFooter from './components/inputFooter/InputFooter';
import ChatDisplay from './components/chatDisplay/ChatDisplay';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {styles} from './ChatScreenStyles';
import {black, white} from '../../../utilities/colors';
import {handleSendTextMessage} from '../../../firebaseReduxUtilities/useChatData';

export type ChatScreenProps = {
  id: string;
};

export default function ChatScreen({
  route,
  navigation,
}: AppStackPageProps<'chat'>) {
  const {id} = route.params;
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chat = useSelector((state: ReduxState) => state.data.chatmap[id]);
  const {messages, messagemap} = chat ?? {};
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);
  const usermap = useSelector((state: ReduxState) => state.data.usermap);
  const [message, setMessage] = useState<string>('');
  const [selectedInput, setSelectedInput] = useState<string>('');
  const courseTitle = coursemap[id].courseId;

  const sendTextMessage = async () => {
    const messageToSend = message.trim();
    if (message.trim().length === 0) {
      // check if message is empty
      return;
    }
    handleSendTextMessage(messageToSend, myUserId, id);
    setMessage(''); // clear message input when message is sent
  };

  return (
    <Loading isReady={!!chat}>
      <KeyboardAvoidingView
        style={{flex: 1, display: 'flex', flexDirection: 'column-reverse'}}>
        <InputFooter
          message={message}
          setMessage={setMessage}
          selectedInput={selectedInput}
          setSelectedInput={setSelectedInput}
          handleSendMessage={sendTextMessage}
          chatId={id}
        />
        <View style={{flex: 1, backgroundColor: white}}>
          <Header
            centerElement={courseTitle}
            leftHandler={navigation.goBack}
            rightHandler={() =>
              appStackNavigate(navigation, 'chatSettings', {id})
            }
          />
          <ChatDisplay
            myUserId={myUserId}
            messages={messages}
            messagemap={messagemap}
            setSelectedInput={setSelectedInput}
            usermap={usermap}
          />
        </View>
      </KeyboardAvoidingView>
    </Loading>
  );
}
