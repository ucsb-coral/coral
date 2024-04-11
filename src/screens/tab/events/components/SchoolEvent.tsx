import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import SchoolModal from './SchoolModal';
import {black} from '../../../../utilities/colors';
import {
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../../utilities/textfont';
import {scale} from '../../../../utilities/scale';


export type Props = SchoolEvent & {
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingTimeoutRef: MutableRefObject<NodeJS.Timeout | null>;
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
  console.log('end time: ', time);
  console.log('null date: ', nullDate);
  if (!time || time?.getTime() == nullDate) {
    console.log('null time');
    return 'All Day';
  }
  return time.toLocaleString('en-US', {
    hour: 'numeric', // Add the hour component
    minute: '2-digit', // Display minutes with two digits
    hour12: true, // Use 12-hour clock (optionally add AM/PM if desired)
  });
}

export default function SchoolEvent({
  id,
  title,
  description,
  photo,
  time,
  end_time,
  location,
  room_number,
  setLoading,
  loadingTimeoutRef,
}: Props) {

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const styles = StyleSheet.create({
    cardContainer: {
      margin: 10,
      borderWidth: 1, // Add border to the card
      borderColor: 'lightgray', // Card border color
      borderRadius: 8, // Rounded corners for the card
      overflow: 'hidden', // Ensures child components do not bleed outside the border
      backgroundColor: '#fff',
    },
    titleContainer: {
      padding: 16, // Ample padding around the title
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16, // Padding from top and bottom
    },
    imageStyle: {
      width: '90%', // Image takes most of the card width
      height: 200, // Fixed height for image
      resizeMode: 'contain',
    },
    timeLocationContainer: {
      padding: 16, // Ample padding around time and location
    },
    modalStyle: {
      padding: 10,
      backgroundColor: 'white',
    },
    modalContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={openModal}>
        <Card style={styles.cardContainer}>
          <View style={styles.titleContainer}>
            <Title
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                color: black,
                fontFamily: sfProTextBold,
                fontSize: scale(20),
              }}>
              {title}
            </Title>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: photo}} style={styles.imageStyle} />
          </View>
          <View style={styles.timeLocationContainer}>
            <Paragraph
              style={{
                color: black,
                fontFamily: sfProTextSemibold,
                fontSize: scale(16),
              }}>
              {convertStartTime(time) + ' - ' + convertEndTime(end_time)}{' '}
            </Paragraph>
            <Paragraph
              style={{
                color: black,
                fontFamily: sfProTextRegular,
                fontSize: scale(16),
              }}>
              {room_number ? `${location} ${room_number}` : location}
            </Paragraph>
          </View>
        </Card>
      </TouchableOpacity>
      <SchoolModal
        id={id.toString()}
        title={title}
        description={description}
        photo={photo}
        time={time}
        end_time={end_time}
        location={location}
        room_number={room_number}
        modalVisible={modalVisible}
        closeModal={closeModal}
        setLoading={setLoading}
        loadingTimeoutRef={loadingTimeoutRef}
      />
    </View>
  );
}

