import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Image,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  updateEvent,
  updateEventImage
} from '../../../firebaseReduxUtilities/useEventsData';
import Button from '../../../components/button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

export type EditEventScreenProps = {
  event: SchoolEvent;
};

export default function EditEventScreen({
  route,
  navigation,
}: AppStackPageProps<'editEvent'>) {
  // id,
  // title,
  // description,
  // photo,
  // time,
  // end_time,
  // location,
  // room_number,

  const {event} = route.params; // getting the props from the navigator
  let {id, title, description, photo, time, end_time : endTime, location, room_number : roomNumber} = event;

  // for some reason, these are strings at first???
  time = new Date(time);
  endTime = new Date(endTime);

  // const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  // const user = useSelector(
  //   (state: ReduxState) => state.data.usermap[myUserId!],
  // );
  // const {preferredName, photo, bio} = user;

  // const [newPreferredName, setNewPreferredName] = useState<string>(
  //   preferredName || '',
  // );
  // const [newPhoto, setNewPhoto] = useState<string>(photo || '');
  // const [newBio, setNewBio] = useState<string>(bio || '');
  const [isChangeMade, setChangeMade] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState<string>(title || '');
  const [newDescription, setNewDescription] = useState<string>(description || '');
  const [newPhoto, setNewPhoto] = useState<string>(photo || '');
  const [newTime, setNewTime] = useState<Date>(time || new Date());
  const [newEndTime, setNewEndTime] = useState<Date>(endTime || new Date());
  const [newLocation, setNewLocation] = useState<string>(location || '');
  const [newRoomNumber, setNewRoomNumber] = useState<string>(roomNumber || '');

  useEffect(() => {
    setChangeMade(
      ((!!newTitle || !!title) && newTitle !== title) ||
      ((!!newDescription || !!description) && newDescription !== description) ||
      ((!!newPhoto || !!photo) && newPhoto !== photo) ||
      ((!!newTime || !!time) && newTime !== time) ||
      ((!!newEndTime || !!endTime) && newEndTime !== endTime) ||
      ((!!newLocation || !!location) && newLocation !== location) ||
      ((!!newRoomNumber || !!roomNumber) && newRoomNumber !== roomNumber),
    );
  }, [newTitle, title, newDescription, description, newPhoto, photo, newTime, time, newEndTime, endTime, newLocation, location, newRoomNumber, roomNumber]);

  const handlePickImage = async () => {
    const uri: string | null = await pickSquareImage();
    if (uri) setNewPhoto(uri);
  };

  const handleSave = async () => {
    let newUrl = newPhoto;
    if ((!!newPhoto || !!photo) && newPhoto !== photo) {
      newUrl = await updateEventImage(id, newPhoto) ?? newPhoto;
    }

    const eventToUpdate: SchoolEvent = {
      id: id,
      title: newTitle,
      description: newDescription,
      photo: newUrl,
      time: newTime,
      end_time: newEndTime,
      location: newLocation,
      room_number: newRoomNumber
    };

    await updateEvent(eventToUpdate);
    navigation.goBack();
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
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header leftHandler={handleExit} centerElement={'Edit Event'} />
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
          label="Title"
          placeholder="What would you like the event to be called?"
          value={newTitle}
          onChangeText={setNewTitle}
          maxLength={40}
        />
        <DateTimePicker
          value={newTime}
          minimumDate={new Date()}
          mode="datetime"
          onChange={(_, date) => date && setNewTime(date)}
        />
        <DateTimePicker
          value={newEndTime}
          minimumDate={new Date()}
          mode="datetime"
          onChange={(_, date) => date && setNewEndTime(date)}
        />
        <Input
          label="Location"
          placeholder="Where will the event be held?"
          value={newLocation}
          onChangeText={setNewLocation}
          maxLength={150}
        />
        <Input
          label="Room Number"
          placeholder="What room number? (Optional)"
          value={newRoomNumber}
          onChangeText={setNewRoomNumber}
          maxLength={40}
        />
        <Input
          label="Description"
          placeholder="Enter a description"
          value={newDescription}
          onChangeText={setNewDescription}
          multiline={true} // Allow multiline input
          numberOfLines={10} // You can adjust this number as needed
          maxLength={500}
        />
      </ScrollView>
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
    </SafeAreaView>
  );
}