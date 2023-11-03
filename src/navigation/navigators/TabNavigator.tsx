import * as React from 'react';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
// import Tabbar from '../components/Tabbar';
import UserPage, {UserPageProps} from '../../screens/tab/user/UserPage';
import ChatPage, {ChatPageProps} from '../../screens/tab/chat/ChatPage';
import SchedulePage, {
  SchedulePageProps,
} from '../../screens/tab/schedule/SchedulePage';
import {coral, grey} from '../../utilities/colors';
import useChatData from '../../firebaseReduxUtilities/useChatData';

type TabNavigatorScreens = {
  user: UserPageProps;
  chats: ChatPageProps;
  schedule: SchedulePageProps;
};

type TabNavigatorPages = keyof TabNavigatorScreens;

const Tab = createBottomTabNavigator<TabNavigatorScreens>();

export default function TabNavigator() {
  useChatData();
  return (
    <Tab.Navigator
      id={'tab-navigator'}
      initialRouteName={'chats'}
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
            case 'user':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          let iconColor: string = focused ? coral : grey;
          return <Icon name={iconName} type="ionicon" color={iconColor} />;
        },
      })}>
      <Tab.Screen name={'schedule'} component={SchedulePage as any} />
      <Tab.Screen name={'chats'} component={ChatPage as any} />
      <Tab.Screen name={'user'} component={UserPage as any} />
    </Tab.Navigator>
  );
}

export type TabPageProps<Page extends TabNavigatorPages> = BottomTabScreenProps<
  TabNavigatorScreens,
  Page,
  'tab-navigator'
>;
