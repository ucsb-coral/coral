import {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Paragraph, Button, Modal, Portal, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { addEvent } from '../../../../firebaseReduxUtilities/useEventsData';

export type Props = SchoolEvent;

const nullDate = new Date('1970-01-01T00:00:00.000Z').getTime();

function convertStartTime(time: Date) {
  return time.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', // Add the hour component
    minute: '2-digit', // Display minutes with two digits
    hour12: true // Use 12-hour clock (optionally add AM/PM if desired)
  });
}

function convertEndTime(time: Date) {
  if (time.getTime() == nullDate || time == null) {
    // console.log('null time');
    return "All Day";
  }
  return time.toLocaleString('en-US', { 
    hour: 'numeric', // Add the hour component
    minute: '2-digit', // Display minutes with two digits
    hour12: true // Use 12-hour clock (optionally add AM/PM if desired)
  });
}

type ModalProps = {
  id: string,
  title : String, 
  description : String, 
  photo : string, //for some reason, it must be kept to this for Card.Cover to understand it
  time : Date, 
  end_time : Date,
  location : String, 
  room_number : String,
  modalVisible: boolean;
  closeModal: () => void;
}

export default function SchoolModal({id, title, description, photo, time, end_time, location, room_number, modalVisible, closeModal} : ModalProps) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
    }})

    const modalStyle = { padding: 10, backgroundColor: 'white'};
    const modalStyle2 = { flex: 1, justifyContent: 'center', alignItems: 'center' };
    
    const addEventToCalendar = () => {
      console.log('add event to calendar');
      addEvent(id);
    }

    const userId = useSelector((state : ReduxState) => state.data.myUserId);
    const syncedCalendar = useSelector((state : ReduxState) => state.data.usermap[userId].syncedCalendar);
    const quarter = useSelector((state : ReduxState) => state.data.quarter);
    const isSynced = syncedCalendar?.quarter === quarter;

  return (
    //be sure to fix the styling so that the image size is bounded in case of too big photos if it messes up
    <Portal>
      <Modal visible={modalVisible} onDismiss={closeModal}>
        <View style={modalStyle}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ backgroundColor: 'white', padding: 20 }}>
              <Text style={{fontWeight: '900', flexWrap: 'wrap'}}>
                {title}
              </Text>
              <Card.Cover source={{uri: photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>
              { isSynced &&
              <View style={{ padding: 10 }}>
                <Button 
                  mode="contained" 
                  onPress={addEventToCalendar}
                  style={{ backgroundColor: '#EF5645'}}
                >
                  Add Event to Calendar
                </Button>
              </View>
              }
              <Text style={{fontWeight: '500'}}>
                {convertStartTime(time) + " - " + convertEndTime(end_time)}
              </Text>
              <Text style={{fontWeight: '500'}}>
                {room_number ? location + " " + room_number : location}
              </Text>
              <Text>
                {description}
              </Text>
              <IconButton                 
                  icon="close"
                  size={30}
                  style={{ position: 'absolute', top: 0, right: 0 }} 
                  onPress={closeModal} />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
}