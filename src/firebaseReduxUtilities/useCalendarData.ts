import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {withTokens} from './tokens';
import {useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL} from './constants';
import {updateMyUserAction} from '../redux/actions';

export const getCalendarEvents = async () => {
  const {idToken} = await withTokens();
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

// export const addCalendarEvent = async ({
//   idToken,
//   eventData,
// }: {
//   idToken?: string;
//   eventData?: any;
// }) => {
//   const accessToken = (await withTokens()).accessToken;
//   try {
//     const response = await axios.post(
//       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//       eventData,
//       {
//         headers: {Authorization: `Bearer ${accessToken}`},
//       },
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const syncCalendarEvents = async () => {
  const myUserId = store.getState().data.myUserId;
  const {accessToken, idToken, authToken} = await withTokens();

  try {
    const request = await fetch(`${API_URL}/syncGoogleCalendar`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: myUserId,
        idToken: idToken,
        accessToken: accessToken,
        authToken: authToken,
      }),
    });

    const data = await request.json();
    if (data?.error) throw new Error(data?.error);
    store.dispatch(updateMyUserAction({data}));
  } catch (error) {
    throw new Error('Failed to get current courses: ' + error);
  }
};

export default function useCalendarData() {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const quarter = useSelector((state: ReduxState) => state.data.quarter);
  const isSynced = useSelector(
    (state: ReduxState) =>
      state.data.usermap[myUserId]?.syncedCalendar?.quarter === quarter,
  );
  return {isSynced};
}

// exportTestEvent
