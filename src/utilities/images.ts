import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';

const uploadImage = async (url: string, pathToFile: string) => {
  try {
    if (!url) throw new Error('No or blank image URL provided.');
    const uploadTimestamp = new Date().toISOString();
    const reference = storage().ref(pathToFile);
    const metadata = {
      contentType: 'image/jpg',
      customMetadata: {
        type: 'IMAGE',
        createdAt: uploadTimestamp,
      },
    };
    await reference.putFile(url, metadata);
    const downloadURL = await reference.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Upload failed', error);
    return null;
  }
};

const getImagePermission = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert(
      'Permission Required',
      'You need to allow access to your photos to upload an image.',
    );
    return;
  }
};

const pickSquareImage = async () => {
  getImagePermission();
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1.0,
    allowsEditing: true,
    aspect: [4, 4],
  });
  if (pickerResult.canceled) return null;
  return pickerResult.assets?.[0]?.uri ?? null;
};

export {pickSquareImage, uploadImage};
