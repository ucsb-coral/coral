import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Button} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {getEventDetails, addDummyEvent} from '../../../firebaseReduxUtilities/useEventsData';
import SchoolEvent from './components/SchoolEvent';
//import { EventComponent } from './EventComponent'

import {PaperProvider, FAB} from 'react-native-paper';
import Loading from '../../../components/Loading';

import Header from '../../../components/header/Header';
import LoadingOverlay from '../../../components/LoadingOverlay';
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
  id: getRandomInt(1000).toString(),
  title: "dummyEvent",
  description: "this is a dummy event \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
  photo: "https://www.popsci.com/uploads/2023/05/15/ButterflyFamilyTree.png?auto=webp&optimize=high&width=1440",
  time: new Date('2027-03-08T00:00:00-08:00'),
  end_time: new Date('2027-03-09T00:00:00-08:00'),
  location: "USA, anywhere",
  room_number: "4001"
}

export default function EventsScreen({route, navigation}: EventsPageProps) {
  //const [meal, setMeal] = useState<Meal>(null);
  const [eventData, setEventDetails] = useState<SchoolEvent[] | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dummyAdd = () => 
    setEventDetails(addDummyEvent(eventData, dummyEvent));
  ;

  useEffect(() => {
    getEventDetails().then(setEventDetails); //this will be where we will store our events
    //setEventDetails(getEventDetails());
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
      setLoading={setLoading}
      loadingTimeoutRef={loadingTimeoutRef}
    />
  );

  return (
    <Loading isReady={eventData !== null}>
      <LoadingOverlay isLoading={isLoading}>
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
                <FAB
                  style={{ position: 'absolute', right: 16, bottom: 16 }}
                  icon="plus"
                  onPress={dummyAdd} 
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
      */
          }
        </View>
      </LoadingOverlay>
    </Loading>
  );
}
