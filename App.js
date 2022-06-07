import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AppRoute from './router/AppRoute';
import {enableScreens} from 'react-native-screens';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import {persistor, store} from './src/stores/store';
import constants from './src/constants/constants';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

TouchableOpacity.defaultProps = {
  ...(TouchableOpacity.defaultProps || {}),
  delayPressIn: 0,
};

enableScreens(true);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar
            translucent={true}
            showHideTransition={'fade'}
            backgroundColor={'transparent'}
          />
          <BottomSheetModalProvider>
            <NavigationContainer>
              <AppRoute />
            </NavigationContainer>
            <Toast config={constants.toastConfig} />
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
