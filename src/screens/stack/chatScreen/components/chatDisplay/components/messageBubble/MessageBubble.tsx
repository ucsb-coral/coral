import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import Video, { VideoRef, ResizeMode } from 'react-native-video';
import { styles } from '../../../../ChatScreenStyles';
// import { red } from '../../../../../../../utilities/colors';
// import { useSelector } from 'react-redux';
export type Props = Message & {
  myUserId: string;
};

export default function MessageBubble({ myUserId, fromUserName, fromUserId, content, type, contentURL }: Props) {
  // const userName = useSelector((state: ReduxState) => state.data.usermap[myUserId!]);
  const MAX_WIDTH = 200; // if image width is greater than this, scale down
  const MAX_HEIGHT = 200; // otherwise, the image will be too big and the layout will be messed up
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isImageViewVisible, setImageViewVisible] = useState(false);
  const handleImagePress = () => {
    setImageViewVisible(true);
  };
  const videoRef = useRef<VideoRef>(null);
  useEffect(() => {
    if (type === 'IMAGE' && contentURL) {
      Image.getSize(contentURL, (width, height) => {
        let newWidth, newHeight;
        if (width > height) {
          newWidth = Math.min(width, MAX_WIDTH);
          newHeight = (height / width) * newWidth;
        } else {
          newHeight = Math.min(height, MAX_HEIGHT);
          newWidth = (width / height) * newHeight;
        }
        setImageSize({ width: newWidth, height: newHeight });
      }, (error) => {
        console.error('Failed to load image', error);
      });
    }
    else if (type === 'VIDEO' && contentURL) {
      const videoWidth = MAX_WIDTH;
      const videoHeight = videoWidth * (9 / 16);
      setImageSize({ width: videoWidth, height: videoHeight });
    }
  }, [contentURL, type]);
  return (
    <View style={[styles.messageBlock]}>
      <Text style={fromUserId === myUserId ? styles.mySenderId : styles.otherSenderId}>
        {fromUserName}
      </Text>
      <View style={fromUserId === myUserId ? styles.myMessageContainer : styles.otherMessageContainer}>
        {type === 'TEXT' && <Text style={styles.message}>{content}</Text>}
        {/* {type === 'IMAGE' && <Image source={{ uri: contentURL }} style={{ width: imageSize.width, height: imageSize.height }} />} */}
        {type === 'IMAGE' && (
          <TouchableWithoutFeedback onPress={handleImagePress}>
            <Image
              source={{ uri: contentURL }}
              style={{ width: imageSize.width, height: imageSize.height }}
            />
          </TouchableWithoutFeedback>
        )}
        {type === 'VIDEO' && contentURL && (
          <Video
            source={{ uri: contentURL }}
            ref={videoRef}
            style={{ width: imageSize.width, height: imageSize.height }}
            resizeMode={"contain" as ResizeMode} // resizeMode= {"cover" as ResizeMode}
            controls={true}
            paused={true}
          />
        )}
      </View>
      <Modal
        visible={isImageViewVisible}
        transparent={true}
        onRequestClose={() => setImageViewVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setImageViewVisible(false)}>
          <View style={styles.fullScreenContainer}>
            <Image
              source={{ uri: contentURL }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
