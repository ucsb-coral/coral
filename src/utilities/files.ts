import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';

const downloadFile = async (url: string, name: string) => {
  const decodedUrl = decodeURIComponent(url);
  const fileName = decodedUrl.substring(
    decodedUrl.lastIndexOf('/') + 1,
    decodedUrl.indexOf('?'),
  );
  if (!fileName) {
    console.error('No file name found in URL');
    // show a Alert here
    Alert.alert(
      'No file name found in URL',
      'Please contact developer for help.',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
    return;
  }
  console.log('File name extracted from URL:', fileName);

  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download files',
          buttonPositive: 'OK',
        },
      );
      // if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      //   console.error('Storage permission denied');
      //   return;
      // }
    }
    const coralDir = `${RNFS.DownloadDirectoryPath}/Coral`;
    try {
      const folderExists = await RNFS.exists(coralDir);
      if (!folderExists) {
        await RNFS.mkdir(coralDir);
      }
    } catch (error) {
      console.error('Error creating directory:', error);
    }
    const localFilePath = `${RNFS.DownloadDirectoryPath}/Coral/${fileName}`;

    const res = await RNFS.downloadFile({
      fromUrl: url,
      toFile: localFilePath,
    }).promise;

    console.log('File downloaded to:', localFilePath);
  } catch (error) {
    console.error('Download error:', error);
  }
};

export {downloadFile};
