import React, {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {scale} from '../../../../utilities/scale';
import {
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../../utilities/textfont';
import {black, grey0, opacity, white} from '../../../../utilities/colors';
import Button from '../../../../components/button/Button';
import {addEventToGoogleCalendar} from '../../../../firebaseReduxUtilities/useCalendarData';

export type Props = {
  id: string;
  title: String;
  description: String;
  photo: string; //for some reason, it must be kept to this for Card.Cover to understand it
  time: Date;
  end_time: Date;
  location: String;
  room_number: String;
  modalVisible: boolean;
  closeModal: () => void;
};

const nullDate = new Date('1970-01-01T00:00:00.000Z').getTime();

function convertStartTime(time: Date) {
  return time.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric', // Add the hour component
    minute: '2-digit', // Display minutes with two digits
    hour12: true, // Use 12-hour clock (optionally add AM/PM if desired)
  });
}

function convertEndTime(time: Date) {
  if (!time || time?.getTime() == nullDate) {
    // console.log('null time');
    return 'All Day';
  }
  return time.toLocaleString('en-US', {
    hour: 'numeric', // Add the hour component
    minute: '2-digit', // Display minutes with two digits
    hour12: true, // Use 12-hour clock (optionally add AM/PM if desired)
  });
}

type ModalProps = {
  id: string;
  title: String;
  description: String;
  photo: string; //for some reason, it must be kept to this for Card.Cover to understand it
  time: Date;
  end_time: Date;
  location: String;
  room_number: String;
  modalVisible: boolean;
  closeModal: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingTimeoutRef: MutableRefObject<NodeJS.Timeout | null>;
};

export default function SchoolModal({
  id,
  title,
  description,
  photo,
  time,
  end_time,
  location,
  room_number,
  modalVisible,
  closeModal,
  setLoading,
  loadingTimeoutRef,
}: ModalProps) {
  const userId = useSelector((state: ReduxState) => state.data.myUserId);
  const syncedCalendar = useSelector(
    (state: ReduxState) => state.data.usermap[userId].syncedCalendar,
  );
  const quarter = useSelector((state: ReduxState) => state.data.quarter);
  const isSynced = syncedCalendar?.quarter === quarter;

  const withLoadingAsync = async (fn: () => Promise<void>) => {
    setLoading(true);
    loadingTimeoutRef.current = setTimeout(() => {
      Alert.alert('Error', 'Failed to update');
      setLoading(false);
    }, 60000);
    fn().then(() => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      setLoading(false);
    });
  };

  const syncCalendarWithAlert = () =>
    Alert.alert(
      'Add Event to Calendar',
      'Would you like to add this event to your ucsb.edu Google Calendar?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add Event',
          onPress: () => {
            closeModal();
            withLoadingAsync(() => addEventToGoogleCalendar(id));
          },
        },
      ],
      {cancelable: true},
    );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      collapsable={true}
      onRequestClose={closeModal}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: white,
            borderRadius: scale(10),
            paddingTop: scale(20),
            paddingBottom: scale(20),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            maxWidth: '90%',
          }}>
          <ScrollView
            style={{width: '100%', maxHeight: scale(460)}}
            contentContainerStyle={{
              width: '100%',
              paddingLeft: scale(24),
              paddingRight: scale(24),
            }}
            keyboardShouldPersistTaps="always">
            <Text
              style={{
                fontFamily: sfProTextBold,
                fontSize: scale(22),
                color: black,
                marginTop: scale(24),
              }}>
              {title}
            </Text>
            <Card.Cover
              source={{uri: photo}}
              style={{marginBottom: scale(12), marginTop: scale(12)}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: sfProTextSemibold,
                fontSize: scale(18),
                marginBottom: scale(2),
                color: black,
              }}>
              {convertStartTime(time) + ' - ' + convertEndTime(end_time)}
            </Text>
            <Text
              style={{
                fontFamily: sfProTextRegular,
                marginBottom: scale(6),
                fontSize: scale(16),
                color: black,
              }}>
              {room_number ? location + ' ' + room_number : location}
            </Text>
            <Text
              style={{
                fontFamily: sfProTextRegular,
                fontSize: scale(14),
                color: opacity(black, 0.75),
              }}>
              {description}
            </Text>
          </ScrollView>
          <IconButton
            icon="close"
            iconColor={black}
            size={scale(22)}
            style={{position: 'absolute', top: scale(4), right: scale(4)}}
            onPress={closeModal}
          />
          {isSynced && (
            <Button
              style={{marginTop: scale(10)}}
              onPress={syncCalendarWithAlert}
              label="Add to Calendar"
            />
          )}
        </View>
      </View>
    </Modal>
  );
}