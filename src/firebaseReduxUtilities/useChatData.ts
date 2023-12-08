import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {useEffect} from 'react';
import {joinChatAction, leaveChatAction} from '../redux/actions';
import {getUserDocumentRef} from './useUserData';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';

const getChatDocumentRef = (courseId: string) =>
  firestore().collection('chats').doc(courseId);

const joinCourseChat = async (courseId: string) => {
  const myUserId = store.getState().data.myUserId;
  let chatToSet: Chat;
  const chatDocumentRef = getChatDocumentRef(courseId);
  const myUserDocumentRef = getUserDocumentRef(myUserId);

  const chatDocSnapshot = await chatDocumentRef.get();
  if (chatDocSnapshot.exists) {
    const data = chatDocSnapshot.data() as Chat;
    data.memberIds.push(myUserId);
    chatToSet = data;
    chatDocumentRef.update({memberIds: data.memberIds});
  } else {
    chatToSet = {
      memberIds: [myUserId],
      messages: [],
      messagemap: {},
    };
    await chatDocumentRef.set(chatToSet);
  }
  const userDocSnapshot = await myUserDocumentRef.get();
  const user = userDocSnapshot.data() as User;
  const chatsToSet = user.chats ?? [];
  chatsToSet.push(courseId);
  await myUserDocumentRef.update({chats: chatsToSet});
  store.dispatch(joinChatAction({id: courseId, chat: chatToSet}));
};

const leaveCourseChat = async (courseId: string) => {
  const myUserId = store.getState().data.myUserId;
  const chatDocumentRef = getChatDocumentRef(courseId);
  const myUserDocumentRef = getUserDocumentRef(myUserId);

  const chatDocSnapshot = await chatDocumentRef.get();
  const data = chatDocSnapshot.data() as Chat;
  data.memberIds = data.memberIds.filter(id => id !== myUserId);
  await chatDocumentRef.update({memberIds: data.memberIds});

  const userDocSnapshot = await myUserDocumentRef.get();
  const user = userDocSnapshot.data() as User;
  var chatsToSet = user.chats ?? [];
  chatsToSet = chatsToSet.filter(id => id !== courseId);
  await myUserDocumentRef.update({chats: chatsToSet});
  store.dispatch(leaveChatAction({id: courseId}));
};

const handleSendMessage = async (message: Message, chatId: string) => {
  try {
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(message);
  } catch (error) {
    console.error('Error sending message: ', error);
  }
};

const handleSendTextMessage = async (
  text: string,
  myUserId: string,
  chatId: string,
) => {
  const message: Message = {
    type: 'text',
    fromUserId: myUserId,
    content: {text},
    createdAt: new Date(),
  };
  return handleSendMessage(message, chatId);
};

const handleMessagesUpdate = (chatId: string, messages: Message[]) => {};
const handleMemberIdsUpdate = (chatId: string, memberIds: string[]) => {};

export default function useChatData() {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId].chats,
  );
  useEffect(() => {
    const subscrions: (() => void)[] = [];
    if (!chats) return;

    chats.forEach((chatId: string) => {
      const ref = getChatDocumentRef(chatId);
      const messagesSubscription = ref
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const messages = snapshot.docs.map(
            doc =>
              ({
                ...doc.data(),
              } as Message),
          );
          handleMessagesUpdate(chatId, messages);
        });
      const memberIdsSubscription = ref
        .collection('memberIds')
        .onSnapshot(snapshot => {
          // const memberIds = snapshot.docs.map(
          //   doc =>
          //     ({
          //       ...doc.data(),
          //     } as string),
          // );
          // handleMemberIdsUpdate(chatId, memberIds);
        });
    });

    return () => subscrions.forEach(unsubscribe => unsubscribe());
  }, [chats]);

  return {};
}

export {
  getChatDocumentRef,
  joinCourseChat,
  leaveCourseChat,
  handleSendTextMessage,
};
