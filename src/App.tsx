import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useRedux from './redux/useRedux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Navigation from './navigation/Navigation';
import {loadFonts} from './utilities/textfont';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {signOut} from '../auth/useAuth';

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

  // signOut();

  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <ActionSheetProvider>
          <SafeAreaView style={{flex: 1}}>
            {!!isReady && <Navigation />}
          </SafeAreaView>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
}
