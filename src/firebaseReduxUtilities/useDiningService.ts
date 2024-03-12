
import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {updateCoursesAction} from '../redux/actions';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {useEffect} from 'react';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
var shajs = require('sha.js');

const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};


firestore().collection('dining').doc("apiData").collection("commons");

const getDiningMealsRef = (meal : string) =>
firestore().collection('dining').doc("apiData").collection("meals");

const getDiningCommonsRef = (code: string) =>
  firestore().collection('dining').doc("apiData").collection("commons");


export const getMenusForCommon = async (
  code: string,
  meal: string) => {
  //const date = getFormattedDate();
  //const diningCommonsRef = getDiningCommonsRef(code);
  const mealsRef = firestore().collection('dining').doc("apiData").collection("meals");
  try {
    const snapshot = await mealsRef
      .where('common', '==', code)
      .where('meal', '==', meal)
      .get();

    let menuItems: string[] = [];
    snapshot.forEach((doc) => {
      //console.log(doc.id, '=>', doc.data());
      menuItems.push(doc.data().name); 
      //console.log(menuItems[3]);
      console.log(doc.data().name);
    });
    return menuItems;
  } catch (error) {
    console.error("Error getting documents: ", error);
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
