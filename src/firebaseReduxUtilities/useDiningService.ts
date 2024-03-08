
import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {updateCoursesAction} from '../redux/actions';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {useEffect} from 'react';
import axios from 'axios';
var shajs = require('sha.js');

const url = `${API_URL}/getCurrentMenus`;

const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const getMenusForCommon = async (
  code: string, meal: string) => {
  const date = getFormattedDate();
  const {idToken, authToken} = await withTokens();
  
  try {
    const request = await fetch(`${API_URL}/getCurrentMenus`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        code,
        meal,
      }),
    });
    
    const menu = (await request.json()) as Menu[];
    console.log('menus', menu);
    return menu;
    /*
    const response = await fetch(`${API_URL}/getCurrentMenus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({code, meal, date }),
    });*/

  } catch (error) {
    console.error('Error fetching menus:', error);
    // Additional logging for debugging
    console.error('Request details:', {
      code,
      meal,
      date,
      API_URL,
      //url,
    });
    // Re-throw the error to handle it further up the call stack
    throw error;
  }
};



//ALL MOVED TO SERVER SIDE
// Will need to change from calling the API to now calling our server.

/*
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
// code is the dining common code, e.g. 'carrillo', 'de-la-guerra', 'ortega', 'portola'
export const getMenusForCommon = async (code: string, meal: string) => {
  const date = getFormattedDate();
  try {
    const {authToken} = await withTokens();
    const url = `${MENU_URL_BASE}/${date}/${code}/${meal}`;
    //const url = `${MENU_URL_BASE}/${date}/${common}/${code}/${meal}`;
    
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
*/
