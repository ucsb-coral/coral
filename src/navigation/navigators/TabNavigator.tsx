import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
// import Tabbar from '../components/Tabbar';
import UserPage from '../../screens/user/UserPage';
import ChatPage from '../../screens/chat/ChatPage';
import SchedulePage from '../../screens/schedule/SchedulePage';

// type TabNavigatorScreens = {
//   User: UserPageProps;
//   Chats: ChatPageProps;
//   Schedule: SchedulePageProps;
// };

// type TabNavigatorPages = keyof TabNavigatorScreens;

const Tab = createBottomTabNavigator();


export default function TabNavigator() {
  return (
    <Tab.Navigator
      id={'tab-navigator'}
      initialRouteName={'Chats'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f88379',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          if (route.name === 'Schedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }
          let iconColor: string;
          iconColor = focused ? '#f88379' : 'gray';
          return <Icon name={iconName} type = 'ionicon' color = {iconColor}/>;
        }
      })}

    >
      <Tab.Screen name={'Schedule'} component={SchedulePage} />
      <Tab.Screen name={'Chats'} component={ChatPage} />
      <Tab.Screen name={'User'} component={UserPage} />
    </Tab.Navigator>
  );
}


// export type TabPageProps<Page extends TabNavigatorPages> = BottomTabScreenProps<
//   TabNavigatorScreens,
//   Page,
//   'tab-navigator'
// >;
