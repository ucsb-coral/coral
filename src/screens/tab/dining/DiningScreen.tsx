import React, {useState, useEffect} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {getMenusForCommon} from '../../../firebaseReduxUtilities/useDiningService'; // adjust the import path as necessary
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import { Card, Title, IconButton } from 'react-native-paper'; 
//import IconButton from '../../../components/iconButton/IconButton';
import favoriteImagePng from '../../../assets/pngs/favorite.png';
import unfavoriteImagePng from '../../../assets/pngs/unfavorite.png';

type Meal = 'breakfast' | 'lunch' | 'dinner' | null;
type DiningCommon = 'carrillo' | 'de-la-guerra' | 'ortega' | 'portola';

export type DiningScreenProps = EmptyProps;

type DiningPageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'dining'>
>;

type MenuItem = {name: string};

export default function DiningScreen({route, navigation}: DiningPageProps) {
  const [meal, setMeal] = useState<Meal>(null);
  const [common, setCommon] = useState<DiningCommon>('carrillo'); // default to carrillo
  const [menus, setMenus] = useState<string[]>([]);
  const diningCommons: DiningCommon[] = [
    'carrillo',
    'de-la-guerra',
    'ortega',
    'portola',
  ];
  //const [favorites, setFavorites] = React.useState({});
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (itemName: string) => {
    setFavorites((currentFavorites) => {
      const newFavorites = { ...currentFavorites };
      if (newFavorites[itemName]) {
        delete newFavorites[itemName]; // Remove from favorites if it's already there
      } else {
        newFavorites[itemName] = true; // Add to favorites if it's not
      }
      return newFavorites;
    });
  };


  const fetchMenus = async () => {
    const fetchedMenus = await Promise.all([getMenusForCommon(common, meal ?? 'breakfast')]);

    // Process the fetched menus to extract the 'name' values
    const names = fetchedMenus.flatMap((menuItems: MenuItem[]) =>
      menuItems.map(item => item.name),
    );

    setMenus(names);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Select a dining common:</Text>
      <Button title="Carrillo" onPress={() => setCommon('carrillo')} />
      <Button title="De La Guerra" onPress={() => setCommon('de-la-guerra')} />
      <Button title="Ortega" onPress={() => setCommon('ortega')} />
      <Button title="Portola" onPress={() => setCommon('portola')} />
      <Text>Please select a meal to view menus:</Text>
      <Button title="Breakfast" onPress={() => setMeal('breakfast')} />
      <Button title="Lunch" onPress={() => setMeal('lunch')} />
      <Button title="Dinner" onPress={() => setMeal('dinner')} />
      


      {meal && <Button title={`Fetch ${meal} menus at ${common}`} onPress={fetchMenus} />}
      {/* Display menus or a message indicating selection is needed */}
            { menus.length > 0 ? (
              <ScrollView style={{flex: 1, padding: 10}}>
                {menus.map((menu: string, index: number) => (
                  <Card key={index} style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Title>{menu.trim()}</Title>
                      <IconButton
                        icon={favorites[menu] ? 'heart' : 'heart-outline'} // Assuming you use MaterialCommunityIcons
                        size={20}
                        onPress={() => toggleFavorite(menu)}
                      />
                    </Card.Content>
                   
                  </Card>

                  /*
                  <Button
                      //title={favorites[menu] ? 'Unfavorite' : 'Favorite'}
                      //onPress={() => toggleFavorite(menu)}
                    />
                    ////////
                  <Card key={index} style={{marginBottom: 10}}>
                    <Card.Content>
                      <Title>{menu.trim()}</Title>
                    </Card.Content>
                  </Card>*/

                  //<Text key={index}>
                    //{/*diningCommons[index]} {JSON.stringify(menu)*/}
                    //{/*JSON.stringify(menu)*/} 
                    
                  //</Text>
                ))}
              </ScrollView>
            ) : null }
          </View>
        );
      }
