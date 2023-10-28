import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useRedux from './redux/useRedux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import StackNavigator from './navigation/navigators/StackNavigator';
import Navigation from './navigation/Navigation';

export default function App() {
  const {store, persistor} = useRedux();
  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <Navigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
