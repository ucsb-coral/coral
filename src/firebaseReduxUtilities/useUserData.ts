import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {setMyUserAction} from '../redux/actions';

const setMyUserFirebaseRedux = async (id: string, user: User) => {
  store.dispatch(setMyUserAction({id, user}));
  await firestore().collection('users').doc(id).set(user);
};

export default function useUserData() {
  return {};
}

export {setMyUserFirebaseRedux};
