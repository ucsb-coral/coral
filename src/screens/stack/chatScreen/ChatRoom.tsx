import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

// type RootStackParamList = {
//     ChatRoom: {
//         chatName: string;
//     };
// };

type ChatRoomRouteProp = RouteProp<RootStackParamList, 'ChatRoom'>;

const ChatRoom: React.FC = () => {
    const route = useRoute<ChatRoomRouteProp>();
    const chatName = route.params.chatName;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to {chatName} Chat Room</Text>
            {/* add more here later */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    }
});

export default ChatRoom;
