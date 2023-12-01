import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Image, Pressable, TextInput, View, Alert } from 'react-native';
import { sendPng, sendDisabledPng } from '../../../../../assets/pngs/send';
import plusPng from '../../../../../assets/pngs/plus';
import { scale, standardMargin } from '../../../../../utilities/scale';
import useCustomActionSheet from '../../../../../utilities/useCustomActionSheet';
import {
  black, coral, grey0, grey3, lightGrey, opacity, white,
} from '../../../../../utilities/colors';
import InputFooterButton from './components/InputFooterButton';
import { platform } from '../../../../../utilities/platform';

import { useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
// import RNFS from 'react-native-fs';

export type Props = {
  message: string;
  setMessage: (message: string) => void;
  selectedInput: string;
  setSelectedInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  chatId: string;
};

export const INPUT_FOOTER_NAME = 'chatInputFooter';
const BASE_HEIGHT = scale(54);

export default function InputFooter({
  message,
  setMessage,
  selectedInput,
  setSelectedInput,
  handleSendMessage,
  chatId
}: Props) {
  const { showCustomActionSheet } = useCustomActionSheet();
  const inputRef = useRef<TextInput | null>(null);
  const MAX_BASE_HEIGHT = BASE_HEIGHT * 2.5;
  const INPUT_LINE_HEIGHT = BASE_HEIGHT * 0.32;
  const INPUT_PADDING_VERTICAL = INPUT_LINE_HEIGHT * 0.56;
  const INPUT_MARGIN_VERTICAL = INPUT_LINE_HEIGHT * 0.45;
  const INPUT_PADDING_SIDE = INPUT_LINE_HEIGHT * 0.64;
  const SIDE_PADDING = standardMargin;
  const PADDING = SIDE_PADDING / 2;
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const userName = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );

  const uploadImage = async (sourceURL: string, type: string) => {
    if (sourceURL === '') {
      return;
    }
    let fileName = '';
    let contentType = '';
    if (type === 'IMAGE') {
      console.log('uploading image');
      fileName = `${myUserId}/${Date.now()}.jpg`;  // change this later if there is a better way to name/store files
      contentType = 'image/jpg';
    }
    else if (type === 'VIDEO') {
      console.log('uploading video');
      fileName = `${myUserId}/${Date.now()}.mp4`;  // change this later if there is a better way to name/store files
      contentType = 'video/mp4';
    }
    try {
      // it works for now, but it could work better using `async/await` or `Promise.then()`
      // console.log(fileName);
      const uploadTimestamp = new Date().toISOString();
      const reference = storage().ref(fileName);
      const metadata = {
        contentType: contentType,
        customMetadata: {
          type: type,
          fromUserName: userName?.firstName + ' ' + userName?.lastName,
          fromUserId: myUserId,
          createdAt: uploadTimestamp,
        },
      };
      await reference.putFile(sourceURL, metadata);
      const downloadURL = await reference.getDownloadURL();
      console.log('File available at', downloadURL);
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          type: type,
          fromUserName: userName?.firstName + ' ' + userName?.lastName,
          fromUserId: myUserId,
          contentURL: downloadURL,
          createdAt: uploadTimestamp,
        });
    } catch (error) {
      console.error('Upload failed', error);
    }
    // ---------------------------------------------------------------------------------------------
    // above code is working on android, but not test on ios, if that is not working, try the following code
    // code might need to change for ios
    // const imageUri = pickerResult.uri; //bug report here: https://github.com/expo/expo/issues/6407
    // const localFilePath = `${RNFS.TemporaryDirectoryPath}${Date.now()}.jpg`; // generate a temporary file path
    // console.log(localFilePath);
    // try {
    //   await RNFS.copyFile(imageUri, localFilePath); // copy image to file path
    //   console.log(imageUri);

    //   const fileName = `${Date.now()}.jpg`; // change this later if there is a better way to name/store files
    //   console.log(fileName);
    //   const reference = storage().ref(fileName);

    //   await reference.putFile(localFilePath);

    //   const downloadURL = await reference.getDownloadURL();
    //   console.log('File available at', downloadURL); // check if file is uploaded

    // } catch (error) {
    //   console.error('Upload failed', error);
    // } finally {
    //   if (await RNFS.exists(localFilePath)) {
    //     await RNFS.unlink(localFilePath);
    //   }
    // }
  };

  const handleTakePicture = async () => {
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermissionResult.granted) {
      Alert.alert("Camera Permission Required", "You need to allow access to your camera to take a picture.");
      return;
    }
    console.log('camera permission granted');
    const pictureResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1.0,
      // aspect: [4, 3],
    });
    if (pictureResult.canceled || !pictureResult.assets || pictureResult.assets.length === 0) {
      return;
    }
    const imageUri = pictureResult.assets[0].uri;
    // console.log(imageUri);
    uploadImage(imageUri, 'IMAGE');
  };

  const handleUploadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to your photos to upload an image.");
      return;
    }
    console.log('permission granted');
    // TODO: get the permission if not granted yet?
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1.0,
      allowsEditing: false,
      // aspect: [4, 4], // for cropper, and if the allowEditing is true
    });
    console.log(pickerResult);
    if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
      return;
    }
    const imageUri = pickerResult.assets[0].uri;
    // console.log(imageUri);
    uploadImage(imageUri, 'IMAGE');
  };

  const handleUploadVideo = async () => {
    // https://github.com/react-native-video/react-native-video
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to your photos to upload a video.");
      return;
    } const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1.0,
    });
    console.log(pickerResult);
    if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
      return;
    }
    const videoUri = pickerResult.assets[0].uri;
    uploadImage(videoUri, 'VIDEO');
  };

  const handleUploadFile = async () => { };

  const openPlusAlert = () =>
    showCustomActionSheet({
      options: [
        {
          title: 'Take a Photo',
          onPress: handleTakePicture,
        },
        {
          title: 'Upload an Image',
          onPress: handleUploadImage,
        },
        {
          title: 'Upload a Video',
          onPress: handleUploadVideo,
        },
        {
          title: 'Upload a File',
          onPress: handleUploadFile,
        },
      ],
    });

  useEffect(() => {
    if (selectedInput === '') inputRef?.current?.blur();
    else if (selectedInput === INPUT_FOOTER_NAME) {
      inputRef?.current?.focus();
    }
  }, [selectedInput]);

  return (
    <View style={{ backgroundColor: white }}>
      <Pressable
        onPress={() => setSelectedInput(INPUT_FOOTER_NAME)}
        style={{
          minHeight: BASE_HEIGHT,
          maxHeight: MAX_BASE_HEIGHT,
          width: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <InputFooterButton
            size={BASE_HEIGHT}
            paddingLeft={SIDE_PADDING}
            paddingRight={PADDING}
            onPress={openPlusAlert}>
            <Image
              source={plusPng}
              style={{ width: BASE_HEIGHT * 0.44, height: BASE_HEIGHT * 0.44 }}
            />
          </InputFooterButton>
          <View
            style={{
              backgroundColor: grey3,
              borderRadius: INPUT_LINE_HEIGHT + INPUT_PADDING_VERTICAL,
              flex: 1,
              paddingTop:
                platform === 'ios' ? INPUT_PADDING_VERTICAL : undefined,
              paddingBottom:
                platform === 'ios' ? INPUT_PADDING_VERTICAL : undefined,
              // paddingTop: INPUT_PADDING_VERTICAL,
              // paddingBottom: INPUT_PADDING_VERTICAL,
              paddingLeft: INPUT_PADDING_SIDE,
              paddingRight: INPUT_PADDING_SIDE,
              marginTop: INPUT_MARGIN_VERTICAL,
              marginBottom: INPUT_MARGIN_VERTICAL,
              overflow: 'hidden',
              maxHeight: MAX_BASE_HEIGHT - INPUT_PADDING_VERTICAL * 2,
            }}>
            <TextInput
              ref={inputRef}
              style={{
                fontSize: INPUT_LINE_HEIGHT,
                fontFamily: 'SFProTextRegular',
                color: black,
                paddingTop: platform === 'ios' ? 0 : undefined,
              }}
              selectionColor={coral}
              value={message}
              onChangeText={setMessage}
              returnKeyType="default"
              onFocus={() => setSelectedInput(INPUT_FOOTER_NAME)}
              placeholder={`Send a chat...`}
              placeholderTextColor={opacity(white, 0.8)}
              multiline
            />
          </View>
          <InputFooterButton
            size={BASE_HEIGHT}
            onPress={handleSendMessage}
            paddingLeft={PADDING}
            paddingRight={SIDE_PADDING}>
            <Image source={sendPng} style={{ height: BASE_HEIGHT * 0.44 }} />
          </InputFooterButton>
        </View>
      </Pressable>
    </View>
  );
}
