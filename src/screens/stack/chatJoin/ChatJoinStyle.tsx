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


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        height: 50,
        width: '100%',
        backgroundColor: white,
        paddingHorizontal: 10,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 25,
        color: coral,
        fontWeight: '700',
        fontFamily: NameFont
    },

    searchBar: {
        width: '90%',
    },

    courseList: {
        flex: 1,
        width: '90%',
    },
    courseListContainer: {
        alignItems: 'center',
    },
    courseCard:{
        width: '100%',
        height: 100,
        borderRadius: 10,
        backgroundColor: ButtonBackground,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8,
        padding: 8,
    },
    courseCardTitle: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 10,
    },
    courseCardButton: {
        width: '35%',
        borderRadius: 5,
        backgroundColor: white,
        padding: 8,
        alignItems: 'center',
    },
    courseCardButtonDisabled: {
        width: '35%',
        borderRadius: 5,
        backgroundColor: '#EEEEEE',
        padding: 8,
        alignItems: 'center',
    },
    courseCardButtonText: {
        color: black,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    courseCardButtonTextDisabled: {
      color: lightGrey,
      fontWeight: 'bold',
      alignItems: 'center',
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 290,
      height: 120,
      padding: 15,
      borderRadius: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    courseModalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    courseModalText: {
      color: grey,
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
    },
    courseModalButton: {
      backgroundColor: coral,
      marginTop: 10,
      marginLeft: 25,
      alignItems: 'center',
      width: '40%',
      borderRadius: 5,
    },
    courseModalButtonText: {
      fontSize: 18,
      color: white,
      fontWeight: 'bold',
      alignItems: 'center',
    },
});