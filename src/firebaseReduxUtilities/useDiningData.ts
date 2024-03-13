import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {getUserDocumentRef} from './useUserData';
import {store} from '../redux/useRedux';
import {useSelector} from 'react-redux';

const diningCollectionRef = firestore().collection('dining');

const apiDataDocRef = diningCollectionRef.doc('apiData');

const mealsCollectionRef = apiDataDocRef.collection('meals');

const commonsCollectionRef = apiDataDocRef.collection('commons');

const appDataDocRef = diningCollectionRef.doc('appData');

const likesCollectionRef = appDataDocRef.collection('likes');

export const getMenusForCommon = async (
  selectedCommons: Set<string>,
  mealtime: Mealtime,
) => {
  try {
    let meals: MealWithId[] = [];
    let promises: Promise<void>[] = [];
    selectedCommons.forEach((common: string) => {
      console.log('Getting', common, mealtime);
      const get = async () => {
        let theseMeals: MealWithId[] = [];
        const snapshot = await mealsCollectionRef
          .where('common', '==', common)
          .where('meal', '==', mealtime)
          .get();

        snapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();
          theseMeals.push({...data, id} as MealWithId);
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
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const likes = useSelector((state: ReduxState) => state.data.likes);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [commons, setCommons] = useState<DiningCommonsMap | null>(null);
  const [meals, setMeals] = useState<MealWithId[] | null>(null);
  const [selectedCommons, setSelectedCommons] = useState<Set<string> | null>(
    null,
  );
  const [selectedMealtime, setSelectedMealtime] =
    useState<Mealtime>('breakfast');

  const userDocRef = getUserDocumentRef(myUserId);
  const userLikesCollectionRef = userDocRef.collection('likes');

  const toggleLiked = (meal: MealWithId) => {
    const mealDocRef = likesCollectionRef.doc(meal.id);
    if (likes?.[meal.id]) {
      mealDocRef.set(meal);
    } else {
      mealDocRef.delete();
    }
    // optimistic update
    // store.dispatch();
  };

  useEffect(() => {
    const commonsSubscription = commonsCollectionRef.onSnapshot(snapshot => {
      const commons: DiningCommonsMap = {};
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
    if (selectedCommons === null) {
      if (commons !== null) {
        const newSelectedCommons = new Set(Object.keys(commons));
        setSelectedCommons(newSelectedCommons);
      }
    } else {
      const fetchMenus = async () => {
        setLoadingData(true);
        const meals = await getMenusForCommon(
          selectedCommons,
          selectedMealtime,
        );
        setMeals(meals);
        setLoadingData(false);
      };
      fetchMenus();
    }
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
