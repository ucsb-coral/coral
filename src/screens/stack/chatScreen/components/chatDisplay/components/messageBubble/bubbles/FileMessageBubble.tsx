import React, {useState, useEffect, useRef, ReactNode} from 'react';
import MessageBubbleWrapper, {
  MessageBubbleWrapperProps,
} from '../MessageBubbleWrapper';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {black, grey5, white} from '../../../../../../../../utilities/colors';
import {downloadFile} from '../../../../../../../../utilities/files';

export type Props = MessageBubbleWrapperProps & FileMessageContent;
// fileName not used yet
export default function FileMessageBubble({url, fileName, ...rest}: Props) {
  const handleFilePressToDownload = () => {
    Alert.alert(
      'Download File',
      'Do you want to download this file?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: () => downloadFile(url, fileName), // using 'as string' to avoid type error
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <MessageBubbleWrapper {...rest}>
      <TouchableOpacity onPress={handleFilePressToDownload}>
        <View
          style={{
            backgroundColor: white,
            borderWidth: 1,
            borderColor: grey5,
            borderRadius: 15,
            padding: 10,
            maxWidth: '99%',
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            shadowColor: black,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}>
          <Feather name="file" size={24} color="black" />
          <Text style={{marginLeft: 10}}>{fileName}</Text>
        </View>
      </TouchableOpacity>
    </MessageBubbleWrapper>
  );
}
