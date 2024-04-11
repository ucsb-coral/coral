import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import StackNavigator from './navigators/StackNavigator';
import linking from './linking';

export default function Navigation() {
  return (
    <NavigationContainer
      // linking={linking}
      onReady={() => RNBootSplash.hide({fade: true})}>
      <StackNavigator />
    </NavigationContainer>
  );
}
