import {addCalendarEvent} from '../../../../firebaseReduxUtilities/useGoogleCalendarIntegration';
import {withTokens} from '../../../../firebaseReduxUtilities/tokens';
import {Alert} from 'react-native';

export const addTestEventToCalendar = () => {
  const eventData = {
    summary: 'Test Event',
    location: 'Virtual',
    description: 'This is a test event added from Coral app',
    start: {
      dateTime: '2024-02-07T09:00:00-07:00', // Example date
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2024-02-07T10:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
  };

  Alert.alert(
    'Add Test Event to Calendar',
    'This will add a sample event to your google calendar.',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Create Event',
        onPress: () =>
          addCalendarEvent({eventData})
            .then(() => {
              Alert.alert('Success', 'Event added successfully');
            })
            .catch(error => {
              console.error(error);
              Alert.alert('Error', 'Failed to add event');
            }),
      },
    ],
  );
};
