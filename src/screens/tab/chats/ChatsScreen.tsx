import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {styles} from './ChatPageStyles';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import Header from '../../../components/header/Header';
import {Ionicons} from '@expo/vector-icons';
import {coral, white, black} from '../../../utilities/colors';
import {scale} from '../../../utilities/scale';
import {avenirBlackCentered} from '../../../utilities/textfont';
import Button from '../../../components/button/Button';

export type ChatsScreenProps = EmptyProps;

type ChatsPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

const joinButton = (
  <Button label="Join" rounded style={{height: scale(34), width: scale(72)}} />
);

export default function ChatsScreen({route, navigation}: ChatsPageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats ?? [],
  );
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);
  console.log('FDVWEFV', chats);
  return (
    <View style={{flex: 1, backgroundColor: white}}>
      <Header centerElement={'Chat List'} />
      {chats?.length === 0 ? (
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            fontFamily: avenirBlackCentered,
            fontSize: 20,
            color: black,
          }}>
          You have not joined any chats
        </Text>
      ) : (
        <ScrollView style={styles.CurrentClasschatList}>
          {chats.map(chatId => (
            <TouchableOpacity
              key={chatId}
              style={styles.chatItem}
              onPress={() =>
                appStackNavigate(navigation, 'chat', {id: chatId})
              }>
              <Text style={styles.chatName}>
                {coursemap[chatId]?.courseId || 'Unknown Chat'}
              </Text>
              <Ionicons
                name={'chevron-forward-outline'}
                size={scale(25)}
                color={black}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
