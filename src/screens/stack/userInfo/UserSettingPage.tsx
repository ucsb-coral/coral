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
import {signOut} from '../../../../auth/useAuth';



export type UserSettingScreenProps = {

};
export default function UserSettingPage({ 
  route,
  navigation 
}: AppStackPageProps<'userSetting'>) {
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
        <View style={styles.gobackBox}>
          <TouchableOpacity 
          onPress={() => navigation.goBack()}>
            <Icon 
            name='arrow-back' type="ionicon" color="black" size={40} />
          </TouchableOpacity>
        </View>


        <View style={styles.settingBarContainer}>
          <TouchableOpacity
            onPress={() => appStackNavigate(navigation, 'userNaming',{})}
            style={styles.longBox}
            activeOpacity={0.6}
          >
            <Text style={styles.longBarText}>Nick name</Text>
            <Icon
              style={styles.longBoxIcon}
              name="save-outline"
              type="ionicon"
              color="black"
            />
          </TouchableOpacity>
      
          <TouchableOpacity
            onPress={() => appStackNavigate(navigation, 'QuitChats',{})}
            style={styles.longBox}
            activeOpacity={0.6}
            >
            <Text style={styles.longBarText}>Quit Chats</Text>
            <Icon
              style={styles.longBoxIcon}
              
              name="chatbubble-outline"
              type="ionicon"
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => appStackNavigate(navigation, 'AboutCoral',{})}
            style={styles.longBox}
            activeOpacity={0.6}
            >
            <Text style={styles.longBarText}>About CORAL</Text>
            <Icon
              style={styles.longBoxIcon}
              
              name="information-circle-outline"
              type="ionicon"
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signOutContainer}>
        <TouchableOpacity
            style={[styles.signOutBox, {borderBottomWidth: 0}]}
            activeOpacity={0.6}
            onPress={() => signOut()}>
            <Text style={styles.signOutText} >Sign Out </Text>
            <Icon
              style={styles.longBoxIcon}
              name="log-out-outline"
              type="ionicon"
              color="red"
            />
          </TouchableOpacity>
        
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
