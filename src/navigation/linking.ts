import {LinkingOptions} from '@react-navigation/native';
import {StackNavigatorScreens} from './navigators/StackNavigator';
import {Linking} from 'react-native';
import {handleSignIn} from '../../auth/useAuth';
import {platform} from '../utilities/platform';

// currently handles only android auth

const linking: LinkingOptions<StackNavigatorScreens> = {
  prefixes: ['coral://'],
  subscribe(listener: any) {
    const onReceiveURL = ({url}: {url: string}) => {
      if (url !== null && platform === 'android') {
        handleSignIn(url);
      }
    };
    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => subscription.remove();
  },
  config: {
    screens: {
      loading: {
        path: 'loading',
      },
    },
  },
};

export default linking;
