// UserSettingPage.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import Header from '../../../components/header/Header';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import { coral ,black} from '../../../utilities/colors';
import { setMyUserPreferredName, setMyUserBio} from '../../../firebaseReduxUtilities/useUserData';

export type EditBioScreenProps = {};
export default function EditBioScreen({
  route,
  navigation,
}: AppStackPageProps<'editBio'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  const [newBio, setNewBio] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <Header
            leftHandler={navigation.goBack}
            centerElement={'Edit Bio'}
          />

          <View style={styles.settingBarContainer}>

            <View style={styles.UserNewBioBox}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={styles.UserNewBioText}>New bio:</Text>
                <TextInput
                  style={styles.UserNewBioInput}                                                   
                  placeholder="Enter your new bio"
                  value = {newBio}
                  onChangeText = {(text) => setNewBio(text)}
                  multiline={true} // Allow multiline input
                  numberOfLines={4} // You can adjust this number as needed
                  maxLength={150} 
                />
              </View>
              <Text style={styles.characterCountText}>
                {150 - newBio.length} 
              </Text>
            </View>

          <TouchableOpacity
            onPress={() => {
              if (newBio != '') {
                setMyUserBio(myUserId, user, newBio);
              }
              navigation.goBack();
              navigation.goBack();
            }}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>Submit Bio</Text>
            <Ionicons
                name={'receipt-outline'}
                size={scale(25)}
                color={black}
                style={styles.longBoxIcon}
              />
          </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
