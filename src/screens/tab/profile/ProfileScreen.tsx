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
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import {black} from '../../../utilities/colors';
import ReadMore from '@fawazahmed/react-native-read-more';
import { setMyUserBio } from '../../../firebaseReduxUtilities/useUserData';

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
  setMyUserBio(myUserId, user, 'This is my bio!');
  const bio = useSelector((state: ReduxState) => state.data.usermap[myUserId!].bio);
  const [boxHeight, setBoxHeight] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.headerWrapper}>
            <Image
              source={
                user && user.photo
                  ? {uri: user.photo}
                  : require('../../../utilities/image/userImage.png')
              }
              style={styles.profileImage}
            />
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>{user?.firstName}</Text>
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
    </View>
  );
}
