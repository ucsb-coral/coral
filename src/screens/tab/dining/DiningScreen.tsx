import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import useDiningData, {
  getMenusForCommon,
} from '../../../firebaseReduxUtilities/useDiningData'; // adjust the import path as necessary
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
//import IconButton from '../../../components/iconButton/IconButton';
import favoriteImagePng from '../../../assets/pngs/favorite.png';
import unfavoriteImagePng from '../../../assets/pngs/unfavorite.png';
import Loading from '../../../components/Loading';
import MealCard from './components/MealCard';
import MealtimeSelector from './components/MealtimeSelector';
import CommonsSelector from './components/commonsSelector/CommonsSelector';
import {scale} from '../../../utilities/scale';
import {sfProTextBold} from '../../../utilities/textfont';
import {black, grey0, grey2} from '../../../utilities/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/header/Header';

export type DiningScreenProps = EmptyProps;

type DiningPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'dining'>
>;
export default function DiningScreen({route, navigation}: DiningPageProps) {
  const flatListRef = useRef<FlatList>(null);

  const {
    meals,
    selectedMealtime,
    setSelectedMealtime,
    commons,
    selectedCommons,
    setSelectedCommons,
    loadingData,
  } = useDiningData();

  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  const [sortedMeals, setSortedMeals] = useState(meals);

  // Implement scrollToTop to scroll the FlatList to the top
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const toggleFavorite = (mealId: string) => {
    setFavorites(currentFavorites => {
      const newFavorites = {...currentFavorites};
      if (newFavorites[mealId]) {
        delete newFavorites[mealId];
      } else {
        newFavorites[mealId] = true;
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    if (meals) {
      const sorted = meals.slice().sort((a, b) => {
        const aFav = favorites[a.id] ? 1 : 0;
        const bFav = favorites[b.id] ? 1 : 0;
        return bFav - aFav; // This ensures favorites are on top
      });
      setSortedMeals(sorted);
    }
  }, [favorites, meals]); // Re-sort when favorites or meals change

  const renderItem = ({
    item: meal,
    index,
  }: {
    item: MealWithId;
    index: number;
  }) => {
    return (
      <MealCard
        {...meal}
        commonName={commons?.[meal.common]?.name ?? ''}
        isFavorited={favorites[meal.id]}
        toggleFavorited={() => toggleFavorite(meal.id)}
      />
    );
  };

  return (
    <Loading isReady={meals !== null}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Header centerElement="Daily Menus" />
        <CommonsSelector
          commons={commons!}
          selectedCommons={selectedCommons!}
          setSelectedCommons={setSelectedCommons}
          scrollToTop={scrollToTop}
        />
        <MealtimeSelector
          mealtime={selectedMealtime}
          setMealtime={setSelectedMealtime}
          scrollToTop={scrollToTop}
        />
        <View style={{flex: 1, width: '100%'}}>
          {meals && meals.length > 0 ? (
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{width: '100%'}}
              data={sortedMeals}
              renderItem={renderItem}
              bounces={true}
              extraData={favorites}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: scale(20),
                  fontFamily: sfProTextBold,
                  color: grey0,
                }}>
                {'No meals available'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Loading>
  );
}
