import React, {useState, useEffect} from 'react';
import {View, FlatList, Button} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {getEventDetails, addDummyEvent} from '../../../firebaseReduxUtilities/useEventsData';
import SchoolEvent from './components/SchoolEvent';
//import { EventComponent } from './EventComponent'

import {PaperProvider, IconButton} from 'react-native-paper';
import Loading from '../../../components/Loading';

//imports for events stuff

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export type EventsScreenProps = EmptyProps;

type EventsPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

const dummyEvent : SchoolEvent = {
  id: getRandomInt(10000000000),
  title: "dummyEvent",
  description: "this is a dummy event \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  photo: "https://www.popsci.com/uploads/2023/05/15/ButterflyFamilyTree.png?auto=webp&optimize=high&width=1440",
  time: new Date('2024-03-08T00:00:00-08:00'),
  location: "USA, anywhere",
  room_number: "4001"
}

export default function EventsScreen({route, navigation}: EventsPageProps) {
  //const [meal, setMeal] = useState<Meal>(null);
  const [eventData, setEventDetails] = useState<SchoolEvent[] | null>(null);
  const [menus, setMenus] = useState<string[]>([]);
  const [requestString, setRequestString] = useState<string>('');
  const [stateTest, setTestState] = useState<string>('');

  const dummyAdd = () => 
    setEventDetails(addDummyEvent(eventData, dummyEvent));
  ;
  const testAdd = () => setTestState("yes");

  useEffect(() => {
    getEventDetails().then(setEventDetails); //this will be where we will store our events
    //setEventDetails(getEventDetails());

    console.log('logging events', eventData); //time to see what this looks like
  }, []);

  const renderItem = ({item}: {item: SchoolEvent}) => (
    <SchoolEvent
      id={item.id}
      title={item.title}
      description={item.description}
      photo={item.photo}
      time={item.time}
      location={item.location}
      room_number={item.room_number}
    />
  );

  return (
    /* testing stuff:
    <Text>This loads!</Text>
      <Button title="update" onPress={() => setRequestString('test')} />
      <Button title="update2" onPress={() => setRequestString('test2')} />
      <Button title="logEvents" onPress={() => console.log(eventData)} />
      <Button
        title="logAPIcall"
        onPress={() => console.log(getEventDetails())}
      />
    */
    <Loading isReady={eventData !== null}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {
          //works but throws up stuff on screen
          /*eventData.map((event: SchoolEvent, index: number) => (
        <SchoolEvent key={event.id} {...event} />
      ))
        */
      <View style={{ flex: 1, width: '100%' }}>
        {/*<Button onPress={dummyAdd}>
            Add Event
          </Button> */}
        
        <PaperProvider>
          
          <FlatList
            data={eventData}
            renderItem={renderItem} // Render your custom component
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <IconButton                 
            icon="folder-open-outline"
            size={30}
            style={{ position: 'absolute', bottom: 0, right: 0 }} 
            onPress={dummyAdd} />
          
        </PaperProvider>
        
      </View>
      }
      {/* */}

        {
      /* 
      <Button title="Get Events" onPress={() => setEventDetails(getEventDetails())}/>
      */
        }
      </View>
    </Loading>
  );
}
