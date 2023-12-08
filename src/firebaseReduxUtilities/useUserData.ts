import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {setMyUserAction, updateMyUserAction} from '../redux/actions';
import storage from '@react-native-firebase/storage';
import {uploadImage} from '../utilities/images';

export const getNextStatus = (status?: Status) => {
  switch (status) {
    case 'reading':
      return 'sleeping';
    case 'sleeping':
      return 'eating';
    case 'eating':
      return 'traveling';
    case 'traveling':
      return 'working_out';
    case 'working_out':
      return 'music';
    case 'music':
      return 'reading';
    default:
      return 'reading';
  }
};

const getUserDocumentRef = (userId: string) =>
  firestore().collection('users').doc(userId);

const updateMyUser = async (data: MutableUser) => {
  const myUserId = store.getState().data.myUserId;
  const myUserDocumentRef = getUserDocumentRef(myUserId);
  await myUserDocumentRef.update(data);
  store.dispatch(updateMyUserAction({data}));
};

var mutableUser: MutableUser = {};
var mutableUserBufferTimeout: NodeJS.Timeout | null = null;
var bufferMS = 2000;

const updateMyUserWithBuffer = async (data: MutableUser) => {
  if (mutableUserBufferTimeout) clearTimeout(mutableUserBufferTimeout);
  mutableUser = {...mutableUser, ...data};
  mutableUserBufferTimeout = setTimeout(() => {
    updateMyUser(mutableUser);
    mutableUserBufferTimeout = null;
    mutableUser = {};
  }, bufferMS);
};

const deleteOldUserImage = async (myUserId: string) => {
  // Retrieve the current profile picture URL from Firestore
  const currentUserDocRef = getUserDocumentRef(myUserId);
  const docSnapshot = await currentUserDocRef.get();
  const previousImageURL = docSnapshot?.data()?.photo;

  // Delete the previous image from Firebase Storage (if it exists)
  const googleusercontent = 'googleusercontent';
  if (previousImageURL.includes(googleusercontent)) return;
  if (previousImageURL) {
    const storageRef = storage().refFromURL(previousImageURL);
    await storageRef.delete();
  } else throw new Error('Error deleting previous profile image.');
};

const uploadUserImage = async (sourceUrl: string, myUserId: string) => {
  const fileName = `${myUserId}/${Date.now()}.jpg`;
  try {
    const url = await uploadImage(sourceUrl, fileName);
    return url;
  } catch (error) {
    console.error('Upload failed', error);
  }
};

const updateUserImage = async (url: string) => {
  const myUserId = store.getState().data.myUserId;
  try {
    await deleteOldUserImage(myUserId);
    const photo = await uploadUserImage(url, myUserId);
    if (photo) updateMyUser({photo});
    return photo;
  } catch (error) {
    console.error('Error updating user image', error);
  }
};

export {
  getUserDocumentRef,
  updateMyUser,
  updateMyUserWithBuffer,
  updateUserImage,
};
