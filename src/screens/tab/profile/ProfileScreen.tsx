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
import {coral} from '../../../utilities/colors';
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
import firestore from '@react-native-firebase/firestore';
import genericUserImagePng from '../../../assets/pngs/userImage.png';
import {updateMyUserWithBuffer} from '../../../firebaseReduxUtilities/useUserData';
import {getNextStatus, getStatusIcon} from '../../../utilities/status';
import IconButton from '../../../components/iconButton/IconButton';

export type ProfileScreenProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type ProfilePageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'profile'>
>;

export default function ProfileScreen({route, navigation}: ProfilePageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const {email, photo, preferredName, firstName, lastName, bio, status} =
    useSelector((state: ReduxState) => state.data.usermap[myUserId!] ?? {});

  const [boxHeight, setBoxHeight] = useState(0);
  const [newStatus, setNewStatus] = useState(status);

  const toggleStatus = () => {
    const statusToSet = getNextStatus(newStatus);
    setNewStatus(statusToSet);
    updateMyUserWithBuffer({status: statusToSet});
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.headerWrapper}>
            <Image
              source={photo ? {uri: photo} : genericUserImagePng}
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
            <TouchableOpacity
              onPress={() => appStackNavigate(navigation, 'editProfile', {})}
              style={styles.userBioTextContainer}>
              <ReadMore
                numberOfLines={3}
                seeMoreText="more"
                seeMoreStyle={{color: coral}}
                seeLessText="hide"
                seeLessStyle={{color: coral}}>
                {bio
                  ? bio
                  : "Don't have a bio yet?\nGo to Settings >> Edit Profile to add one!"}
              </ReadMore>
            </TouchableOpacity>
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
            <IconButton
              onPress={toggleStatus}
              label="Status"
              Icon={Ionicons}
              iconName={getStatusIcon(newStatus)}
              style={{marginTop: 5}}
            />
            <IconButton
              onPress={() => appStackNavigate(navigation, 'settings')}
              label="Settings"
              Icon={Ionicons}
              iconName={'settings-outline'}
              style={{marginTop: 5}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
