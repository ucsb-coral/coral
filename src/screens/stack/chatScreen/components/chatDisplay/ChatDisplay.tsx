import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  View,
} from 'react-native';
import {height} from '../../../../../utilities/scale';
import MessageBubble from './components/messageBubble/MessageBubbleWrapper';
import {
  red,
  lightGrey,
  grey0,
  grey1,
  grey2,
  grey3,
  grey4,
  grey5,
} from '../../../../../utilities/colors';
import TextMessageBubble from './components/messageBubble/bubbles/TextMessageBubble';
import ImageMessageBubble from './components/messageBubble/bubbles/ImageMessageBubble';
import VideoMessageBubble from './components/messageBubble/bubbles/VideoMessageBubble';
import FileMessageBubble from './components/messageBubble/bubbles/FileMessageBubble';

const emptyMap = {};
const SHOULD_PAGINATE_RATIO = 0.6;
const DURATION = 200;

export type Props = {
  myUserId: string;
  setSelectedInput: Dispatch<SetStateAction<string>>;
  messages: string[];
  messagemap: Messagemap;
  usermap: Usermap;
};

export default function ChatDisplay({
  myUserId,
  setSelectedInput,
  messages,
  messagemap,
  usermap,
}: Props) {
  const flatlistRef = useRef<FlatList | null>(null);

  const handleScreenPressIn = useCallback(() => setSelectedInput(''), []);

  const handleMessagePagination = async () => {};

  function renderItem({item, index}: {item: string; index: number}) {
    const {fromUserId, type, content} = messagemap[item];
    const fromUser = usermap[fromUserId];
    const isMyMessage = fromUserId === myUserId;
    const commonProps = {
      fromUser,
      isMyMessage,
    };
    console.log('dsasdasd', content);
    switch (type) {
      case 'text': {
        const props = {...commonProps, ...(content as TextMessageContent)};
        return <TextMessageBubble {...props} />;
      }
      case 'image': {
        const props = {...commonProps, ...(content as MediaMessageContent)};
        return <ImageMessageBubble {...props} />;
      }
      case 'video': {
        const props = {...commonProps, ...(content as MediaMessageContent)};
        return <VideoMessageBubble {...props} />;
      }
      case 'file': {
        const props = {...commonProps, ...(content as FileMessageContent)};
        return <FileMessageBubble {...props} />;
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <FlatList
        ref={flatlistRef}
        removeClippedSubviews={true}
        maxToRenderPerBatch={150}
        updateCellsBatchingPeriod={300}
        windowSize={41}
        scrollIndicatorInsets={{right: 1}}
        keyboardShouldPersistTaps={'handled'}
        scrollEventThrottle={250}
        overScrollMode={'never'}
        onScroll={() => {}}
        onContentSizeChange={() => {}}
        keyExtractor={(item: string, index: number) => {
          return item;
        }}
        data={messages}
        inverted
        keyboardDismissMode={'none'}
        renderItem={renderItem}
        bounces={false}
        style={{
          width: '100%',
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          flexGrow: 1,
        }}
      />
    </View>
  );
}
