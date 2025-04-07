import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../utils/colors';

import {useSelector} from 'react-redux';
import {CommonStateType} from '../types';
import {favoriteMoviesAction} from '../redux/action';
import MovieList from '../components/MovieList';

const Favorites = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.favoriteMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieList
        movieDataState={movieDataState}
        movieAction={favoriteMoviesAction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});

export default Favorites;
