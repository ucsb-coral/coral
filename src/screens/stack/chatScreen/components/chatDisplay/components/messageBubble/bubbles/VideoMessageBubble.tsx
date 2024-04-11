import React, { useState, useEffect, useRef, ReactNode } from 'react';
import MessageBubbleWrapper, {
  MessageBubbleWrapperProps,
} from '../MessageBubbleWrapper';
import { Text, Pressable, Modal, View, Platform } from 'react-native';
import { black } from '../../../../../../../../utilities/colors';
import Video, { ResizeMode, VideoRef } from 'react-native-video';
// @ts-ignore
import { VLCPlayer } from 'react-native-vlc-media-player';

const MAX_WIDTH = 200; // if image width is greater than this, scale down

export type Props = MessageBubbleWrapperProps & MediaMessageContent;
// fileName not used yet
export default function VideoMessageBubble({ url, ...rest }: Props) {
  const [height, setHeight] = useState(MAX_WIDTH * (9 / 16));
  const videoRef = useRef<VideoRef>(null);
  const [isVideoViewVisible, setVideoViewVisible] = useState(false);
  const handleVideoPress = () => {
    setVideoViewVisible(true);
  };
  return (
    <MessageBubbleWrapper {...rest}>
      {Platform.OS === 'android' ? (
        <Video
          source={{ uri: url }}
          ref={videoRef}
          style={{ width: MAX_WIDTH, height: MAX_WIDTH * (9 / 16) }}
          resizeMode={'contain' as ResizeMode}
          controls={true}
          paused={true}
        />
      ) : (
        <>
          <Pressable onPress={handleVideoPress}>
            <Text>Play Video</Text>
          </Pressable>
          <Modal
            visible={isVideoViewVisible}
            transparent={true}
            onRequestClose={() => setVideoViewVisible(false)}
            style={{ flex: 1 }}>
            <Pressable onPress={() => setVideoViewVisible(false)} style={{ flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center', alignItems: 'center' }}>
                <VLCPlayer
                  source={{ uri: url }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                  controls={true}
                  paused={true}
                />
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    </MessageBubbleWrapper>
  );
}
