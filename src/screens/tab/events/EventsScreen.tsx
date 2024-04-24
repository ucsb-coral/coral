import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Button} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {appStackNavigate, AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {getEventDetails, addDummyEvent} from '../../../firebaseReduxUtilities/useEventsData';
import uuid from 'react-native-uuid';
import SchoolEvent from './components/SchoolEvent';
import SchoolModal from './components/SchoolModal';
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
  title: "",
  description: "",
  photo: "https://www.popsci.com/uploads/2023/05/15/ButterflyFamilyTree.png?auto=webp&optimize=high&width=1440",
  time: new Date(Date.now()+1*60*60*1000), //Date.now()+1*60*60*1000
  end_time: new Date(Date.now()+2*60*60*1000), //Date.now()+2*60*60*1000
  location: "",
  room_number: ""
}

export default function EventsScreen({route, navigation}: EventsPageProps) {
  //const [meal, setMeal] = useState<Meal>(null);
  // const [eventData, setEventDetails] = useState<SchoolEvent[] | null>(null);
  const events = useSelector(
    (state: ReduxState) => state.data.events,
  );

  console.log("[Events Screen] events list:", events);

  const [isLoading, setLoading] = useState<boolean>(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const dummyAdd = () =>  
  //   setEventDetails(addDummyEvent(eventData, dummyEvent));
  // ;

  const openEditor = (event: SchoolEvent) =>
    appStackNavigate(navigation, 'editEvent', {'event': event});

  // useEffect(() => {
  //   getEventDetails().then(setEventDetails); //this will be where we will store our events
  //   //setEventDetails(getEventDetails());
  // }, []);

  const renderItem = ({item}: {item: SchoolEvent}) => {
    return (
      <SchoolEvent
        id={item.id}
        title={item.title}
        description={item.description}
        photo={item.photo}
        time={new Date(item.time)}
        end_time={new Date(item.end_time)}
        location={item.location}
        room_number={item.room_number}
        setLoading={setLoading}
        loadingTimeoutRef={loadingTimeoutRef}
      />
    );
  };

  return (
    <Loading isReady={events !== null}>
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
                  data={Object.values(events)}
                  renderItem={renderItem} // Render your custom component
                  keyExtractor={item => `${item.id}`}
                  ItemSeparatorComponent={() => <View style={{height: 10}} />}
                />          
                <FAB
                  style={{ position: 'absolute', right: 16, bottom: 16 }}
                  icon="plus"
                  onPress={() => {
                    let newEvent = JSON.parse(JSON.stringify(dummyEvent)); // clone the dummy event
                    newEvent.id = uuid.v4();
                    openEditor(newEvent);
                  }} 
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
        {/* <SchoolModal
          id={dummyEvent.id}
          title={dummyEvent.title}
          description={dummyEvent.description}
          photo={dummyEvent.photo}
          time={dummyEvent.time}
          end_time={dummyEvent.end_time}
          location={dummyEvent.location}
          room_number={dummyEvent.room_number}
          modalVisible={isModalVisible}
          closeModal={closeModal}
          setLoading={(loading) => setLoading(loading)}
          loadingTimeoutRef={loadingTimeoutRef}
        /> */}
      

      </LoadingOverlay>
    </Loading>
  );
}
