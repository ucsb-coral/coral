import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {useEffect} from 'react';
var shajs = require('sha.js');


const getDiningCommonMenu = async ({
  code,
  meal
}: {
  code: string;
  meal: string;
}) => {

  try {
    const request = await fetch(`${API_URL}/getDiningCommonMenu`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        code,
        meal,
      }),
    });
    const menu = await request.json();
    return menu;
  } catch (error) {
    return null;
  }
};
