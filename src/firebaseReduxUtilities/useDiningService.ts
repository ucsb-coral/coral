import axios from 'axios';

const DINING_COMMONS_URL = 'https://api.ucsb.edu/dining/commons/v1';
const MENU_URL_BASE = 'https://api.ucsb.edu/dining/menu/v1';

// Utility function to format today's date as yyyy-mm-dd
// I don't know if this is the best way to do it, but it should work
const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

// Function to get the menu for a specific dining common and meal (breakfast, lunch, or dinner) on the current day
// note that the meal is a string, either 'breakfast', 'lunch', or 'dinner' and is selected by the user in the app
export const getMenusForCommon = async (code: string, meal: string) => {
  const date = getFormattedDate();
  try {
    const url = `${MENU_URL_BASE}/${date}/${code}/${meal}`;
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'ucsb-api-key': '9AFbI7iNjkV0yau8ou9Zo6oq2S7oAAme',
      },
    });
    console.log(`Got a response back for code: ${code}, meal: ${meal}`);
    return response.data;
  } catch (error) {
    console.log(`Bad bad: ${code}, meal: ${meal}`);
    console.error(error);
    throw error;
  }
};
