import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {getMenusForCommon} from '../../../firebaseReduxUtilities/useDiningService'; // adjust the import path as necessary
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {Card, Title, IconButton, Button} from 'react-native-paper';
//import IconButton from '../../../components/iconButton/IconButton';
import favoriteImagePng from '../../../assets/pngs/favorite.png';
import unfavoriteImagePng from '../../../assets/pngs/unfavorite.png';
import Loading from '../../../components/Loading';

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
  const [isReady, setReady] = useState<boolean>(false);
  const diningCommons: DiningCommon[] = [
    'carrillo',
    'de-la-guerra',
    'ortega',
    'portola',
  ];
  //const [favorites, setFavorites] = React.useState({});
  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    //No ortega and breakfast
    if (common === 'ortega' && meal === 'breakfast') {
      setMessage("Ortega doesn't serve Breakfast");
    } else {
      setMessage('');
      fetchMenus().then(() => setReady(true));
    }
  }, [common, meal]); // Fetch menus when common or meal changes

  const toggleFavorite = (itemName: string) => {
    setFavorites(currentFavorites => {
      const newFavorites = {...currentFavorites};
      if (newFavorites[itemName]) {
        delete newFavorites[itemName]; // Remove from favorites if it's already there
      } else {
        newFavorites[itemName] = true; // Add to favorites if it's not
      }
      return newFavorites;
    });
  };

  //optional: sort the menus by favorited items.
  // If we choose to use this then use the sortedMenus below instead of menus
  const sortedMenus = menus.sort((a, b) => {
    if (favorites[a] && !favorites[b]) {
      return -1;
    }
    if (!favorites[a] && favorites[b]) {
      return 1;
    }
    return 0;
  });

  const fetchMenus = async () => {
    // more dont fetc ortega breakfast
    if (common === 'ortega' && meal === 'breakfast') {
      return;
    }

    //const fetchedMenus = await Promise.all([
    //  getMenusForCommon(common, meal ?? 'breakfast'),
    //]);

    // Process the fetched menus to extract the 'name' values
    //const names = fetchedMenus.flatMap((menuItems: MenuItem[]) =>
    //  menuItems.map(item => item.name),
    //);
    const menuItems = await getMenusForCommon(common, meal ?? 'breakfast');

    //setMenus(names);
    setMenus(menuItems);

    //console.log(names);
  };

  return (
    <Loading isReady={isReady}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Select a dining common:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <Button
            mode={common === 'carrillo' ? 'contained' : 'outlined'}
            onPress={() => setCommon('carrillo')}
            //buttonColor={common === 'carrillo' ? '#F88379' : undefined} // Text color for 'outlined' mode
            theme={{
              colors: {primary: common === 'carrillo' ? '#F88379' : '#000000'},
            }}
            style={common === 'carrillo' ? {backgroundColor: '#F88379'} : {}}>
            Carrillo
          </Button>
          <Button
            mode={common === 'de-la-guerra' ? 'contained' : 'outlined'}
            onPress={() => setCommon('de-la-guerra')}
            //buttonColor={common === 'de-la-guerra' ? '#F88379' : undefined} // Text color for 'outlined' mode
            theme={{
              colors: {
                primary: common === 'de-la-guerra' ? '#F88379' : '#000000',
              },
            }}
            style={
              common === 'de-la-guerra'
                ? {backgroundColor: '#F88379'}
                : undefined
            }>
            De La Guerra
          </Button>
          <Button
            mode={common === 'ortega' ? 'contained' : 'outlined'}
            onPress={() => setCommon('ortega')}
            //buttonColor={common === 'ortega' ? '#F88379' : undefined} // Text color for 'outlined' mode
            theme={{
              colors: {primary: common === 'ortega' ? '#F88379' : '#000000'},
            }}
            style={
              common === 'ortega' ? {backgroundColor: '#F88379'} : undefined
            }>
            Ortega
          </Button>
          <Button
            mode={common === 'portola' ? 'contained' : 'outlined'}
            onPress={() => setCommon('portola')}
            theme={{
              colors: {primary: common === 'portola' ? '#F88379' : '#000000'},
            }}
            //buttonColor={common === 'portola' ? '#F88379' : undefined} // Text color for 'outlined' mode
            style={
              common === 'portola' ? {backgroundColor: '#F88379'} : undefined
            }>
            Portola
          </Button>
        </View>
        <Text>Select meal:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <Button
            mode={meal === 'breakfast' ? 'contained' : 'outlined'}
            onPress={() => setMeal('breakfast')}
            //buttonColor={meal === 'breakfast' ? '#F88379' : undefined} // Text color for 'outlined' mode
            theme={{
              colors: {primary: meal === 'breakfast' ? '#F88379' : '#000000'},
            }}
            style={
              meal === 'breakfast' ? {backgroundColor: '#F88379'} : undefined
            }>
            Breakfast
          </Button>
          <Button
            mode={meal === 'lunch' ? 'contained' : 'outlined'}
            onPress={() => setMeal('lunch')}
            //buttonColor={meal === 'lunch' ? '#F88379' : undefined} // Text color for 'outlined' mode
            theme={{
              colors: {primary: meal === 'lunch' ? '#F88379' : '#000000'},
            }}
            style={meal === 'lunch' ? {backgroundColor: '#F88379'} : undefined}>
            Lunch
          </Button>
          <Button
            mode={meal === 'dinner' ? 'contained' : 'outlined'}
            onPress={() => setMeal('dinner')}
            //buttonColor={meal === 'dinner' ? '#F88379' : undefined} // Text color for 'outlined' mode
            theme={{
              colors: {primary: meal === 'dinner' ? '#F88379' : '#000000'},
            }}
            style={
              meal === 'dinner' ? {backgroundColor: '#F88379'} : undefined
            }>
            Dinner
          </Button>
        </View>

        {/*meal && <Button title={`Fetch ${meal} menus at ${common}`} onPress={fetchMenus} />*/}

        {/* Display menus or a message indicating selection is needed */}

        {message ? (
          <Text>{message}</Text>
        ) : menus.length > 0 ? (
          <ScrollView style={{flex: 1, padding: 10}}>
            {menus.map((menu: string, index: number) => (
              <Card
                key={index}
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Card.Content
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Title>{menu}</Title> 
                  <IconButton
                    icon={favorites[menu] ? 'heart' : 'heart-outline'}
                    size={20}
                    onPress={() => toggleFavorite(menu)}
                  />
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        ) : null}
      </View>
    </Loading>
  );
}
