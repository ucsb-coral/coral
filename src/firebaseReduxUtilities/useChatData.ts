import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {useEffect} from 'react';
import {
  editUsersAction,
  joinChatAction,
  leaveChatAction,
  newMessagesAction,
} from '../redux/actions';
import {getUserDocumentRef} from './useUserData';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';

const getChatDocumentRef = (courseId: string) =>
  firestore().collection('chats').doc(courseId);

const joinCourseChat = async (courseId: string) => {
  console.log('afadfaf');
  const myUserId = store.getState().data.myUserId;
  const chatDocumentRef = getChatDocumentRef(courseId);
  const myUserDocumentRef = getUserDocumentRef(myUserId);
  await chatDocumentRef.collection('memberIds').doc(myUserId).set({});
  const userDocSnapshot = await myUserDocumentRef.get();
  const user = userDocSnapshot.data() as User;
  const chatsToSet = user.chats ?? [];
  chatsToSet.push(courseId);
  await myUserDocumentRef.update({chats: chatsToSet});
  store.dispatch(joinChatAction({id: courseId}));
};

const leaveCourseChat = async (courseId: string) => {
  const myUserId = store.getState().data.myUserId;
  const chatDocumentRef = getChatDocumentRef(courseId);
  const myUserDocumentRef = getUserDocumentRef(myUserId);
  await chatDocumentRef.collection('memberIds').doc(myUserId).delete();
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

const handleSendMediaMessage = async (
  type: 'image' | 'video',
  myUserId: string,
  url: string,
  chatId: string,
) => {
  const message: Message = {
    type,
    fromUserId: myUserId,
    content: {
      url,
    },
    createdAt: new Date(),
  };
  return handleSendMessage(message, chatId);
};

const handleSendFileMessage = async (
  myUserId: string,
  url: string,
  fileName: string,
  chatId: string,
) => {
  const message: Message = {
    type: 'file',
    fromUserId: myUserId,
    content: {
      url,
      fileName,
    },
    createdAt: new Date(),
  };
  return handleSendMessage(message, chatId);
};

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
          const messageMap: Messagemap = {};
          const messages = snapshot.docs.map(doc => {
            const id = doc.id;
            const data = doc.data() as Message;
            messageMap[id] = data;
            return id;
          });
          store.dispatch(
            newMessagesAction({
              chatId,
              messages,
              messageMap,
            }),
          );
        });
      const memberIdsSubscription = ref
        .collection('memberIds')
        .onSnapshot(snapshot => {
          console.log('WEFVEWF', chatId, snapshot.docChanges());
          const userPromises: Promise<void>[] = [];
          const usermapToSet: Usermap = {};
          snapshot
            .docChanges()
            .filter(
              docChange =>
                docChange.type !== 'removed' && docChange.doc.id !== myUserId,
            )
            .forEach(docChange => {
              console.log('WEFVEWF');
              const id = docChange.doc.id;
              const add = async () => {
                const userRef = getUserDocumentRef(id);
                const data = (await userRef.get()).data() as User;
                usermapToSet[id] = data;
              };
              userPromises.push(add());
            });
          Promise.all(userPromises).then(() =>
            store.dispatch(
              editUsersAction({
                data: usermapToSet,
              }),
            ),
          );
        });
      subscrions.push(messagesSubscription);
      subscrions.push(memberIdsSubscription);
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
  handleSendMediaMessage,
  handleSendFileMessage,
};
