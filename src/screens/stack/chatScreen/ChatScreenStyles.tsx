import React from 'react';
import { View, Text, StyleSheet, Pressable, PixelRatio, TouchableOpacity, ScrollView } from 'react-native';
import {white,
    red,
    black,
    grey,
    coral,
    lightGrey,
    darkGrey,
    GreyUseForButton,
    ButtonBackground,
} from '../../../utilities/colors';
import{buttonFont,
   NameFont,
   EmailFont,
}from "../../../utilities/textfont";

const DEVICEPIXELRATIO = PixelRatio.get();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: coral,
    },
    backButton: {
        color: white,
        fontSize: 18,
    },
    headerText: {
        color: white,
        fontSize: 20,
        fontWeight: '700',
        fontFamily: NameFont,
    },
    messageList: {
        flex: 1,
        padding: 10,
    },
    message: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: ButtonBackground,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        backgroundColor: white,
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
    },
    sendButton: {
        color: coral,
        fontSize: 18,
        marginLeft: 10,
    },
});