import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import { white, red, black, grey, coral, lightGrey, darkGrey, GreyUseForButton, ButtonBackground } from '../../../utilities/colors';
import { buttonFont, NameFont, EmailFont } from '../../../utilities/textfont';

const DEVICEPIXELRATIO = PixelRatio.get();

export const styles = StyleSheet.create({
    CommonAndMealButton: 
        {flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}
    ,
    joinButtonText: {
      color: white,
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
    header: {
      height: 50,
      backgroundColor: white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 23,
      color: coral,
      fontWeight: '700',
      fontFamily: NameFont,
    },
    CurrentClasschatList: {
      flex: 1,
      padding: 15,
      // height: screenHeight * 2 / 3,
    },
    chatItem: {
      backgroundColor: ButtonBackground,
      borderRadius: 15,
      padding: 15,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    category: {
      fontSize: 20,
      paddingLeft: 15,
      color: darkGrey,
      marginBottom: 5,
      fontWeight: '600',
      fontFamily: NameFont,
    },
    chatName: {
      fontSize: 18,
      color: black,
      marginBottom: 5,
      fontWeight: '700',
      fontFamily: NameFont,
    },
    chatMessage: {
      fontSize: 12,
      color: lightGrey,
    },
    bottomBar: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: '#D9D9D9',
      backgroundColor: white,
    },
  });
  