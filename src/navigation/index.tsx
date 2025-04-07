import React from 'react';


import TabNavigator from './Tab';
import {SCREEN} from './route';
import {StyleSheet} from 'react-native';
import Colors from '../utils/colors';
import { createStackNavigator } from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen';
import MovieSearch from '../screens/MovieSearch';
import MovieAuthWebView from '../screens/MovieAuthWebView';
import Favorites from '../screens/Favorites';


const Stack = createStackNavigator();

const BottomTabs = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: Colors.headerColor,
    }}>
    <Stack.Screen
      name={SCREEN.TAB_SCREEN}
      component={TabNavigator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={SCREEN.MOVIE_ITEM_SCREEN}
      component={MovieScreen}
      options={{headerTitle: ''}}
    />
    <Stack.Screen
      name={SCREEN.MOVIE_SEARCH_SCREEN}
      component={MovieSearch}
      options={{
        headerTitle: 'Search Movies',
      }}
    />
    <Stack.Screen
      name={SCREEN.AUTHENTICATION_WEB_VIEW_SCREEN}
      component={MovieAuthWebView}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={SCREEN.FAVORITES_SCREEN}
      component={Favorites}
      options={{headerTitle: 'Favorites'}}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.secondaryColor,
  },
  headerTitleStyle: {
    color: Colors.headerColor,
    textTransform: 'capitalize',
    textDecorationLine: 'line-through',
  },
});

export default BottomTabs;
