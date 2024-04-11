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
import {coral, white, black, opacity, grey0} from '../../../utilities/colors';
import {scale} from '../../../utilities/scale';
import {
  avenirBlackCentered,
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../utilities/textfont';
import Button from '../../../components/button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-paper';

export type ChatsScreenProps = EmptyProps;

type ChatsPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

export default function ChatsScreen({route, navigation}: ChatsPageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats ?? [],
  );
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);

  return (
    <View style={{flex: 1}}>
      <Header centerElement={'Chats'} />
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
            <Card
              style={{
                marginBottom: scale(16),
                padding: scale(14),
              }}>
              <Text
                style={{
                  fontFamily: sfProTextBold,
                  fontSize: 26,
                  color: black,
                  marginBottom: 4,
                }}>
                {coursemap[chatId]?.courseId || 'Unknown Chat'}
              </Text>
              {/* <Text
                style={{
                  fontFamily: sfProTextSemibold,
                  fontSize: 18,
                  color: grey0,
                  marginBottom: 8,
                }}>
                {coursemap[chatId]?.courseTitle}
              </Text> */}

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View style={{display: 'flex'}}>
                  <Text
                    style={{
                      fontFamily: sfProTextRegular,
                      fontSize: 14,
                      marginBottom: 4,
                      color: grey0,
                    }}>
                    {coursemap[chatId]?.courseTitle}
                  </Text>
                  {/* <Text
                    style={{
                      fontFamily: sfProTextRegular,
                      fontSize: 14,
                      marginBottom: 4,
                      color: grey0,
                    }}>
                    {'Efvwefvfev'}
                  </Text> */}
                </View>
                <Button
                  label={'Open Chat'}
                  style={{
                    alignSelf: 'flex-end',
                    backgroundColor: opacity(coral, 0.9),
                  }}
                  onPress={() =>
                    appStackNavigate(navigation, 'chat', {id: chatId})
                  }
                />
              </View>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
