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
import Button from '../../../components/button/Button';

export type EditProfileScreenProps = EmptyProps;
export default function EditProfileScreen({
  route,
  navigation,
}: AppStackPageProps<'editProfile'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );
  const {preferredName, photo, bio} = user;

  const [newPreferredName, setNewPreferredName] = useState<string>(
    preferredName || '',
  );
  const [newPhoto, setNewPhoto] = useState<string>(photo || '');
  const [newBio, setNewBio] = useState<string>(bio || '');
  const [isChangeMade, setChangeMade] = useState<boolean>(false);

  useEffect(() => {
    setChangeMade(
      ((!!newPreferredName || !!preferredName) &&
        newPreferredName !== preferredName) ||
        ((!!newPhoto || !!photo) && newPhoto !== photo) ||
        ((!!newBio || !!bio) && newBio !== bio),
    );
  }, [newPreferredName, newPhoto, newBio, preferredName, photo, bio]);

  const handlePickImage = async () => {
    const uri: string | null = await pickSquareImage();
    if (uri) setNewPhoto(uri);
  };

  const handleSave = async () => {
    const userToUpdate: MutableUser = {};
    if (
      (!!newPreferredName || !!preferredName) &&
      newPreferredName !== preferredName
    )
      userToUpdate.preferredName = newPreferredName;
    if ((!!newPhoto || !!photo) && newPhoto !== photo) {
      updateUserImage(newPhoto).then(url => setNewPhoto(url ?? ''));
    }
    if ((!!newBio || !!bio) && newBio !== bio) userToUpdate.bio = newBio;
    updateMyUser(userToUpdate);
    navigation.goBack();
    navigation.goBack();
  };
  console.log(newPhoto, photo);
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
            style: 'destructive',
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
      <ScrollView
        bounces={false}
        contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        <TouchableOpacity onPress={handlePickImage} activeOpacity={0.6}>
          <Image
            source={newPhoto ? {uri: newPhoto} : genericUserImagePng}
            style={{
              height: scale(100),
              width: scale(100),
              borderRadius: scale(20),
              marginTop: scale(16),
              marginBottom: scale(16),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePickImage}>
          <Text
            style={{
              color: coral,
              fontSize: scale(20),
              fontWeight: '600',
              marginBottom: scale(16),
            }}>
            {'Upload Image'}
          </Text>
        </TouchableOpacity>
        <Input
          label="Display Name"
          placeholder="What would you like to be called?"
          value={newPreferredName}
          onChangeText={setNewPreferredName}
          maxLength={15}
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
      {/* <FooterButton
        label="Save"
        style={{
          opacity: isChangeMade ? 1 : 0.5,
        }}
        disabled={!isChangeMade}
        onPress={handleSave}
      /> */}
      <Button
        label="Save Changes"
        disabled={!isChangeMade}
        onPress={handleSave}
        style={{
          margin: scale(16),
          marginBottom: scale(24),
          opacity: isChangeMade ? 1 : 0.5,
        }}
      />
    </View>
  );
}
