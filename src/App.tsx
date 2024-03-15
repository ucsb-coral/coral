import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useRedux from './redux/useRedux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Navigation from './navigation/Navigation';
import {loadFonts} from './utilities/textfont';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const {store, persistor} = useRedux();

  useEffect(() => {
    async function prepare() {
      await loadFonts();
      setIsReady(true);
    }
    prepare();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <ActionSheetProvider>
          <SafeAreaProvider>{!!isReady && <Navigation />}</SafeAreaProvider>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
}
