// UserSettingPage.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {styles} from '../../tab/profile/UserPageStyle';
import Header from '../../../components/header/Header';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import {coral, black} from '../../../utilities/colors';
import Input from '../../../components/input/Input';
import genericUserImagePng from '../../../assets/pngs/userImage.png';
import {pickSquareImage} from '../../../utilities/images';
import FooterButton from '../../../components/footerButton/FooterButton';
import {
  updateMyUser,
  updateUserImage,
} from '../../../firebaseReduxUtilities/useUserData';

export type EditProfileScreenProps = EmptyProps;
export default function EditProfileScreen({
  route,
  navigation,
}: AppStackPageProps<'editProfile'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );

  const [newPreferredName, setNewPreferredName] = useState(
    user.preferredName || '',
  );
  const [newPhoto, setNewPhoto] = useState(user.photo || '');
  const [newBio, setNewBio] = useState(user.bio || '');
  const [isChangeMade, setChangeMade] = useState(false);

  useEffect(() => {
    setChangeMade(
      (!!newPreferredName && newPreferredName !== user.preferredName) ||
        (!!newPhoto && newPhoto !== user.photo) ||
        (!!newBio && newBio !== user.bio),
    );
  }, [newPreferredName, newPhoto, newBio]);

  const handlePickImage = async () => {
    const uri: string | null = await pickSquareImage();
    if (uri) setNewPhoto(uri);
  };

  const handleSave = async () => {
    const userToUpdate: MutableUser = {};
    if (newPreferredName && newPreferredName !== user.preferredName)
      userToUpdate.preferredName = newPreferredName;
    if (newPhoto && newPhoto !== user.photo) {
      updateUserImage(newPhoto);
    }
    if (newBio && newBio !== user.bio) userToUpdate.bio = newBio;
    updateMyUser(userToUpdate);
  };

  const handleExit = () => {
    if (isChangeMade) {
      Alert.alert(
        'Discard changes?',
        'Are you sure you want to discard your changes?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header leftHandler={handleExit} centerElement={'Edit Profile'} />
      <ScrollView>
        <TouchableOpacity onPress={handlePickImage} activeOpacity={0.6}>
          <Image
            source={newPhoto ? {uri: newPhoto} : genericUserImagePng}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Input
          label="Display Name"
          placeholder="What would you like to be called?"
          value={newPreferredName}
          onChangeText={setNewPreferredName}
          maxLength={80}
        />
        <Input
          label="New bio"
          placeholder="Enter your new bio"
          value={newBio}
          onChangeText={setNewBio}
          multiline={true} // Allow multiline input
          numberOfLines={4} // You can adjust this number as needed
          maxLength={150}
        />
      </ScrollView>
      <FooterButton
        label="Save"
        style={{
          opacity: isChangeMade ? 1 : 0.5,
        }}
        disabled={!isChangeMade}
        onPress={handleSave}
      />
    </View>
  );
}
