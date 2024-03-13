import firestore from '@react-native-firebase/firestore';
import {store} from '../redux/useRedux';
import {updateCoursesAction} from '../redux/actions';
import {withTokens} from './tokens';
import {API_URL} from './constants';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
var shajs = require('sha.js');

const diningCollectionRef = firestore().collection('dining');

const apiDataDocRef = diningCollectionRef.doc('apiData');

const mealsCollectionRef = apiDataDocRef.collection('meals');

const commonsCollectionRef = apiDataDocRef.collection('commons');

export const getMenusForCommon = async (
  selectedCommons: Set<string>,
  mealtime: Mealtime,
) => {
  try {
    let meals: Meal[] = [];
    let promises: Promise<void>[] = [];
    selectedCommons.forEach((common: string) => {
      const get = async () => {
        let theseMeals: Meal[] = [];
        const snapshot = await mealsCollectionRef
          .where('common', '==', common)
          .where('meal', '==', mealtime)
          .get();

        snapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          theseMeals.push({...data, id} as Meal);
        });
        meals = meals.concat(theseMeals);
      };
      promises.push(get());
    });
    await Promise.all(promises);
    return meals;
  } catch (error) {
    return [];
  }
};

export default function useDiningData() {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [commons, setCommons] = useState<{[key: string]: DiningCommon} | null>(
    null,
  );
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [selectedCommons, setSelectedCommons] = useState<Set<string> | null>(
    null,
  );
  const [selectedMealtime, setSelectedMealtime] =
    useState<Mealtime>('breakfast');

  useEffect(() => {
    const commonsSubscription = commonsCollectionRef.onSnapshot(snapshot => {
      const commons: {[key: string]: DiningCommon} = {};
      snapshot.forEach(doc => {
        const id = doc.id;
        const data = doc.data() as DiningCommon;
        commons[id] = data;
      });
      setCommons(commons);
    });
    return () => commonsSubscription();
  }, []);

  useEffect(() => {
    if (commons === null || selectedCommons == null) return;
    const fetchMenus = async () => {
      setLoadingData(true);
      const meals = await getMenusForCommon(selectedCommons, selectedMealtime);
      setMeals(meals);
      setLoadingData(false);
    };
    fetchMenus();
  }, [selectedCommons, selectedMealtime, commons]);

  return {
    meals,
    selectedMealtime,
    setSelectedMealtime,
    commons,
    selectedCommons,
    setSelectedCommons,
    loadingData,
  };
}
