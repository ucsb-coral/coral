import {useState} from 'react'
import { View, TouchableOpacity} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import SchoolModal from './SchoolModal'

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
  console.log('end time: ', time);
  console.log('null date: ', nullDate);
  if (time.getTime() == nullDate || time == null) {
    console.log('null time');
    return "All Day";
  }
  return time.toLocaleString('en-US', { 
    hour: 'numeric', // Add the hour component
    minute: '2-digit', // Display minutes with two digits
    hour12: true // Use 12-hour clock (optionally add AM/PM if desired)
  });
}

export default function SchoolEvent({id, title, description, photo, time, end_time, location, room_number}: Props) {

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
    },
  });

  const modalStyle = { padding: 10, backgroundColor: 'white'};
  const modalStyle2 = { flex: 1, justifyContent: 'center', alignItems: 'center' };

  return (
    //be sure to fix the styling so that the image size is bounded in case of too big photos if it messes up
    <View>
      <TouchableOpacity onPress={openModal}>
        <Card style={{backgroundColor: '#fff', width: '100%'}}>
          <View style={{}}> 
            <Card.Title title={title} titleStyle={{fontWeight: '700', flexWrap: 'wrap'}} />
            <Card.Cover source={{uri: photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>
            <Card.Content style={{width: '100%'}}>
              <Paragraph> {convertStartTime(time) + " - " + convertEndTime(end_time)} </Paragraph>
              <Paragraph> {room_number ? location + " " + room_number : location} </Paragraph>
            </Card.Content>
          </View>
        </Card>
      </TouchableOpacity>
      <SchoolModal id = {id.toString()} title={title} description={description} photo={photo} time={time} end_time={end_time} location = {location} room_number={room_number} modalVisible={modalVisible} closeModal={closeModal}/>  
    </View>
  );
}

// Image doesn't work but Card.Cover does for some reason? <Image source={{uri: photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>