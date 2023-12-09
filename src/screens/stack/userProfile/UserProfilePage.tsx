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
import {styles} from './UserProfilePageStyles';
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
import IconButton from '../../../components/iconButton/IconButton';
import Header from '../../../components/header/Header';
import {getStatusIcon} from '../../../utilities/status';

export type UserProfileScreenProps = {
  id: string;
};

export default function UserProfilePage({
  route,
  navigation,
}: AppStackPageProps<'userProfile'>) {
  // Appstacknavigate(nav,"ur screen",{id:myUserId}
  const {id} = route.params;
  const {email, photo, preferredName, firstName, lastName, bio, status} =
    useSelector((state: ReduxState) => state.data.usermap[id!] ?? {});

  const [boxHeight, setBoxHeight] = useState(0);
  const [newStatus, setNewStatus] = useState(status);

  const displayName = `${firstName} ${lastName}`;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header centerElement={displayName} leftHandler={navigation.goBack} />
      <ScrollView style={styles.ScrollView}>
        <View style={styles.headerWrapper}>
          <Image
            source={photo ? {uri: photo} : genericUserImagePng}
            style={styles.profileImage}
          />
          <View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>{preferredName ?? firstName}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.userBioContainer}>{bio}</View>

        <View style={styles.userBioContainer}>
          <View style={styles.userBioTextContainer}>
            <ReadMore
              numberOfLines={3}
              seeMoreText="more"
              seeMoreStyle={{color: coral}}
              seeLessText="hide"
              seeLessStyle={{color: coral}}>
              {bio ? bio : 'No Bio yet'}
            </ReadMore>
          </View>
        </View>
        <View style={styles.settingBarContainer}>
          <IconButton
            label="Status"
            Icon={Ionicons}
            iconName={getStatusIcon(newStatus)}
            style={{marginTop: 5}}
            disabled
          />
        </View>
      </ScrollView>
    </View>
  );
}
