import React from 'react';
import { View, Text } from 'react-native';
import {Card, Paragraph} from 'react-native-paper'

const EventComponent = ({ data }: { data: any[] }) => {
  return (
    <Card>
      {data.map(item => ( 
        <View key={item.id}> 
          <Card.Title title={item.title} />
          <Card.Content>
            <Paragraph> {item.description} </Paragraph>
          </Card.Content>
          <Card.Cover source={{uri: item.photo}}/>
        </View>
      ))}
      
    </Card>
  );
};

export default EventComponent;

/*
<img src={item.photo}/> 
          <Text>{item.description}</Text>
          */