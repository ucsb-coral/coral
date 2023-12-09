//UserPage.tsx
import React, { useState } from 'react';
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
import { styles } from './UserProfilePageStyles';
import { useSelector } from 'react-redux';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { scale } from '../../../utilities/scale';
import { black } from '../../../utilities/colors';
import ReadMore from '@fawazahmed/react-native-read-more';
import firestore from '@react-native-firebase/firestore';
import genericUserImagePng from '../../../assets/pngs/userImage.png';
import {
  getNextStatus,
  updateMyUserWithBuffer,
} from '../../../firebaseReduxUtilities/useUserData';

export type UserProfileScreenProps = {
  id: string
};

export default function UserProfilePage({ route, navigation }: AppStackPageProps<'userProfile'>) {
  // Appstacknavigate(nav,"ur screen",{id:myUserId}
  const {id} = route.params;
  const { email, photo, preferredName, firstName, lastName, bio, status } =
    useSelector((state: ReduxState) => state.data.usermap[id!]);

  const [boxHeight, setBoxHeight] = useState(0);
  const [newStatus, setNewStatus] = useState(status);

  const getStatusIcon = (status?: Status) => {
    switch (status) {
      case 'reading':
        return 'book-outline';
      case 'sleeping':
        return 'bed-outline';
      case 'eating':
        return 'fast-food-outline';
      case 'traveling':
        return 'airplane-outline';
      case 'working_out':
        return 'barbell-outline';
      case 'music':
        return 'musical-notes-outline';
      default:
        return 'md-add-circle-outline';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.headerWrapper}>
            <Image
              source={photo ? { uri: photo } : genericUserImagePng}
              style={styles.profileImage}
            />
            <View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>
                  {preferredName ?? firstName}
                </Text>
                <Text style={styles.userEmail}>{email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.userBioContainer}>
            {bio}
          </View>
          <View
            style={styles.userLinksContainer}
            onLayout={event => {
              const containerWidth = event.nativeEvent.layout.width;
              setBoxHeight(containerWidth * 0.35);
            }}>
          </View>
          <View style={styles.settingBarContainer}>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
