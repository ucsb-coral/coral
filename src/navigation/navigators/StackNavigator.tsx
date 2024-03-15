import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import WelcomeScreen, {
  WelcomeScreenProps,
} from '../../screens/auth/welcomeScreen/WelcomeScreen';
import TabNavigator from './TabNavigator';
import useAuth from '../../../auth/useAuth';
import LoadingScreen, {LoadingScreenProps} from '../../components/Loading';
import ChatScreen, {
  ChatScreenProps,
} from '../../screens/stack/chatScreen/ChatScreen';
import ChatSettings, {
  ChatSettingsProps,
} from '../../screens/stack/chatSettings/ChatSettings';
import AboutScreen, {
  AboutScreenProps,
} from '../../screens/stack/about/AboutScreen';
import SettingsScreen, {
  SettingsScreenProps,
} from '../../screens/stack/settings/SettingsScreen';
import EditProfileScreen, {
  EditProfileScreenProps,
} from '../../screens/stack/editProfile/EditProfileScreen';
import UserProfilePage, {
  UserProfileScreenProps,
} from '../../screens/stack/userProfile/UserProfilePage';

type AuthStackNavigatorScreens = {
  welcome: WelcomeScreenProps;
  loading: LoadingScreenProps;
  // ADD more auth screens here
};

type AuthStackNavigatorPages = keyof AuthStackNavigatorScreens;

type AppStackNavigatorScreens = {
  tabNavigator: EmptyProps;
  chat: ChatScreenProps;
  chatSettings: ChatSettingsProps;
  settings: SettingsScreenProps;
  editProfile: EditProfileScreenProps;
  about: AboutScreenProps;
  userProfile: UserProfileScreenProps;
  // ADD more app screens here
};

type AppStackNavigatorPages = keyof AppStackNavigatorScreens;

export type StackNavigatorScreens = AuthStackNavigatorScreens &
  AppStackNavigatorScreens;

type StackNavigatorPages = keyof StackNavigatorScreens;

export default function StackNavigator() {
  const Stack = createNativeStackNavigator<StackNavigatorScreens>();
  const {authState} = useAuth();

  return (
    <Stack.Navigator
      id={'stack-navigator'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'welcome'}>
      {authState === 'AUTHENTICATED' ? (
        <>
          <Stack.Screen name={'tabNavigator'} component={TabNavigator} />
          <Stack.Screen name={'chat'} component={ChatScreen} />
          <Stack.Screen name={'chatSettings'} component={ChatSettings} />
          <Stack.Screen name={'about'} component={AboutScreen} />
          <Stack.Screen name={'settings'} component={SettingsScreen} />
          <Stack.Screen name={'editProfile'} component={EditProfileScreen} />
          <Stack.Screen name={'userProfile'} component={UserProfilePage} />
          {/* ADD more app stack screens here */}
        </>
      ) : authState === 'NONE' ? (
        <Stack.Screen name={'welcome'} component={WelcomeScreen} />
      ) : (
        <Stack.Screen name={'loading'} component={LoadingScreen} />
      )}
    </Stack.Navigator>
  );
}

export const authStackNavigate = <Page extends keyof AuthStackNavigatorScreens>(
  navigation: NativeStackNavigationProp<any>,
  screen: AuthStackNavigatorPages,
  params?: AuthStackNavigatorScreens[Page] | {},
) => navigation.push(screen, params);

export const appStackNavigate = <Page extends keyof AppStackNavigatorScreens>(
  navigation: NativeStackNavigationProp<any>,
  screen: AppStackNavigatorPages,
  params?: AppStackNavigatorScreens[Page] | {},
) => navigation.push(screen, params);

export type AuthStackPageProps<Page extends AuthStackNavigatorPages> =
  NativeStackScreenProps<AuthStackNavigatorScreens, Page, 'stack-navigator'>;

export type AppStackPageProps<Page extends AppStackNavigatorPages> =
  NativeStackScreenProps<AppStackNavigatorScreens, Page, 'stack-navigator'>;
