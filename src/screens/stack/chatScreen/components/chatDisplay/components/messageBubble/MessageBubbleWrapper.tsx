import React, {useState, useEffect, useRef, ReactNode} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../../../ChatScreenStyles';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../../../../../utilities/scale';
import {black} from '../../../../../../../utilities/colors';
import {getStatusIcon} from '../../../../../../../utilities/status';

export type MessageBubbleWrapperProps = {
  isMyMessage: boolean;
  fromUser: User;
};
// fileName not used yet
export default function MessageBubbleWrapper({
  isMyMessage,
  fromUser,
  children,
}: MessageBubbleWrapperProps & {children: ReactNode}) {
  const {status, lastName, firstName, preferredName} = fromUser ?? {};
  const displayName = preferredName ?? `${firstName} ${lastName}`;
  const statusIcon = getStatusIcon(status);

  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
        }}>
        {!isMyMessage && (
          <Ionicons
            name={statusIcon}
            size={scale(20)}
            color={black}
            style={{marginRight: 5}}
          />
        )}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 12,
            color: black,
            marginBottom: 2,
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
          }}>
          {displayName}
        </Text>
        {isMyMessage && (
          <Ionicons
            name={statusIcon}
            size={scale(20)}
            color={black}
            style={{marginLeft: 5}}
          />
        )}
      </View>
      <View
        style={{
          ...(isMyMessage
            ? styles.myMessageContainer
            : styles.otherMessageContainer),
          ...{overflow: 'hidden'},
        }}>
        {children}
      </View>
    </View>
  );
}
