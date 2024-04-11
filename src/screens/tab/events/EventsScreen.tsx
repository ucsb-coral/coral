import React, {useState, useEffect, useRef} from 'react';
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
import LoadingOverlay from '../../../components/LoadingOverlay';

export type EventsScreenProps = EmptyProps;

type EventsPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'chats'>
>;

export default function EventsScreen({route, navigation}: EventsPageProps) {
  //const [meal, setMeal] = useState<Meal>(null);
  const [eventData, setEventDetails] = useState<SchoolEvent[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      </LoadingOverlay>
    </Loading>
  );
}
