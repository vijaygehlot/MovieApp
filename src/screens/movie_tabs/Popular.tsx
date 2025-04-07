import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import MovieListView from '../../components/MovieList';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../types';
import {popularMovieActions} from '../../redux/action';
import MovieList from '../../components/MovieList';

const Popular = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.popularMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieList
        movieDataState={movieDataState}
        movieAction={popularMovieActions}
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

export default Popular;
