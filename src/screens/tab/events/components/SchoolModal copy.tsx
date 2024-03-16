import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Paragraph,
  Button,
  Modal,
  Portal,
  IconButton,
} from 'react-native-paper';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {scale} from '../../../../utilities/scale';
import {sfProTextBold} from '../../../../utilities/textfont';

export type Props = {
  title: String;
  description: String;
  photo: string;
  time: Date;
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
}: ModalProps) {
  const styles = StyleSheet.create({
    modalContent: {
      backgroundColor: 'white',
      // padding: 20,
      paddingTop: 50, // Ample padding at the top for the close icon
      margin: 20,
      borderRadius: 10,
      overflow: 'hidden', // Prevents children from overlapping the corners
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 20,
    },
    coverImage: {
      width: '100%',
      height: 200, // Adjust the image size as needed
      marginBottom: 20,
    },
    infoText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 10, // Padding from the top edge of the modal
      right: 10, // Padding from the right edge of the modal
      zIndex: 1, // Make sure the button is above all other elements
    },
  });

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={closeModal}
        contentContainerStyle={styles.modalContent}>
        <View style={{backgroundColor: 'white'}}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{backgroundColor: 'white', padding: scale(4)}}>
              <Text
                style={{
                  fontSize: scale(24),
                  fontFamily: sfProTextBold,
                  flexWrap: 'wrap',
                }}>
                {title}
              </Text>
              <Card.Cover
                source={{uri: photo}}
                style={{backgroundColor: '#fff'}}
                resizeMode="contain"
              />
              <Text style={{fontWeight: '500'}}>
                {convertStartTime(time) + ' - ' + convertEndTime(end_time)}
              </Text>
              <Text style={{fontWeight: '500'}}>
                {room_number ? location + ' ' + room_number : location}
              </Text>
              <Text>{description}</Text>
            </View>
          </ScrollView>
          <IconButton
            icon="close"
            size={30}
            style={{position: 'absolute', top: scale(10), right: scale(10)}}
            onPress={closeModal}
          />
        </View>
      </Modal>
    </Portal>
  );
}
