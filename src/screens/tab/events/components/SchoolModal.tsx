import {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Paragraph, Button, Modal, Portal, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

export type Props = SchoolEvent;

function convertTime(time : Date) {
  //return(time.toLocaleDateString('en-GB',{ year: 'numeric', month: 'long', day: 'numeric' }));
  return time.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

type ModalProps = {
  title : String, 
  description : String, 
  photo : string, //for some reason, it must be kept to this for Card.Cover to understand it
  time : Date, 
  location : String, 
  room_number : String,
  modalVisible: boolean;
  closeModal: () => void;
}

export default function SchoolModal({title, description, photo, time, location, room_number, modalVisible, closeModal} : ModalProps) {

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
              <Text style={{fontWeight: '500'}}>
                {convertTime(time)}
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