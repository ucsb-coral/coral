// UserSettingPage.tsx
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
import {Icon} from 'react-native-elements';
import{styles} from '../../../screens/tab/user/UserPageStyle'




export type AboutCoralProps = {

};
export default function AboutCoral({ 
    route,
    navigation 
}: AppStackPageProps<'AboutCoral'>) {

return (
    <View style={styles.container}>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
        
        <View style={styles.gobackBox}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}>
            <Icon 
            name='arrow-back' type="ionicon" color="black" size={40}/>
        </TouchableOpacity>
        </View>

        <View style={styles.settingBarContainer}>
        <TouchableOpacity
            style={styles.longBox}
            activeOpacity={0.6}
        >
            <Text style={styles.longBarText}>About Coral</Text>
            <Icon
            style={styles.longBoxIcon}
            name="save-outline"
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
