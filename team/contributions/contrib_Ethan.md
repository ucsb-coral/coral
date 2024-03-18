# Ethan's Contributions

## Google Calendar Integration (Frontend)

- Removed old hasty in-app calendar implimentation
- Sync courses with calendar - Add every enrolled course as an event in gcal 
- Organize like classes by color
- Events recur from the first to last instance of the quarter
- Popup notifications can be added and toggled on and off
- Calendar can be resynced or deleted
- Can share course calendar seemlessly with a personal google account
- Can add daily current events to the same subcalendar as courses

## Google Calendar Integration (Server Side)

- Scheduled RB function to track current quarter start and end days automatically
- Sync node endpoint function to remove anything thats already there, get current courses, formute gcal events w specific colors, recurrences, details, etc..., and add events to a new subcalendar on UCSB google account
- Reminder toggle node endpoint function to add or remove reminders to each event in our subcalendar
- Delete Calendar node endpoint function to undo calendar sync
- Share with personal calendar node endpoint function to share the course calendar to a non-UCSB account

## Project Management / Ownership

As the only person from the original dev team and having years of experience with React Native, Node, and the other parts of our stack, didn't initially intend to write all that much code - I knew I would be more useful to my team spending my time floating around and helping to clarify things like:

- Stack details
- best practices
- getting started w new technologies
- debugging dev-ops and env issues

I probably spent about half of my time in this project on zoom calls or in person working on this kind of stuff, but I did also end up writing a lot of code. One of our team members abandoned us very early and I picked up the Google Calendar Integration project. In addition, I helped write a fair amount code on the following features:

- Dining filtering UI / data handling
- Event Paper UI integration & help with add-to-calendar feature
- server functions for these services