import axios from 'axios';

const EVENTS_AL_URL = 'https://campuscalendar.ucsb.edu/api/2/events';
//const MENU_URL_BASE = 'https://api.ucsb.edu/dining/menu/v1';

// Functions to get dining commons and their "code" (used in the menu URL)
export const getEventDetails = async () => {
  try {
    const response = await axios.get(EVENTS_AL_URL);
    // Extract only the name and code from each dining common

    /*
    return response.data.events.map((common : any) => ({
      title: common.title,  // The title of the event
      description: common.description_text,   // The description text of the event. description also exists, but its pretty wonky
      url: common.localist_url,   //the url to the event. Arguably I could probably just do venue_url but idk
      photo: common.photo_url, //the url of the photo for the event
      location: common.location_name, //the name of the location
      urlname: common.urlname   //not sure what this is for, but I might need it later
      //might add or remove some of these later
    })); */
    console.log('response data from API: ', response.data.events);

    const events = response.data.events.map((object: any) => {
      const {id, title, description_text, photo_url} = object.event;
      return {
        id,
        title,
        description: description_text,
        photo: photo_url,
      } as SchoolEvent;
    });

    return events;
  } catch (error) {
    console.error(error);
    throw error;
  } // I think this can be handled via .catch() as well, but this works still
};

// Usage in a React component
/*
useEffect(() => {
  const fetchMenus = async () => {
    const diningCommons = await getDiningCommons();
    const menus = await Promise.all(diningCommons.map(common => 
      getMenusForCommon(common.code, 'breakfast') // or 'lunch' or 'dinner'
    ));
    // Do something with menus
  };

  fetchMenus();
}, []);
*/
