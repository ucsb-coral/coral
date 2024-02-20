import { View, Text, Image } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export type Props = SchoolEvent;

export default function SchoolEvent({title, description, photo}: Props) {

  const descString = description.substr(0,100) + "...";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: 20,
      margin: 10,
    }})

  return (
    //be sure to fix the styling so that the image size is bounded in case of too big photos if it messes up
    <Card style={{backgroundColor: '#fff'}}>
      <View style={{}}> 
        <Card.Title title={title} titleStyle={{fontWeight: '700', flexWrap: 'wrap'}} />
        <Card.Cover source={{uri: photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>
        <Card.Content>
          <Paragraph> {descString} </Paragraph>
        </Card.Content>
      </View>
    </Card>

    
  );
}

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
