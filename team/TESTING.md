Experimented with using JEST, JavaScript Testing Framework, where we implemented unit tests using it.

The Unit Test we made can be found in the dining.test.js file of ./test folder 

We implemented the unit test requirement from last lab by attempting to get an invalid list of meals from portola, and expecting the function to fail.
This mainly tested the dining fetch API part of the code, with just a standard jest .expect
We are definitely not going to really do many unit tests unless if its an absolutely critical piece of infrastructure, which is unlikely as the most critical pieces have already been thoroughly manually tested and are working. Our stuff that we are working on deals with frontend UI stuff, which is comparitively much easier to debug, and makes doing comprehensive unit testing a complete waste of time.

As for the component test, we decided to test how the events page loaded this time, by simulating the frontend code and mocking the backend axios call to the campuscalendar site with their own generated events. This used the standard jest stuff as well as the standard testing library stuff that can be found here:

https://testing-library.com/docs/react-native-testing-library/example-intro/

As for whether or not we are going to do higher-level testing, probably not. At this point, it'd be mostly a waste of time. Again, we aren't directly working and improving on the absolutely critical code, so there is literally 0 need to test it beyond a look at the screen and looking at logs within the code.