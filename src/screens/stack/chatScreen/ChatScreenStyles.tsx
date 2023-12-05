import React from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import {
    white, red, black, grey, coral,
    lightGrey, darkGrey, GreyUseForButton, ButtonBackground, grey5,
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
    // myMessage: {
    //     alignSelf: 'flex-end',
    //     backgroundColor: coral,
    // },

    // otherMessage: {
    //     alignSelf: 'flex-start',
    //     backgroundColor: 'lightgray',
    // },
    messageBlock: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
    },
    mySenderId: {
        fontWeight: 'bold',
        fontSize: 12,
        color: black,
        alignSelf: 'flex-end',
    },
    otherSenderId: {
        fontWeight: 'bold',
        fontSize: 12,
        color: black,
        alignSelf: 'flex-start',
    },
    myMessageContainer: {
        backgroundColor: ButtonBackground,
        borderRadius: 15,
        maxWidth: '90%',
        alignSelf: 'flex-end',
    },
    otherMessageContainer: {
        backgroundColor: grey5,
        borderWidth: 1,
        borderColor: grey5,
        borderRadius: 15,
        maxWidth: '90%',
        alignSelf: 'flex-start',
    },
    fileContainer: {
        backgroundColor: white,
        borderWidth: 1, 
        borderColor: grey5,
        borderRadius: 15, 
        padding: 10,
        maxWidth: '90%',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        shadowColor: black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    message: {
        fontSize: 14,
        color: black,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        // backgroundColor: ButtonBackground,
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
    fullScreenContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
    },
});