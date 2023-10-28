import React from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import TabPage1, {TabPage1Props} from '../../screens/tab/tabPage1/TabPage1';
import Tabbar from '../components/Tabbar';
import TabPage2, {TabPage2Props} from '../../screens/tab/tabPage2/TabPage2';

type TabNavigatorScreens = {
  tabpage1: TabPage1Props;
  tabpage2: TabPage2Props;
};

type TabNavigatorPages = keyof TabNavigatorScreens;

export default function TabNavigator() {
  const Tab = createBottomTabNavigator<TabNavigatorScreens>();

  return (
    <Tab.Navigator
      id={'tab-navigator'}
      screenOptions={{headerShown: false}}
      sceneContainerStyle={{backgroundColor: 'blue'}}
      // tabBar={Tabbar}
      initialRouteName={'tabpage1'}>
      <Tab.Screen name={'tabpage1'} component={TabPage1} />
      <Tab.Screen name={'tabpage2'} component={TabPage2} />
    </Tab.Navigator>
  );
}

export type TabPageProps<Page extends TabNavigatorPages> = BottomTabScreenProps<
  TabNavigatorScreens,
  Page,
  'tab-navigator'
>;
