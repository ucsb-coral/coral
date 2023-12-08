import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Video, {VideoRef, ResizeMode} from 'react-native-video';
import {styles} from '../../../../ChatScreenStyles';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../../../../../utilities/scale';
import {black} from '../../../../../../../utilities/colors';
import firestore from '@react-native-firebase/firestore';

export type Props = Message & {
  myUserId: string;
};
// fileName not used yet
export default function MessageBubble({
  myUserId,
  fromUserName,
  fromUserId,
  content,
  type,
  contentURL,
  fileName,
}: Props) {
  // const userName = useSelector((state: ReduxState) => state.data.usermap[myUserId!]);
  const MAX_WIDTH = 200; // if image width is greater than this, scale down
  const MAX_HEIGHT = 200; // otherwise, the image will be too big and the layout will be messed up
  const [imageSize, setImageSize] = useState({width: 0, height: 0});
  const [isImageViewVisible, setImageViewVisible] = useState(false);
  const handleImagePress = () => {
    setImageViewVisible(true);
  };
  //const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState(0);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(fromUserId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData) {
            setStatus(userData.status);
          }
        }
      });
    return () => unsubscribe();
  }, [myUserId]);

  const handleFilePressToDownload = () => {
    console.log(contentURL);
    Alert.alert(
      'Download File',
      'Do you want to download this file?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: () => downloadFile(contentURL as string, fileName as string), // using 'as string' to avoid type error
        },
      ],
      {cancelable: true},
    );
  };

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

  const videoRef = useRef<VideoRef>(null);
  useEffect(() => {
    if (type === 'IMAGE' && contentURL) {
      Image.getSize(
        contentURL,
        (width, height) => {
          let newWidth, newHeight;
          if (width > height) {
            newWidth = Math.min(width, MAX_WIDTH);
            newHeight = (height / width) * newWidth;
          } else {
            newHeight = Math.min(height, MAX_HEIGHT);
            newWidth = (width / height) * newHeight;
          }
          setImageSize({width: newWidth, height: newHeight});
        },
        error => {
          console.error('Failed to load image', error);
        },
      );
    } else if (type === 'VIDEO' && contentURL) {
      const videoWidth = MAX_WIDTH;
      const videoHeight = videoWidth * (9 / 16);
      setImageSize({width: videoWidth, height: videoHeight});
    }
  }, [contentURL, type]);
  return (
    <View style={[styles.messageBlock]}>
      <View
        style={
          fromUserId === myUserId
            ? styles.myUserNameAndIconContainer
            : styles.otherUserNameAndIconContainer
        }>
        {fromUserId !== myUserId && (
          <Ionicons
            name={
              status === 0
                ? 'book-outline'
                : status === 1
                ? 'bed-outline'
                : status === 2
                ? 'fast-food-outline'
                : status === 3
                ? 'airplane-outline'
                : status === 4
                ? 'barbell-outline'
                : 'musical-notes-outline'
            }
            size={scale(20)}
            color={black}
            style={{marginRight: 5}}
          />
        )}
        <Text
          style={
            fromUserId === myUserId ? styles.mySenderId : styles.otherSenderId
          }>
          {fromUserName}
        </Text>
        {fromUserId === myUserId && (
          <Ionicons
            name={
              status === 0
                ? 'book-outline'
                : status === 1
                ? 'bed-outline'
                : status === 2
                ? 'fast-food-outline'
                : status === 3
                ? 'airplane-outline'
                : status === 4
                ? 'barbell-outline'
                : 'musical-notes-outline'
            }
            size={scale(20)}
            color={black}
            style={{marginLeft: 5}}
          />
        )}
      </View>
      <View
        style={
          fromUserId === myUserId
            ? styles.myMessageContainer
            : styles.otherMessageContainer
        }>
        {type === 'TEXT' && <Text style={styles.message}>{content}</Text>}
        {/* {type === 'IMAGE' && <Image source={{ uri: contentURL }} style={{ width: imageSize.width, height: imageSize.height }} />} */}
        {type === 'IMAGE' && (
          <TouchableWithoutFeedback onPress={handleImagePress}>
            <Image
              source={{uri: contentURL}}
              style={{width: imageSize.width, height: imageSize.height}}
            />
          </TouchableWithoutFeedback>
        )}
        {type === 'VIDEO' && contentURL && (
          <Video
            source={{uri: contentURL}}
            ref={videoRef}
            style={{width: imageSize.width, height: imageSize.height}}
            resizeMode={'contain' as ResizeMode} // resizeMode= {"cover" as ResizeMode}
            controls={true}
            paused={true}
          />
        )}
        {type === 'FILE' && contentURL && (
          <TouchableOpacity onPress={handleFilePressToDownload}>
            <View style={styles.fileContainer}>
              <Feather name="file" size={24} color="black" />
              <Text style={{marginLeft: 10}}>{fileName}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        visible={isImageViewVisible}
        transparent={true}
        onRequestClose={() => setImageViewVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setImageViewVisible(false)}>
          <View style={styles.fullScreenContainer}>
            <Image
              source={{uri: contentURL}}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    // </View>
  );
}
