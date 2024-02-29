import {useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Paragraph, Button, Modal, Portal, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export type Props = SchoolEvent;

function convertTime(time : Date) {
  //return(time.toLocaleDateString('en-GB',{ year: 'numeric', month: 'long', day: 'numeric' }));
  return time.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const bigSentence = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";

export default function SchoolEvent({title, description, photo, time, location, room_number}: Props) {

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const descString = description.substr(0,100) + "...";

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
                <Text>
                  {description}
                </Text>
                <Text style={{fontWeight: '500'}}>
                  {room_number ? location + " " + room_number : location}
                </Text>

                <IconButton icon="close" style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => setModalVisible(false)} />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

// Image doesn't work but Card.Cover does for some reason? <Image source={{uri: photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>

/*


<Button
                icon="close-outline"
                style={{ position: 'absolute', top: 10, right: 10 }}
                onPress={closeModal}
              />
*/

/*
<View style={{}}>
      <Text
        style={{
          fontWeight: '700',
        }}>
        {title}
      </Text>
      <Text>{description}</Text>
      <Image source={{uri: photo}} />
    </View>
    */
