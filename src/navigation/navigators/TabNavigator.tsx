import * as React from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ProfileScreen, {
  ProfileScreenProps,
} from '../../screens/tab/profile/ProfileScreen';
import ChatsScreen, {
  ChatsScreenProps,
} from '../../screens/tab/chats/ChatsScreen';
import ScheduleScreen, {
  ScheduleScreenProps,
} from '../../screens/tab/schedule/ScheduleScreen';
import {coral, grey, white} from '../../utilities/colors';
import useChatData from '../../firebaseReduxUtilities/useChatData';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../utilities/scale';
import useCourseData from '../../firebaseReduxUtilities/useCourseData';
import useUserData from '../../firebaseReduxUtilities/useUserData';
import DiningScreen, {
  DiningScreenProps,
} from '../../screens/tab/dining/DiningScreen';
import EventsScreen, {
  EventsScreenProps,
} from '../../screens/tab/events/EventsScreen';

type TabNavigatorScreens = {
  profile: ProfileScreenProps;
  chats: ChatsScreenProps;
  dining: DiningScreenProps;
  events: EventsScreenProps;
  schedule: ScheduleScreenProps;
};

type TabNavigatorPages = keyof TabNavigatorScreens;

const Tab = createBottomTabNavigator<TabNavigatorScreens>();

export default function TabNavigator() {
  useUserData();
  useChatData();
  useCourseData();

  return (
    <Tab.Navigator
      id={'tab-navigator'}
      initialRouteName={'schedule'}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: coral,
        tabBarInactiveTintColor: grey,
        tabBarIcon: ({focused, color, size}) => {
          var iconName: string;
          switch (route.name) {
            case 'schedule':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'chats':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'dining':
              iconName = focused ? 'fast-food' : 'fast-food-outline';
              break;
            case 'events':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          let iconColor: string = focused ? coral : grey;
          return (
            <Ionicons
              name={iconName as any}
              size={scale(25)}
              color={iconColor}
            />
          );
        },
      })}>
      <Tab.Screen name={'schedule'} component={ScheduleScreen as any} />
      <Tab.Screen name={'chats'} component={ChatsScreen as any} />
      <Tab.Screen name={'dining'} component={DiningScreen as any} />
      <Tab.Screen name={'events'} component={EventsScreen as any} />
      <Tab.Screen name={'profile'} component={ProfileScreen as any} />
    </Tab.Navigator>
  );
}

export type TabPageProps<Page extends TabNavigatorPages> = BottomTabScreenProps<
  TabNavigatorScreens,
  Page,
  'tab-navigator'
>;
