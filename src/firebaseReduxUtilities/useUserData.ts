import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {setMyUserAction} from '../redux/actions';

const setMyUserFirebaseRedux = async (id: string, user: User) => {
  let userToSet: User = user;
  await firestore()
    .collection('users')
    .doc(id)
    .get()
    .then(docSnapshot => {
      console.log('asdvasdv', docSnapshot.data());
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (data) userToSet = data as User;
      } else firestore().collection('users').doc(id).set(user);
      store.dispatch(setMyUserAction({id, user: userToSet}));
    });
};

export default function useUserData() {
  return {};
}

export {setMyUserFirebaseRedux};
