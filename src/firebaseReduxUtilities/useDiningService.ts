import axios from 'axios';
import {API_URL} from './constants';
import {withTokens} from './tokens';

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
    const {authToken} = await withTokens();
    const url = `${MENU_URL_BASE}/${date}/${code}/${meal}`;
    console.log('timeStart');
    const request = await fetch(`${API_URL}/publicUcsbApi`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        authToken,
        url,
      }),
    });
    const meals = await request.json();
    console.log('timeEnd');
    console.log('meals', meals);
    console.log(`Got a response back for code: ${code}, meal: ${meal}`);
    return meals;
  } catch (error) {
    console.log(`Bad bad: ${code}, meal: ${meal}`);
    console.error(error);
    throw error;
  }
};
