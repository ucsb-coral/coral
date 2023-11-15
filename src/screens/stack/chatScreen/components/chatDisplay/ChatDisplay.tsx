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
import MessageBubble from './components/messageBubble/MessageBubble';

const emptyMap = {};
const SHOULD_PAGINATE_RATIO = 0.6;
const DURATION = 200;

export type Props = {
  myUserId: string;
  setSelectedInput: Dispatch<SetStateAction<string>>;
  messages: Message[];
  messagemap: Messagemap;
};

export default function ChatDisplay({
  myUserId,
  setSelectedInput,
  messages,
  messagemap,
}: Props) {
  const flatlistRef = useRef<FlatList | null>(null);

  const handleScreenPressIn = useCallback(() => setSelectedInput(''), []);

  const handleMessagePagination = async () => {};

  function renderItem({item, index}: {item: Message; index: number}) {
    // const message = messagemap[item];

    return <MessageBubble {...item} myUserId={myUserId} />;
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
        // maintainVisibleContentPosition={{
        //   minIndexForVisible: 0,
        //   autoscrollToTopThreshold: height / 4,
        // }}

        onContentSizeChange={() => {}}
        keyExtractor={(item: Message, index: number) => {
          return `${index}`;
        }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
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
