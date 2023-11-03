import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {setMyUserAction} from '../redux/actions';

const getUserDocumentRef = (userId: string) =>
  firestore().collection('users').doc(userId);

const setMyUserFirebaseRedux = async (id: string, user: User) => {
  let userToSet: User = user;
  const myUserDocumentRef = getUserDocumentRef(id);

  const userDocSnapshot = await myUserDocumentRef.get();
  if (userDocSnapshot.exists) {
    const data = userDocSnapshot.data();
    if (data) userToSet = data as User;
  } else await myUserDocumentRef.set(user);
  store.dispatch(setMyUserAction({id, user: userToSet}));
};

export default function useUserData() {
  return {};
}

export {getUserDocumentRef, setMyUserFirebaseRedux};
