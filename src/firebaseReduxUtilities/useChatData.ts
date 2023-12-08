import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {useEffect} from 'react';
import {joinChatAction, leaveCourseAction, setMyUserAction,
leaveChatAction} from '../redux/actions';
import {getUserDocumentRef} from './useUserData';

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
  if (!user.chats) user.chats = [];
  user.chats.push(courseId);
  await myUserDocumentRef.set(user);
  store.dispatch(joinChatAction({id: courseId, chat: chatToSet}));
};

const leaveCourseChat = async (courseId: string) => {
  const myUserId = store.getState().data.myUserId;
  const chatDocumentRef = getChatDocumentRef(courseId);
  const myUserDocumentRef = getUserDocumentRef(myUserId);

  const chatDocSnapshot = await chatDocumentRef.get();
  if (chatDocSnapshot.exists) {
    const data = chatDocSnapshot.data() as Chat;
    data.memberIds = data.memberIds.filter((id) => id !== myUserId);
    chatDocumentRef.update({memberIds: data.memberIds});
    store.dispatch(leaveChatAction({id: courseId, chat: data}));
  }
  const userDocSnapshot = await myUserDocumentRef.get();
  const user = userDocSnapshot.data() as User;
  if (!user.chats) user.chats = [];
  user.chats = user.chats.filter((id) => id !== courseId);
  await myUserDocumentRef.set(user);
  store.dispatch(setMyUserAction({id: myUserId, user}));
}


export default function useChatData() {
  useEffect(() => {});
  return {};
}

export {getChatDocumentRef, joinCourseChat,leaveCourseChat};
