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
import {coral, grey} from '../../utilities/colors';
import useChatData from '../../firebaseReduxUtilities/useChatData';
import {Ionicons} from '@expo/vector-icons';
import {scale} from '../../utilities/scale';
import useCourseData from '../../firebaseReduxUtilities/useCourseData';
import useUserData from '../../firebaseReduxUtilities/useUserData';

type TabNavigatorScreens = {
  profile: ProfileScreenProps;
  chats: ChatsScreenProps;
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
          let iconName: string;
          switch (route.name) {
            case 'schedule':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'chats':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
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
      <Tab.Screen name={'profile'} component={ProfileScreen as any} />
    </Tab.Navigator>
  );
}

export type TabPageProps<Page extends TabNavigatorPages> = BottomTabScreenProps<
  TabNavigatorScreens,
  Page,
  'tab-navigator'
>;
