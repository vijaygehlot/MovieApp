// MovieList.tsx
import React, { ReactElement, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Colors from '../utils/colors';
import { CommonStateType, MovieStateType, MovieType } from '../types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { MovieActionType } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from './MovieItem';

interface Props {
  movieDataState: MovieStateType;
  movieAction: MovieActionType;
  shouldFetchDataInitially?: boolean;
  debouncedSearchTextRef?: React.MutableRefObject<string>;
  listHeaderComponent?: () => ReactElement;
}

const MovieList = ({
  movieDataState,
  movieAction,
  shouldFetchDataInitially = true,
  debouncedSearchTextRef,
  listHeaderComponent,
}: Props) => {
  const [page, setPage] = useState(1);
  const accountId = useSelector(
    (state: CommonStateType) => state.auth.accountId,
  );
  const dispatch = useDispatch();

  // Shared value for viewable items (used by MovieItem animations)
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const getData = (selectedPageNumber: number) => {
    if (shouldFetchDataInitially) {
      dispatch(
        movieAction.getData({
          page: selectedPageNumber,
          ...(debouncedSearchTextRef?.current
            ? { query: debouncedSearchTextRef.current }
            : {}),
          ...(accountId ? { accountId } : {}),
        }),
      );
    }
  };

  const onEndReached = () => {
    if (
      movieDataState.data.results.length !== movieDataState.data.total_results &&
      page + 1 <= movieDataState.data.total_pages
    ) {
      getData(page + 1);
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    getData(1);
    setPage(1);
  };

  useEffect(() => {
    getData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderHeaderComponent = () => (
    <>
      {listHeaderComponent?.()}
      {movieDataState.data.results.length > 0 && (
        <Text style={styles.longPressHintText}>
          Long press on a movie to add it to favorites!
        </Text>
      )}
    </>
  );

  const renderEmptyView = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        Couldn't find any movies on this!
      </Text>
      <Text style={styles.emptySubtitle}>Please try again...</Text>
    </View>
  );

  const renderLoader = () => (
    <ActivityIndicator
      size={60}
      color={Colors.primaryColor}
      style={styles.loader}
    />
  );

  const renderErrorContainer = () => (
    <View style={styles.errorContainer}>
      <MaterialIcon
        name="report-gmailerrorred"
        size={80}
        color={Colors.error}
      />
      <Text style={styles.errorText}>
        {movieDataState.error?.message ??
          'Something went wrong. Please try again later'}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: MovieType }) => (
    <MovieItem item={item} accountId={accountId} viewableItems={viewableItems} />
  );

  const keyExtractor = (item: MovieType) => item.id.toString();

  if (movieDataState.data.page < 1 && movieDataState.loading) {
    return renderLoader();
  }
  if (movieDataState.error) {
    return renderErrorContainer();
  }
  return (
    <Animated.FlatList
      data={movieDataState.data.results}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{ paddingTop: 0}}
      ListHeaderComponent={renderHeaderComponent()}
      ListEmptyComponent={renderEmptyView()}
      refreshControl={
        <RefreshControl
          refreshing={
            movieDataState.loading &&
            movieDataState.data.results.length > 0
          }
          progressBackgroundColor={Colors.cardBackground}
          colors={[Colors.primaryColor, Colors.primaryColor]}
          onRefresh={onRefresh}
        />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      onViewableItemsChanged={({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
      }}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: Colors.textColor,
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  longPressHintText: {
    color: Colors.subTextColor,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyTitle: {
    color: Colors.subTextColor,
    textAlign: 'center',
    fontSize: 20,
  },
  emptySubtitle: {
    color: Colors.subTextColor,
    fontSize: 16,
    marginTop: 8,
  },
});

export default MovieList;
