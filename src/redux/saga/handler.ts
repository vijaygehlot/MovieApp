import {takeLatest} from 'redux-saga/effects';
import {
  FAVORITE_MOVIE_ACTION_TYPES,
  NOW_PLAYING_MOVIE_ACTIONS_TYPES,
  POPULAR_MOVIE_ACTIONS_TYPES,
  SEARCH_MOVIE_ACTIONS_TYPES,
  TOP_RATED_MOVIE_ACTIONS_TYPES,
  UPCOMING_MOVIE_ACTIONS_TYPES,
} from '../action/constants';
import {
  getFavoriteMovieData,
  getNowPlayingMovieData,
  getPopularMovieData,
  getSearchMovieData,
  getTopRatedMovieData,
  getUpcomingMovieData,
} from '.';

export function* handler() {
  yield [
    yield takeLatest(
      NOW_PLAYING_MOVIE_ACTIONS_TYPES.GET_DATA,
      getNowPlayingMovieData,
    ),
    yield takeLatest(POPULAR_MOVIE_ACTIONS_TYPES.GET_DATA, getPopularMovieData),
    yield takeLatest(
      TOP_RATED_MOVIE_ACTIONS_TYPES.GET_DATA,
      getTopRatedMovieData,
    ),
    yield takeLatest(
      UPCOMING_MOVIE_ACTIONS_TYPES.GET_DATA,
      getUpcomingMovieData,
    ),
    yield takeLatest(SEARCH_MOVIE_ACTIONS_TYPES.GET_DATA, getSearchMovieData),
    yield takeLatest(
      FAVORITE_MOVIE_ACTION_TYPES.GET_DATA,
      getFavoriteMovieData,
    ),
  ];
}
