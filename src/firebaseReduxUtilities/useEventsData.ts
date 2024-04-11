import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {updateMyUserAction} from '../redux/actions';

//const EVENTS_AL_URL = 'https://campuscalendar.ucsb.edu/api/2/events';
//const MENU_URL_BASE = 'https://api.ucsb.edu/dining/menu/v1';

const eventsCollection = firestore().collection('events');

// Functions to get dining commons and their "code" (used in the menu URL)
export const getEventDetails = async () => {
  try {

    const snapshot = await eventsCollection.get();
    const events: any[] = [];
    snapshot.forEach(doc => {
      console.log('event data: ', doc.data());
      const data = doc.data();
      const {title, description, photoUrl, start, end, locationName, roomNumber} = data;
      events.push({
        id : doc.id,
        title,
        description,
        photo: photoUrl,
        time: start.toDate(),
        end_time: end.toDate(),
        location: locationName,
        room_number: roomNumber
      } as SchoolEvent);
    });
    return events;

    // Old version that directly pulls form the API

    // const response = await axios.get(EVENTS_AL_URL);

    // // Extract only the name and code from each dining common

    // console.log('response data from API: ', response.data.events);

    // const events = response.data.events.map((object: any) => {
    //   const {id, title, description_text, photo_url, event_instances, location_name, room_number} = object.event;
    //   return {
    //     id,
    //     title,
    //     description: description_text,
    //     photo: photo_url,
    //     time: new Date(event_instances[0]?.event_instance?.start),
    //     location: location_name,
    //     room_number: room_number
    //   } as SchoolEvent;
    // });

    // return events;
  } catch (error) {
    console.error(error);
    throw error;
  } // I think this can be handled via .catch() as well, but this works still
};

export const addDummyEvent = (currentEvents : SchoolEvent[] | null, event : SchoolEvent): SchoolEvent[] => {
  
  //will expand this into a proper function later
  let newEvents : SchoolEvent[];

  if (currentEvents == null) {
    newEvents = [];
  } else {
    newEvents = currentEvents;
  }

  console.log("adding dummy event to events lists");

  newEvents.push(event);

  return newEvents;
};

// Usage in a React component
/*
useEffect(() => {
  const fetchMenus = async () => {
    const diningCommons = await getDiningCommons();
    const menus = await Promise.all(diningCommons.map(common => 
      getMenusForCommon(common.code, 'breakfast') // or 'lunch' or 'dinner'
    ));
    // Do something with menus
  };

  fetchMenus();
}, []);
*/
