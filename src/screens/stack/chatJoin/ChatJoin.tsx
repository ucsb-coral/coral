import React from 'react';
import {View,
        Text,
        SafeAreaView,
        TouchableOpacity,
        StatusBar,
        ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppStackPageProps } from '../../../navigation/navigators/StackNavigator';
import { appStackNavigate } from '../../../navigation/navigators/StackNavigator';
import { Icon } from 'react-native-elements';
import { styles } from './ChatJoinStyle';


export type ChatJoinProps = {

};
export default function ChatJoin({ 
    route,
    navigation 
}: AppStackPageProps<'ChatJoin'>) {

return (
    <View style={styles.container}>
            <Text>ChatJoin</Text>
    </View>
);
}
