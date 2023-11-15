import React from 'react';
import { View, Text, Dimensions, StyleSheet, Pressable, PixelRatio, TouchableOpacity, ScrollView } from 'react-native';
import {
    white,
    red,
    black,
    grey,
    coral,
    lightGrey,
    darkGrey,
    GreyUseForButton,
    ButtonBackground,
} from '../../../utilities/colors';
import {
    buttonFont,
    NameFont,
    EmailFont,
} from "../../../utilities/textfont";

const DEVICEPIXELRATIO = PixelRatio.get();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    joinButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingVertical: 5,
        paddingHorizontal: 17,
        backgroundColor: coral,
        borderRadius: 45,
        width: PixelRatio.getPixelSizeForLayoutSize(81 / DEVICEPIXELRATIO),
        height: PixelRatio.getPixelSizeForLayoutSize(32 / DEVICEPIXELRATIO),
    },
    joinButtonText: {
        color: white,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    header: {
        height: 50,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 23,
        color: coral,
        fontWeight: '700',
        fontFamily: NameFont
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
        marginBottom: 10
    },
    category: {
        fontSize: 20,
        color: darkGrey,
        marginBottom: 5,
        fontWeight: '600',
        fontFamily: NameFont,
    },
    chatName: {
        fontSize: 18,
        color: darkGrey,
        marginBottom: 5,
        fontWeight: '600',
        fontFamily: NameFont,
    },
    chatMessage: {
        fontSize: 12,
        color: lightGrey
    },
    bottomBar: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
        backgroundColor: white
    },
});