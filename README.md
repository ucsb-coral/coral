#pj-react-04 
-----
Schedule and group chat for UCSB student

Team members: 
* Binyu Zhong 
  [binyuzhong](<https://github.com/binyuzhong>)
* Ethan Pletcher
  [epletcher72](<https://github.com/epletcher72>)
* Jinghan Zhang
  [xxzjh](<https://github.com/xxzjh>)
* Sean Oh
  [seannoh](<https://github.com/seannoh>)
* Wenjin Li
  [Wenjin09](<https://github.com/Wenjin09>)

## Project Plan

UCSB students that login with their school accounts are able to access group chats and a calendar corresponding to the classes they are enrolled in. Group chats allow students taking the same courses to interact, communicate, and coordinate studying. Users are also able to view a calendar with their classes, as well as other events they can add.

## User Roles

General users are enrolled UCSB students:
- Users can login with their UCSB login
- Users can join and post in group chats
- Users can view and edit their calendar

## Permissions

Only valid UCSB students will be able to login and use the app.

## Technology Outline

### Frontend
- React Native
- React Native Navigation
- **Common Data Source**: Data from the weekly schedule may be obtained from the UCSB API (Consider using the CS156 dataset): https://developer.ucsb.edu/
- Google Calendar API (stretch goal)


### Backend
- **Real-time Chat Functionality**: Considering using WebSockets for real-time chat functionality.
- Firebase for Auth

## Installation
### Prerequisites
- An Android device with Android 5.0 or higher, or an Android emulator

### Dependencies
- react-native-firebase: to connect with our firebase backend
- react-native-google-signin: to implement google signin
- react-navigation: for cross platform tab and stack navigation
- react-native-bootsplash: for the splash screen
- react-redux: for app state management
- redux-persist: to persist the redux store on encrypted local device storage
- https://github.com/ucsb-cs184-f23/pj-react-04/blob/main/package.json

### Installation Steps
1. Head to [releases](https://github.com/ucsb-cs184-f23/pj-react-04/releases) and download the .apk file from the latest release onto your Android device or Android emulator
2. Open the file on your device and install the app
   - There will likely be some warnings about security of the app, but ignore and install anyways
3. Once installed open the app and log in with your UCSB google account

## Functionality
Once you have [installed](https://github.com/ucsb-cs184-f23/pj-react-04/edit/main/README.md#installation) the app and launched it, you will see a splash screen and then a login page. Click the Google signin button and follow the prompt instructions to sign in with your UCSB google email account (@ucsb.edu). The app will open to the Chats page initially where you can view the group chats you have joined (currently populated with dummy data). Navigate via the tabs on the bottom of the screen to the Schedule page to see a list of your enrolled courses (currently populated with dummy data). To join the chat corresponding to one of your courses, tap the course you want and tap "Join Chat". You will then see chat messages (currently populated with dummy data) and be able to send messages (not implemented). Navigating to the User page, you will see your information, links to GOLD and Canvas, as well as settings and a sign out button. 

## Known Problems
Currently, much of the functionality with regards to your personal course information and interacting in the chat windows is not implemented yet in the MVP. We plan to gain UCSB API access and complete these features in future releases.

## Contributing
Currently not accepting contributions while in early development. In the future follow these steps:
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D


## License
MIT License

Copyright (c) [2023] [Wenjin Li, Sean Oh, Ethan Pletcher, Binyu Zhong, Jinghan Zhang]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Deployment
Download the [latest version](https://github.com/ucsb-cs184-f23/pj-react-04/releases/tag/v2.0.0)