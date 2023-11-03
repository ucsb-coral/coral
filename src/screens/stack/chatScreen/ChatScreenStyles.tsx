import React from 'react';
import { View, Text, StyleSheet, Pressable, PixelRatio, TouchableOpacity, ScrollView } from 'react-native';

const DEVICEPIXELRATIO = PixelRatio.get();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#4CAF50',
    },
    backButton: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    headerText: {
        color: '#f88379',
        fontSize: 20,
        fontWeight: 'bold',
    },
    messageList: {
        flex: 1,
        padding: 10,
    },
    message: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
    },
    sendButton: {
        color: '#f88379',
        fontSize: 18,
        marginLeft: 10,
    },
});