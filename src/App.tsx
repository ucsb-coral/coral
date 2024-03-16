import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as PaperProvider} from 'react-native-paper';
import useRedux from './redux/useRedux';
import Navigation from './navigation/Navigation';
import {loadFonts} from './utilities/textfont';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const {store, persistor} = useRedux();

  useEffect(() => {
    async function prepare() {
      await loadFonts(); // Load any custom fonts
      setIsReady(true);
    }
    prepare();
  }, []);

  if (!isReady) {
    return null; // Render nothing or a loading spinner until fonts are loaded
  }

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <ActionSheetProvider>
            <SafeAreaProvider>{!!isReady && <Navigation />}</SafeAreaProvider>
          </ActionSheetProvider>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
