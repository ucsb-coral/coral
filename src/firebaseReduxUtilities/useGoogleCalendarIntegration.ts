import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {withTokens} from './tokens';
import {useEffect} from 'react';
import axios from 'axios';

const eventData = {
  summary: 'Google I/O 2023',
  location: '800 Howard St., San Francisco, CA 94103',
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: '2023-05-28T09:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2023-05-28T17:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  // Additional event details...
};

export const getCalendarEvents = async ({idToken}: {idToken?: string}) => {
  if (!idToken) idToken = (await withTokens()).idToken;
  try {
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {Authorization: `Bearer ${idToken}`},
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const addCalendarEvent = async ({
  idToken,
  eventData,
}: {
  idToken?: string;
  eventData?: any;
}) => {
  const accessToken = (await withTokens()).accessToken;
  try {
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      eventData,
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// exportTestEvent
