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

export type EditProfileScreenProps = {};
export default function EditProfileScreen({
  route,
  navigation,
}: AppStackPageProps<'editProfile'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  const [newBio, setNewBio] = useState('');
  const [newName, setNewName] = useState(''); 


  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <Header
            leftHandler={navigation.goBack}
            centerElement={'Edit Profile'}
          />

          <View style={styles.settingBarContainer}>


          <View style={styles.UserNewNameBox}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
              <Text style={styles.UserNewNameText}>New name:</Text>
              <TextInput
                style={styles.UserNewName}
                placeholder="Enter your new name"
                value={newName}
                onChangeText={(text) => {
                  if (text.length <= 15) {
                    setNewName(text);
                  }
                }}
                maxLength={15}
                multiline={true}
                numberOfLines={4}
              />
            </View>
              <Text style={styles.characterCountText}>
                {15 - newName.length} 
              </Text>
            
          </View>

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
            

            {/* <TouchableOpacity
            onPress={() => {
              // TODO
              // get the text from the text input
              setMyUserPreferredName(myUserId, user, newName);
              navigation.goBack();
              navigation.goBack();
            }}
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: '#F88379AA',
              width: '30%',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            activeOpacity={0.6}>

            <Text style={styles.longBarText}>Submit</Text>
            </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              if (newName != '') {
                setMyUserPreferredName(myUserId, user, newName);
              }
              navigation.goBack();
              navigation.goBack();
            }}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>Submit Name</Text>
            <Ionicons
                name={'file-tray-stacked-outline'}
                size={scale(25)}
                color={black}
                style={styles.longBoxIcon}
              />
          </TouchableOpacity>

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

          <TouchableOpacity
            onPress={() => {
              setMyUserPreferredName(myUserId, user, '');
              navigation.goBack();
              navigation.goBack();
            }}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>Use Default Name: {user?.firstName}</Text>
            <Ionicons
                name={'refresh-circle-outline'}
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
