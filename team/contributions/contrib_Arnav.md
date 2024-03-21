## Installation Help

- Searching From: Arnav Kumar in the PJ 14 Slack channel using the message filter tool and navigating to pages 8 and 9 shows how much effort I put into helping others with their Ruby installations (hours and hours outside of class). I also spent a lot of that week, and perhaps the next week (memory doesn't serve well here) helping with installations during class.

## Code
- Google Calendar integration during the MVP, which served as a great foundation for the last-minute add event feature on the events page.
- Wrote react-native-paper transformations for the schedule screen, chat screen, and Events screen (for the final evolution of the Events UI). Greatly improved visual aesthetic in the process, thus making good use of the user feedback received during the UAT sessions in class. Also tested prototyped colors in Figma (blue and gold) to perform A/B comparisons between different color schemes for the app in response to user feedback on an unnatural color scheme with little contrast.
- ROLLBACKS: Implemented a chat screen feature where the last message sent in the chat is previewed on the card that has the "Show chat" button in the form {Sender}: {Message}. Also implemented a react-native-paper button that dynamically resized to replace hard-to-manage react-native buttons that had hardcoded values for items like position and font size. Both changes were overridden and rolled back at the last minute before the code freeze due to personal preferences and unforeseen, third-party server-side issues.
- Worked on the slides and presented my portion of work on the app.

## Feature Research
- Performed intensive research on machine learning methods for events (Tensorflow Lite recommender for document ranking), wanting to implement it formally at first, but then realizing, after much enumeration and decision-making, that it would be too unwieldy for the purposes of the class and the time we had left to work together on it as a team.
- Performed intensive research for potentially integrating Storyboard into our app as it was critical for testing component rendering locally since an Android authentication bug discovered around weeks 6/7 in our app prevented tests on Android. After researching, I saw that it was possible for our app framework and architecture, even writing some preliminary code for it. However, the team ultimately decided against it, and we accepted the technical debt of the Android bug at least until the end of the course.
