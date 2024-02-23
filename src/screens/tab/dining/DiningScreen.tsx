import React, {useState, useEffect} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {getMenusForCommon} from '../../../firebaseReduxUtilities/useDiningService'; // adjust the import path as necessary
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';

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
        <ScrollView style={flex: 1, padding}>

        
        menus.map((menu: string, index: number) => (
          <Text key={index}>
            {/*diningCommons[index]} {JSON.stringify(menu)*/}
            {JSON.stringify(menu)}

          </Text>
        ))
      ) : (
        <Text>No menus fetched. Select a meal to begin.</Text>
      )} 
      </ScrollView>
    </View>
  );
}
