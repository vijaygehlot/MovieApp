import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import {TAB_ROUTE, SCREEN} from './route';
import {CommonStateType} from '../types';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {showTMDBAlertDialog} from '../utils/helper';
import NowPlaying from '../screens/movie_tabs/NowPlaying';
import Popular from '../screens/movie_tabs/Popular';
import TopRated from '../screens/movie_tabs/TopRated';
import Upcoming from '../screens/movie_tabs/Upcoming';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );

  const navigation = useNavigation();

  const nowPlayingMoviesTabBarIcon = ({ color }: TabBarIconProps) => (
    <Ionicons name="play-circle-outline" size={30} color={color} />
  );
  
  const popularMoviesTabBarIcon = ({ color }: TabBarIconProps) => (
    <Ionicons name="ribbon-outline" size={32} color={color} />
  );
  
  const topRatedMoviesTabBarIcon = ({ color }: TabBarIconProps) => (
    <Ionicons name="star-half-outline" size={32} color={color} />
  );
  
  const upcomingMoviesTabBarIcon = ({ color }: TabBarIconProps) => (
    <Ionicons name="sparkles-outline" size={32} color={color} />
  );

  const onPressSearch = () => {
    navigation.navigate(SCREEN.MOVIE_SEARCH_SCREEN);
  };

  const onPressFavorites = async () => {
    if (accountId) {
      navigation.navigate(SCREEN.FAVORITES_SCREEN);
    } else {
      showTMDBAlertDialog(navigation, setIsAuthInProgress);
    }
  };

  const headerRight = ({tintColor}: {tintColor?: string}) => {
    return (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity onPress={onPressSearch} style={styles.iconContainer}>
          <Ionicons
            name="search"
            size={25}
            color={tintColor}
          />
        </TouchableOpacity>
        {isAuthInProgress ? (
          <ActivityIndicator
            size={24}
            color={tintColor}
            style={styles.iconContainer}
          />
        ) : (
          <TouchableOpacity
            onPress={onPressFavorites}
            style={styles.iconContainer}>
            <Ionicons
              name="bookmark-outline"
              size={25}
              color={tintColor}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: Colors.headerColor,
    tabBarShowLabel: false, 
    tabBarStyle: styles.tabBarStyle,
    tabBarIconStyle: styles.tabBarIconStyle,
    tabBarInactiveTintColor: Colors.inactiveColor,
    tabBarActiveTintColor: Colors.primaryColor,
    headerRight: ({tintColor}: {tintColor?: string}) =>
      headerRight({tintColor}),
  }}
      >
      <Tab.Screen
        options={{tabBarIcon: nowPlayingMoviesTabBarIcon}}
        name={TAB_ROUTE.NOW_PLAYING}
        component={NowPlaying}
      />
      <Tab.Screen
        options={{tabBarIcon: popularMoviesTabBarIcon}}
        name={TAB_ROUTE.POPULAR}
        component={Popular}
      />
      <Tab.Screen
        options={{tabBarIcon: topRatedMoviesTabBarIcon}}
        name={TAB_ROUTE.TOP_RATED}
        component={TopRated}
      />
      <Tab.Screen
        options={{tabBarIcon: upcomingMoviesTabBarIcon}}
        name={TAB_ROUTE.UPCOMING}
        component={Upcoming}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.secondaryColor,
  },
  headerTitleStyle: {
    color: Colors.headerColor,
    textTransform: 'capitalize',
  },
  tabBarLabelStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tabBarStyle: {
    backgroundColor: Colors.secondaryColor,
    height: 60,
  },
  tabBarIconStyle: {
    color: Colors.primaryColor,
    marginTop:10
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
});

export default TabNavigator;
