import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {store} from '../redux/useRedux';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  setEventAction
} from '../redux/actions';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {updateMyUserAction} from '../redux/actions';
import {uploadImage} from '../utilities/images';

//const EVENTS_AL_URL = 'https://campuscalendar.ucsb.edu/api/2/events';
//const MENU_URL_BASE = 'https://api.ucsb.edu/dining/menu/v1';

const eventsCollection = firestore().collection('events');

const getEventDocumentRef = (eventID: string) =>
  eventsCollection.doc(eventID);

export const useEventsData = () => {
  const events = useSelector((state: ReduxState) => state.data.events);

  useEffect(() => {
    // const subscriptions: (() => void)[] = [];
    // if (!events) return;
    // Object.keys(events)
    //   .forEach(eventID => {
    //     console.log('useEventsData snapshot');
    //     const ref = getEventDocumentRef(eventID);
    //     const eventSubscription = ref.onSnapshot(snapshot => {
    //       console.log('useEventsData snapshot2', eventID);
    //       const data = snapshot.data() as SchoolEvent;
    //       store.dispatch(setEventAction({eventID, data}));
    //     });
    //     subscriptions.push(eventSubscription);
    //   });

    // console.log(`useEventsData outside ${events.length}`);

    const eventSubscription = eventsCollection.onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const {title, description, photoUrl, start, end, locationName, roomNumber} = data;
        console.log('useEventsData snapshot2', doc.id, data);
        
        const event = {
          id : doc.id,
          title,
          description,
          photo: photoUrl,
          time: start.toDate(),
          end_time: end.toDate(),
          location: locationName,
          room_number: roomNumber
        }
        store.dispatch(setEventAction({eventID: doc.id, data: event}));
      });
    });

    return () => {
      eventSubscription();
    };
  }, []);
}

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

export const updateEvent = async (event : SchoolEvent) => {
  await eventsCollection.doc(event.id).set({
    title: event.title,
    description: event.description,
    photoUrl: event.photo,
    start: event.time,
    end: event.end_time,
    locationName: event.location,
    roomNumber: event.room_number
  });
};

const deleteOldEventImage = async (eventID: string) => {
  // Retrieve the current profile picture URL from Firestore
  const currentEventDocRef = getEventDocumentRef(eventID);
  const docSnapshot = await currentEventDocRef.get();
  const previousImageURL = docSnapshot?.data()?.photoUrl;

  if (!previousImageURL) return;

  // Delete the previous image from Firebase Storage (if it exists)
  const googleusercontent = 'googleusercontent';
  if (previousImageURL.includes(googleusercontent)) return;
  const storageRef = storage().refFromURL(previousImageURL);
  await storageRef.delete();
};

const uploadEventImage = async (eventID: string, sourceUrl: string) => {
  const fileName = `${eventID}/${Date.now()}.jpg`;
  try {
    const url = await uploadImage(sourceUrl, fileName);
    return url;
  } catch (error) {
    console.error('Upload failed', error);
  }
};

export const updateEventImage = async (eventID: string, url: string) => {
  try {
    await deleteOldEventImage(eventID);
    const photo = await uploadEventImage(eventID, url);
    if (photo) {
      await eventsCollection.doc(eventID).set({
        photoUrl: photo
      }, {merge: true});
    }
    return photo;
  } catch (error) {
    console.error('Error updating event image', error);
  }
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
