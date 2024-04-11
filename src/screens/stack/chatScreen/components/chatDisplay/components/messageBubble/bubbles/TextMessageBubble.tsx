import React, {useState, useEffect, useRef, ReactNode} from 'react';
import MessageBubbleWrapper, {
  MessageBubbleWrapperProps,
} from '../MessageBubbleWrapper';
import {Text} from 'react-native';
import {black} from '../../../../../../../../utilities/colors';

export type Props = MessageBubbleWrapperProps & TextMessageContent;
// fileName not used yet
export default function TextMessageBubble({text, ...rest}: Props) {
  return (
    <MessageBubbleWrapper {...rest}>
      <Text
        style={{
          fontSize: 14,
          color: black,
          paddingHorizontal: 10,
          paddingVertical: 7,
          borderRadius: 5,
        }}>
        {text}
      </Text>
    </MessageBubbleWrapper>
  );
}
