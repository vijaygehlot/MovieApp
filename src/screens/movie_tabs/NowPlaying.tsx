import React from 'react';
import {useSelector} from 'react-redux';
import {CommonStateType} from '../../types/index';
import {nowPlayingMovieActions} from '../../redux/action';
import {SafeAreaView, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import MovieList from '../../components/MovieList';

const NowPlaying = () => {
  const movieDataState = useSelector(
    (state: CommonStateType) => state.nowPlayingMovies,
  );

  return (
    <SafeAreaView style={styles.container}>
      <MovieList
        movieDataState={movieDataState}
        movieAction={nowPlayingMovieActions}
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

export default NowPlaying;
