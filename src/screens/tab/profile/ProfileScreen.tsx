//UserPage.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { coral } from '../../../utilities/colors';
import {styles} from './UserPageStyle';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import {FontAwesome} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import {black} from '../../../utilities/colors';
import ReadMore from '@fawazahmed/react-native-read-more';
import { setMyUserBio } from '../../../firebaseReduxUtilities/useUserData';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Padding } from '../../../../node_modules/lightningcss/node/ast.d';


export type ProfileScreenProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type ProfilePageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'profile'>
>;

export default function ProfileScreen({route, navigation}: ProfilePageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  // setMyUserBio(myUserId, user, 'This is my bio!');
  const bio = useSelector((state: ReduxState) => state.data.usermap[myUserId!].bio);
  const [boxHeight, setBoxHeight] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userPhoto, setUserPhoto] = useState(user?.photo || '');





  const uploadImage = async (sourceURL: string, type: string) => {
    if (sourceURL === '') {
      return;
    }
    let fileName = '';
    let contentType = '';
    if (type === 'IMAGE') {
      console.log('uploading image '+sourceURL);
      fileName = `${myUserId}/${Date.now()}.jpg`;  
      contentType = 'image/jpg';
    }
    try {
      const uploadTimestamp = new Date().toISOString();
      const reference = storage().ref(fileName);
      const metadata = {
        contentType: contentType,
        customMetadata: {
          type: type,
          fromUserName: user?.lastName + ' ' + user?.firstName,
          fromUserId: myUserId,
          createdAt: uploadTimestamp,
        },
      };
      await reference.putFile(sourceURL, metadata);
      const downloadURL = await reference.getDownloadURL();
      console.log('File available at', downloadURL);
      await firestore()
        .collection('users')
        .doc(myUserId)
        .update({
          photo: downloadURL,
        });
        setUserPhoto(downloadURL);
    } catch (error) {
      console.error('Upload failed', error);
    }
  }
  const GetPermission = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to allow access to your photos to upload an image.");
      return;
    }
    console.log('permission granted');
  }
  const PickImage = async () => {
    GetPermission();
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1.0,
      allowsEditing: true,
      aspect: [4, 4],
    });
    if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
      return;
    }
    const newImageUri = pickerResult.assets[0].uri;

    // Retrieve the current profile picture URL from Firestore
    const currentUserDocRef = firestore().collection('users').doc(myUserId);
    const docSnapshot = await currentUserDocRef.get();
    const previousImageURL = docSnapshot.data()?.photo;
  
    // Delete the previous image from Firebase Storage (if it exists)
    if (previousImageURL) {
      try {
        const storageRef = storage().refFromURL(previousImageURL);
        await storageRef.delete();
      } catch (error) {
        console.error('Failed to delete previous image from Firebase Storage', error);
      }
    }
  
    // Upload the new image and update Firestore
    uploadImage(newImageUri, 'IMAGE');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity 
                    onPress={() => {setModalVisible(true);}}
                    activeOpacity={0.6}
            >
          <Image
            source={
              userPhoto
                ? { uri: userPhoto }
                : require('../../../utilities/image/userImage.png')
            }
            style={styles.profileImage}
          />
            </TouchableOpacity>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>
                {user?.preferredName ? user?.preferredName : user?.firstName}
              </Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
          <View
            style={styles.userBioContainer}>
              <View style={styles.userBioTextContainer}>
                  <ReadMore
                    numberOfLines={3}
                    seeMoreText='more'
                    seeMoreStyle={{color: coral}}
                    seeLessText='hide'
                    seeLessStyle={{color: coral}}
                  >
                    {
                      bio ? bio : 'Do not have a bio yet?\nGo to Settings >> Edit Profile to add one!'
                    }
                  </ReadMore>
              </View>
          </View>
          <View
            style={styles.userLinksContainer}
            onLayout={event => {
              const containerWidth = event.nativeEvent.layout.width;
              setBoxHeight(containerWidth * 0.35);
            }}>
            <TouchableOpacity
              style={[styles.box, {height: boxHeight}]}
              activeOpacity={0.6}
              onPress={() => Linking.openURL('https://www.canvas.ucsb.edu/')}>
              <Text style={styles.userLinks}>Canvas</Text>
              <Ionicons name="link-outline" size={scale(25)} color={black} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.box, {height: boxHeight}]}
              activeOpacity={0.6}
              onPress={() => Linking.openURL('https://my.sa.ucsb.edu/gold/')}>
              <Text style={styles.userLinks}>Gold</Text>
              <Ionicons name="link-outline" size={scale(25)} color={black} />
            </TouchableOpacity>
          </View>
          <View style={styles.settingBarContainer}>
            <TouchableOpacity
              style={[
                styles.longBox,
                isActive ? {backgroundColor: '#F883793D'} : {},
              ]}
              activeOpacity={0.6}
              onPressIn={() => setIsActive(true)}
              onPressOut={() => setIsActive(false)}
              onPress={() => setIsMuted(!isMuted)}>
              <Text style={styles.longBarText}>Status</Text>
              <Ionicons
                name={isMuted ? 'book-outline' : 'bed-outline'}
                size={scale(25)}
                color={black}
                style={styles.longBoxIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.longBox}
              activeOpacity={0.6}
              onPress={() => appStackNavigate(navigation, 'settings')}>
              <Text style={styles.longBarText}>Settings</Text>
              <Ionicons
                name={'settings-outline'}
                size={scale(25)}
                color={black}
                style={styles.longBoxIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

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
          <Text style={styles.courseModalText}>Choose Your Image</Text>
          <TouchableOpacity
          style={styles.courseModalButton}
          onPress={() => {
            PickImage();
            setModalVisible(false);
          }}>
          <Text style={styles.courseModalButtonText}> {'Gallery'}</Text>
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