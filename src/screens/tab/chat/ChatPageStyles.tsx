import React from 'react';
import { View, Text, StyleSheet, Pressable, PixelRatio, TouchableOpacity, ScrollView } from 'react-native';

const DEVICEPIXELRATIO = PixelRatio.get();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backButton: {
        position: 'absolute', // Position the button absolutely
        top: 10, // Distance from the top of the container
        left: 10,
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: 'blue',
        borderRadius: 45,
        width: PixelRatio.getPixelSizeForLayoutSize(81 / DEVICEPIXELRATIO),
        height: PixelRatio.getPixelSizeForLayoutSize(32 / DEVICEPIXELRATIO),
    },
    joinButton: {
        position: 'absolute', 
        top: 10, 
        right: 10,
        paddingVertical: 5,
        paddingHorizontal: 17,
        backgroundColor: '#4CAF50',
        borderRadius: 45,
        width: PixelRatio.getPixelSizeForLayoutSize(81 / DEVICEPIXELRATIO),
        height: PixelRatio.getPixelSizeForLayoutSize(32 / DEVICEPIXELRATIO),
    },
    header: {
        height: 50,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 25,
        color: '#f88379',
        fontWeight: 'bold'
    },
    chatList: {
        flex: 1,
        padding: 15
    },
    chatItem: {
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10
    },
    category: {
        fontSize: 20,
        color: 'black',
        marginBottom: 5
    },
    chatName: {
        fontSize: 18,
        color: 'black',
        marginBottom: 5
    },
    chatMessage: {
        fontSize: 12,
        color: 'black'
    },
    bottomBar: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
        backgroundColor: 'white'
    },
});

