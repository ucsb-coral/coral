import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {useEffect} from 'react';
import {joinChatAction, setMyUserAction} from '../redux/actions';

const newChat = (title: string) =>
  ({
    title,
    memberIds: [],
    messages: [],
  } as Chat);

const joinCourseChat = async (course: Course) => {
  const {courseId, courseTitle} = course;
  const id = `crs${courseId}`;
  const myUserId = store.getState().data.myUserId;
  let chatToSet: Chat;
  firestore()
    .collection('chats')
    .doc(id)
    .get()
    .then(async docSnapshot => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (data) chatToSet = data as Chat;
      } else {
        chatToSet = newChat(courseTitle);
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
        });
      store.dispatch(joinChatAction({id, chat: chatToSet}));
    });
};

export default function useChatData() {
  useEffect(() => {});
  return {};
}

export {joinCourseChat};
