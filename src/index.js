import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {AppStack} from './navigation';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(true);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
