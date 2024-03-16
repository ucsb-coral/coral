import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {withTokens} from './tokens';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {API_URL} from './constants';
import {updateMyUserAction} from '../redux/actions';
import {Alert} from 'react-native';

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
    Alert.alert('Success', 'Synced courses to UCSB calendar');
  } catch (error) {
    Alert.alert('Failed', 'Failed to sync courses to UCSB calendar');
  }
};

export const shareToPersonalEmail = async (email: string) => {
  const myUserId = store.getState().data.myUserId;
  const {accessToken, authToken} = await withTokens();
  console.log('sharing to : ', email);
  try {
    const request = await fetch(`${API_URL}/shareToPersonalEmail`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: myUserId,
        email,
        accessToken: accessToken,
        authToken: authToken,
      }),
    });
    console.log('sharing : ', request);

    const data = await request.json();
    console.log('data', data);
    const success = data?.success;
    if (!success) throw new Error();
    Alert.alert('Success', 'Shared to personal calendar');
  } catch (error) {
    console.log('errordvd', error);
    Alert.alert('Failed', 'Failed to share to personal calendar');
  }
};

export const testEvent = async () => {
  const myUserId = store.getState().data.myUserId;
  const {accessToken, idToken, authToken} = await withTokens();

  try {
    const request = await fetch(`${API_URL}/test`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: myUserId,
        eventId: '44832576496273',
        accessToken: accessToken,
        authToken: authToken,
      }),
    });

    const data = await request.json();
    console.log(data);
    // if (data?.error) throw new Error(data?.error);
    // store.dispatch(updateMyUserAction({data}));
  } catch (error) {
    throw new Error('Failed to get current courses: ' + error);
  }
};

export const deleteCalendar = async () => {
  const myUserId = store.getState().data.myUserId;
  const {accessToken, authToken} = await withTokens();

  try {
    const request = await fetch(`${API_URL}/deleteCalendar`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: myUserId,
        accessToken: accessToken,
        authToken: authToken,
      }),
    });
    const data = await request.json();
    const success = data?.success;
    if (!success) throw new Error();
    store.dispatch(updateMyUserAction({data: {syncedCalendar: undefined}}));
    Alert.alert('Success', 'Deleted UCSB calendar');
  } catch (error) {
    console.log('WEFVWEFVWEF', error);
    Alert.alert('Failed', 'Failed to Delete UCSB calendar');
  }
};

export const toggleReminders = async (withReminders: boolean) => {
  const myUserId = store.getState().data.myUserId;
  const {accessToken, authToken} = await withTokens();

  try {
    const request = await fetch(`${API_URL}/toggleReminders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: myUserId,
        withReminders,
        accessToken: accessToken,
        authToken: authToken,
      }),
    });

    const data = await request.json();
    if (!data) throw new Error(data?.error);
    Alert.alert(
      'Success',
      `Reminders have been turned ${
        withReminders ? 'on' : 'off'
      } for you UCSB calendar`,
    );
    return data.withReminders;
  } catch (error) {
    Alert.alert(
      'Failed',
      `Failed to turn reminders ${
        withReminders ? 'on' : 'off'
      } for you UCSB calendar`,
    );
  }
};

export default function useCalendarData() {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const quarter = useSelector((state: ReduxState) => state.data.quarter);
  const syncedCalendar = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId]?.syncedCalendar,
  );
  const isSynced = syncedCalendar?.quarter === quarter;
  const withReminders = !!syncedCalendar?.withReminders;
  const [withRemindersOptimistic, setWithRemindersOptimistic] =
    useState<boolean>(withReminders);

  useEffect(() => {
    setWithRemindersOptimistic(withReminders);
  }, [withReminders]);

  const toggleWithReminders = async () => {
    const initial = withRemindersOptimistic;
    const withReminders = await toggleReminders(!initial);
    if (typeof withReminders === 'boolean')
      setWithRemindersOptimistic(withReminders);
    else setWithRemindersOptimistic(initial);
  };

  return {
    isSynced,
    withRemindersOptimistic,
    setWithRemindersOptimistic,
    toggleWithReminders,
  };
}

// exportTestEvent
