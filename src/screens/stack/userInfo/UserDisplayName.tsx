// UserSettingPage.tsx
import React from 'react';
import {View,
        Text,
        SafeAreaView,
        TouchableOpacity,
        StatusBar,
        ScrollView,
        TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppStackPageProps } from '../../../navigation/navigators/StackNavigator';
import { appStackNavigate } from '../../../navigation/navigators/StackNavigator';
import {Icon} from 'react-native-elements';
import{styles} from '../../../screens/tab/user/UserPageStyle'




export type UserDisplayNameProps = {

};
export default function UserDisplayName({ 
  route,
  navigation 
}: AppStackPageProps<'userNaming'>) {
  

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
          <View style={styles.UserNewNameBox}>
            <Text style={styles.UserNewNameText}>Nick name:</Text>
            <TextInput
              style={styles.UserNewName}
            placeholder="Enter your new name"
            />
          </View>
        </View> 
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
