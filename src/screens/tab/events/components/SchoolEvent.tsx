import {useState} from 'react'
import { View, TouchableOpacity} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import SchoolModal from './SchoolModal'

export type Props = SchoolEvent;

function convertTime(time : Date) {
  return time.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function SchoolEvent({title, description, photo, time, location, room_number}: Props) {

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
              <Paragraph> {convertTime(time)} </Paragraph>
              <Paragraph> {room_number ? location + " " + room_number : location} </Paragraph>
            </Card.Content>
          </View>
        </Card>
      </TouchableOpacity>
      <SchoolModal title={title} description={description} photo={photo} time={time} location = {location} room_number={room_number} modalVisible={modalVisible} closeModal={closeModal}/>  
    </View>
  );
}

// Image doesn't work but Card.Cover does for some reason? <Image source={{uri: photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>