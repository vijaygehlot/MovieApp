import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store'
// import UserList from './src/screens/UserList';

//import { TMDB_API_KEY } from '@env';

const App = () => {
  // console.log('API Key:', TMDB_API_KEY);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  </Provider>
  )

}

export default App;

const styles = StyleSheet.create(({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
}))

