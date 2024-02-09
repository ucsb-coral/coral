// // Import the function to test
// import { addCalendarEvent } from '../../../firebaseReduxUtilities/useGoogleCalendarIntegration';
// import * as jest from 'jest';
// import axios from 'axios';

// // Mock axios to prevent actual HTTP requests
// jest.mock('axios', () => ({
//   post: jest.fn(() => Promise.resolve({ data: 'Event added successfully' }))
// }));

// describe('addCalendarEvent', () => {
//   it('calls axios.post with correct parameters and logs the response', async () => {
//     // Test data for the function
//     const idToken = 'test-id-token';
//     const eventData = {
//       summary: 'Test Event',
//       location: 'Online',
//       description: 'This is a test event',
//       start: {
//         dateTime: '2024-02-05T09:00:00-07:00',
//         timeZone: 'America/Los_Angeles',
//       },
//       end: {
//         dateTime: '2024-02-05T10:00:00-07:00',
//         timeZone: 'America/Los_Angeles',
//       },
//     };

//     // Mock console.log to verify it gets called
//     console.log = jest.fn();

//     // Call the function with the test data
//     await addCalendarEvent({ idToken, eventData });

//     // Verify axios.post was called correctly
//     expect(axios.post).toHaveBeenCalledWith(
//       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//       eventData,
//       { headers: { Authorization: `Bearer ${idToken}` } }
//     );

//     // Verify console.log was called with the expected response
//     expect(console.log).toHaveBeenCalledWith('Event added successfully');
//   });

//   // Handle error cases or other scenarios as needed
// });
