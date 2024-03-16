import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {getEventDetails} from '../../../firebaseReduxUtilities/useEventsData';
import SchoolEvent from './components/SchoolEvent';
//import { EventComponent } from './EventComponent'

import {PaperProvider} from 'react-native-paper';
import Loading from '../../../components/Loading';
import Header from '../../../components/header/Header';

export type EventsScreenProps = EmptyProps;

type EventsPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

export default function EventsScreen({route, navigation}: EventsPageProps) {
  //const [meal, setMeal] = useState<Meal>(null);
  const [eventData, setEventDetails] = useState<SchoolEvent[] | null>(null);
  const [menus, setMenus] = useState<string[]>([]);
  const [requestString, setRequestString] = useState<string>('');

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
      end_time={item.end_time}
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
      <Header centerElement={'Upcoming Events'} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {
          //works but throws up stuff on screen
          /*eventData.map((event: SchoolEvent, index: number) => (
        <SchoolEvent key={event.id} {...event} />
      ))
        */
          <View style={{flex: 1, width: '100%'}}>
            <PaperProvider>
              <FlatList
                data={eventData}
                renderItem={renderItem} // Render your custom component
                keyExtractor={item => `${item.id}`}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
              />
            </PaperProvider>
          </View>
        }
        {/* */}

        {
          //attept to display events
          /* eventData.length > 0 ? (
      //console.log("eventData successfully proceded, with array ", eventData);
      eventData.map((event, index) => (
        <Text key={index}>
          {eventData[index]} {event.description}
        </Text>
        
      ))) : ( 
      <Button title="Get Events" onPress={() => setEventDetails(getEventDetails())}/>
      )
      */
        }
      </View>
    </Loading>
  );
}
