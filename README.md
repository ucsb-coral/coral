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