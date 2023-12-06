// UserSettingPage.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import {signOut} from '../../../../auth/useAuth';
import {white} from '../../../utilities/colors';
import Header from '../../../components/header/Header';
import {Ionicons, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import {coral} from '../../../utilities/colors';

import {scale, standardMargin} from '../../../utilities/scale';
import {withTokens} from '../../../firebaseReduxUtilities/tokens';

export type SettingsScreenProps = {};
export default function SettingsScreen({
  route,
  navigation,
}: AppStackPageProps<'settings'>) {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      <ScrollView style={styles.ScrollView}>
        <Header leftHandler={navigation.goBack} centerElement={'Settings'} />

        {/* go to different pages */}
        <View style={styles.settingBarContainer}>
          <TouchableOpacity
            onPress={() => {setModalVisible(true);}}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>Edit Profile</Text>
            <FontAwesome5
              name="user-edit"
              size={scale(17)}
              color="black"
              style={styles.longBoxIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => appStackNavigate(navigation, 'about')}
            style={styles.longBox}
            activeOpacity={0.6}>
            <Text style={styles.longBarText}>About Coral</Text>
            <Ionicons
              name="information-circle-outline"
              size={scale(25)}
              color="black"
              style={styles.longBoxIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signOutContainer}>
          <TouchableOpacity
            style={[styles.signOutBox, {borderBottomWidth: 0}]}
            activeOpacity={0.6}
            onPress={signOut}>
            <Text style={styles.signOutText}>{'Sign Out'}</Text>
            <Ionicons
              name="log-out-outline"
              size={scale(20)}
              color={'red'}
              style={{marginLeft: scale(5)}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <TouchableOpacity
                style={styles.courseModalButton}
                onPress={() => {
                  setModalVisible(false);
                  appStackNavigate(navigation, 'editName');
                }}>
                <Text style={styles.courseModalButtonText}> {'Preferred Name'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.courseModalButton}
                onPress={() => {
                  setModalVisible(false);
                  appStackNavigate(navigation, 'editBio');
                }}>
                <Text style={styles.courseModalButtonText}> {'Bio'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{paddingLeft:10,paddingBottom:15}}>
              <FontAwesome
                name="close"
                size={scale(24)}
                color={coral}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
