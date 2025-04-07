import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import Colors from '../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {CommonStateType} from '../types';

import {searchMovieActions} from '../redux/action';
import {debounce} from 'lodash';
import MovieList from '../components/MovieList';

const MovieSearch = () => {
  const [searchText, setSearchText] = useState('');

  const debouncedSearchTextRef = useRef(searchText);

  const movieDataState = useSelector(
    (state: CommonStateType) => state.searchedMovies,
  );

  const dispatch = useDispatch();

  const searchData = (query: string) => {
    debouncedSearchTextRef.current = query;
    dispatch(searchMovieActions.getData({page: 1, query}));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBebouncedSearch = useCallback(debounce(searchData, 400), []);

  const onChangeText = (val: string) => {
    setSearchText(val);
    getBebouncedSearch(val);
  };

  const renderSearchBox = () => (
    <TextInput
      value={searchText}
      onChangeText={onChangeText}
      placeholder="Search movies..."
      placeholderTextColor={Colors.subTextColor}
      style={styles.searchContainer}
    />
  );

  useEffect(() => {
    return () => {
      dispatch(searchMovieActions.resetData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MovieList
        movieDataState={movieDataState}
        movieAction={searchMovieActions}
        shouldFetchDataInitially={false}
        debouncedSearchTextRef={debouncedSearchTextRef}
        listHeaderComponent={renderSearchBox}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  searchContainer: {
    backgroundColor: Colors.cardBackground,
    marginTop: 20,
    marginBottom: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.textColor,
  },
});

export default MovieSearch;
