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

export type DiningScreenProps = EmptyProps;

type DiningPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'dining'>
>;

export default function DiningScreen({route, navigation}: DiningPageProps) {
  const flatListRef = useRef<FlatList | null>(null);
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

  const scrollToTop = () => {};
  console.log('efvefvefvfv', meals);
  // const toggleFavorite = (itemName: string) => {
  //   setFavorites(currentFavorites => {
  //     const newFavorites = {...currentFavorites};
  //     if (newFavorites[itemName]) {
  //       delete newFavorites[itemName]; // Remove from favorites if it's already there
  //     } else {
  //       newFavorites[itemName] = true; // Add to favorites if it's not
  //     }
  //     return newFavorites;
  //   });
  // };

  // //optional: sort the menus by favorited items.
  // // If we choose to use this then use the sortedMenus below instead of menus
  // const sortedMenus = menus.sort((a, b) => {
  //   if (favorites[a] && !favorites[b]) {
  //     return -1;
  //   }
  //   if (!favorites[a] && favorites[b]) {
  //     return 1;
  //   }
  //   return 0;
  // });

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
        isFavorited
        toggleFavorited={() => {}}
      />
    );
  };

  return (
    <Loading isReady={meals !== null}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          {meals !== null && meals.length > 0 ? (
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{
                width: '100%',
              }}
              data={meals}
              renderItem={renderItem}
              bounces={true}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
