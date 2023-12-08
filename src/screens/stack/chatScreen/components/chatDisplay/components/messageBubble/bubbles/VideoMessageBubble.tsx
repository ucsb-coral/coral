import React, {useState, useEffect, useRef, ReactNode} from 'react';
import MessageBubbleWrapper, {
  MessageBubbleWrapperProps,
} from '../MessageBubbleWrapper';
import {Text} from 'react-native';
import {black} from '../../../../../../../../utilities/colors';
import Video, {ResizeMode, VideoRef} from 'react-native-video';

const MAX_WIDTH = 200; // if image width is greater than this, scale down

export type Props = MessageBubbleWrapperProps & MediaMessageContent;
// fileName not used yet
export default function VideoMessageBubble({url, ...rest}: Props) {
  const [height, setHeight] = useState(MAX_WIDTH * (9 / 16));
  const videoRef = useRef<VideoRef>(null);

  return (
    <MessageBubbleWrapper {...rest}>
      <Video
        source={{uri: url}}
        ref={videoRef}
        style={{width: MAX_WIDTH, height: MAX_WIDTH * (9 / 16)}}
        resizeMode={'contain' as ResizeMode}
        controls={true}
        paused={true}
      />
    </MessageBubbleWrapper>
  );
}
