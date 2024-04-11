import React, { useState, useEffect, useRef, ReactNode } from 'react';
import MessageBubbleWrapper, {
  MessageBubbleWrapperProps,
} from '../MessageBubbleWrapper';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { black } from '../../../../../../../../utilities/colors';

export type Props = MessageBubbleWrapperProps & MediaMessageContent;
// fileName not used yet
const MAX_WIDTH = 200; // if image width is greater than this, scale down
const MAX_HEIGHT = 200; // otherwise, the image will be too big and the layout will be messed up

export default function ImageMessageBubble({ url, ...rest }: Props) {
  const [isImageViewVisible, setImageViewVisible] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const handleImagePress = () => {
    // console.log('image pressed');
    setImageViewVisible(true);
  };

  useEffect(() => {
    Image.getSize(
      url,
      (width, height) => {
        let newWidth, newHeight;
        if (width > height) {
          newWidth = Math.min(width, MAX_WIDTH);
          newHeight = (height / width) * newWidth;
        } else {
          newHeight = Math.min(height, MAX_HEIGHT);
          newWidth = (width / height) * newHeight;
        }
        setImageSize({ width: newWidth, height: newHeight });
      },
      error => {
        console.error('Failed to load image', error);
      },
    );
  }, [url]);

  return (
    <>
      <MessageBubbleWrapper {...rest}>
        <Pressable onPress={handleImagePress}>
          <Image
            source={{ uri: url }}
            style={{ width: imageSize.width, height: imageSize.height }}
          />
        </Pressable>
      </MessageBubbleWrapper>
      <Modal
        visible={isImageViewVisible}
        transparent={true}
        onRequestClose={() => setImageViewVisible(false)}>
        <Pressable onPress={() => setImageViewVisible(false)} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
