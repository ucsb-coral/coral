// UserSettingPage.tsx
import React, { useState } from 'react';
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
import {Icon} from 'react-native-elements';
import{styles} from '../../../screens/tab/user/UserPageStyle'

export type QuitChatsProps = {

};
export default function QuitChats({ 
    route,
    navigation 
}: AppStackPageProps<'QuitChats'>) {
    const [isSelected, setIsSelected] = useState(false);


return (
    <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
        <View style={styles.gobackBox}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} 
        >
            <Icon name='arrow-back' type="ionicon" color="black" size={40} />
        </TouchableOpacity>
        <View style={styles.doneBox}>
            <Text style={styles.doneText}>Done</Text>
        </View>
        </View>

            <View style={styles.settingBarContainer}>
                <TouchableOpacity
                    style={styles.longBox}
                    activeOpacity={0.6}
                    onPress={() => setIsSelected(!isSelected)}>
                        <Text style={styles.longBarText}>Chat Name</Text>
                        <Icon
                            style={styles.longBoxIcon}
                            name={isSelected ? "checkmark-circle" : "checkmark-circle-outline"}
                            type="ionicon"
                            color="black"
                        />
                </TouchableOpacity>
            </View> 
        </ScrollView>
        </SafeAreaView>
    </View>
);
}
