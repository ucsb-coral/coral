import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {useEffect} from 'react';
import {joinChatAction, setMyUserAction} from '../redux/actions';

const joinCourseChat = async (courseId: string) => {
  const id = `crs${courseId}`;
  const myUserId = store.getState().data.myUserId;
  let chatToSet: Chat;
  firestore()
    .collection('chats')
    .doc(id)
    .get()
    .then(async docSnapshot => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data() as Chat;
        data.memberIds.push(myUserId);
        chatToSet = data;
      } else {
        chatToSet = {
          memberIds: [myUserId],
          messages: [],
        };
        await firestore().collection('chats').doc(id).set(chatToSet);
      }
      firestore()
        .collection('users')
        .doc(myUserId)
        .get()
        .then(docSnapshot => {
          const user = docSnapshot.data() as User;
          if (!user.chats) user.chats = [];
          user.chats.push(id);
          firestore().collection('users').doc(myUserId).set(user);
        });
      store.dispatch(joinChatAction({id, chat: chatToSet}));
    });
};

export default function useChatData() {
  useEffect(() => {});
  return {};
}

export {joinCourseChat};
