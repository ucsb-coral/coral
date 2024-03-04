import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {updateCoursesAction} from '../redux/actions';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {useEffect} from 'react';
var shajs = require('sha.js');

export const generateCourseId = (courseId: string, session: string | null) =>
  shajs('sha256')
    .update(`crs${courseId}${session ?? 'NONE'}`)
    .digest('hex');

const getCurrentCourses = async ({
  quarter,
  perm,
}: {
  quarter?: number;
  perm?: number;
}) => {
  const {idToken, authToken} = await withTokens();
  if (!quarter) quarter = store.getState().data.quarter;
  if (!perm)
    perm = store.getState().data.usermap[store.getState().data.myUserId].perm;

  try {
    const request = await fetch(`${API_URL}/getCurrentCourses`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        idToken,
        authToken,
        perm,
        quarter,
      }),
    });
    const courses = (await request.json()) as Course[];
    console.log('courses', courses);
    store.dispatch(updateCoursesAction({courses}));
    return true;
  } catch (error) {
    throw new Error('Failed to get current courses: ' + error);
    return false;
  }
};

export default function useCourseData() {
  useEffect(() => {
    const documentRef = firestore().collection('global').doc('data');

    const observer = documentRef.onSnapshot(
      docSnapshot => {
        const {quarter} = docSnapshot.data() as {quarter: number};
        if (quarter !== store.getState().data.quarter) {
          store.dispatch({type: 'SET_QUARTER', quarter});
          getCurrentCourses({quarter});
        }
      },
      err => {
        console.log(`Encountered error: ${err}`);
      },
    );
    return () => observer();
  }, []);
  return {};
}

export {useCourseData, getCurrentCourses};
