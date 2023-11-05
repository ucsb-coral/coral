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
import {Icon} from 'react-native-elements';
import {styles} from '../user/UserPageStyle';
import {useSelector} from 'react-redux';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps,
        appStackNavigate} from '../../../navigation/navigators/StackNavigator';

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
        <ScrollView style={styles.ScrollView}>
        <View style={styles.headerWrapper}>
          <Image
            source={user && user.photo
              ? { uri: user.photo }
              : require('../../../utilities/image/userImage.png')}
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

          <TouchableOpacity
            style={styles.longBox}
            activeOpacity={0.6}
            onPress={() => appStackNavigate(navigation, 'userSetting', {})}>
            <Text style={styles.longBarText}>Settings</Text>
            <Icon
              style={styles.longBoxIcon}
              name="settings-outline"
              type="ionicon"
              color="black"
            />
          </TouchableOpacity>

        </View>
        </ScrollView>
      </SafeAreaView>
    
    </View>
  );
}
