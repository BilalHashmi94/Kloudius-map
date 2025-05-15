import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import AppNavigation from './src/navigation/AppNavigation';
import { Persistor, Store } from './src/redux';


const App = (): React.ReactElement => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
              <AppNavigation />
            </KeyboardAvoidingView>
          ) : (
            <AppNavigation />
          )}
          <Toast style={{bottom: -30}} />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
