import React from 'react';
import { View, Text } from 'react-native';

const EventComponent = ({ data }) => {
  return (
    <View>
      {data.map(item => ( 
        <View key={item.id}> 
          <img src={item.photo}/> 
          <Text>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default EventComponent;