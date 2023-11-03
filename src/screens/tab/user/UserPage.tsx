import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
//import {TabPageProps} from '../../navigation/navigators/TabNavigator';
import {signOut} from '../../../../auth/useAuth';
import {Icon} from 'react-native-elements';
import {styles} from '../user/UserPageStyle';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';

export type UserPageProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type UserScreenProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'user'>
>;

export default function UserPage({route, navigation}: UserScreenProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  const [boxHeight, setBoxHeight] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <Image
            source={require('../../../utilities/image/userImage.png')}
            style={styles.profileImage}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{user?.firstName}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
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
            <Icon name="link-outline" type="ionicon" color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, {height: boxHeight}]}
            activeOpacity={0.6}
            onPress={() => Linking.openURL('https://my.sa.ucsb.edu/gold/')}>
            <Text style={styles.userLinks}>Gold</Text>
            <Icon name="link-outline" type="ionicon" color="black" />
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
            <Icon
              style={styles.longBoxIcon}
              name={isMuted ? 'book-outline' : 'bed-outline'}
              type="ionicon"
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.longBox}>
            <Text style={styles.longBarText}>Settings</Text>
            <Icon
              style={styles.longBoxIcon}
              name="settings-outline"
              type="ionicon"
              color="black"
            />
          </View>
          <TouchableOpacity
            style={[styles.longBox, {borderBottomWidth: 0}]}
            activeOpacity={0.6}
            onPress={() => signOut()}>
            <Text style={styles.longBarText}>Sign Out</Text>
            <Icon
              style={styles.longBoxIcon}
              name="log-out-outline"
              type="ionicon"
              color="black"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
