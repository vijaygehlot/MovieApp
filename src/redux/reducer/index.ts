import {CommonStateType, MovieCommonListType, MovieType} from '../../types';
import {MovieListResponseType} from '../../types/responseTypes';
import {
  AUTHENTICATION_ACTION_TYPE,
  FAVORITE_MOVIE_ACTION_TYPES,
  NOW_PLAYING_MOVIE_ACTIONS_TYPES,
  POPULAR_MOVIE_ACTIONS_TYPES,
  SEARCH_MOVIE_ACTIONS_TYPES,
  TOP_RATED_MOVIE_ACTIONS_TYPES,
  UPCOMING_MOVIE_ACTIONS_TYPES,
} from '../action/constants';
import {getInitialData, initialState} from '../state';

const storeAccountId = (
  state: CommonStateType,
  payload: number,
): CommonStateType => ({
  ...state,
  auth: {accountId: payload},
});

const setLoadingHelper = (
  state: CommonStateType,
  payload: boolean,
  key: keyof MovieCommonListType,
): CommonStateType => {
  const newState = {...state};
  newState[key] = {...newState[key], error: null, loading: payload};
  return newState;
};

const setSuccessHelper = (
  state: CommonStateType,
  payload: MovieListResponseType,
  key: keyof MovieCommonListType,
): CommonStateType => {
  const newState = {...state};
  const resultsMap = new Map<number, MovieType>();
  payload.results.forEach(val => resultsMap.set(val.id, val));
  newState[key] = {
    error: null,
    loading: false,
    data: {
      page: payload.page,
      total_pages: payload.total_pages,
      total_results: payload.total_results,
      results: payload.results,
      resultsMap,
    },
  };
  return newState;
};

const setPaginatedSuccessHelper = (
  state: CommonStateType,
  payload: MovieListResponseType,
  key: keyof MovieCommonListType,
): CommonStateType => {
  const newState = {...state};
  const newMap = new Map(newState[key].data.resultsMap);
  const newResults = newState[key].data.results.slice();

  payload.results.forEach(val => {
    if (!newMap.has(val.id)) {
      newMap.set(val.id, val);
      newResults.push(val);
    }
  });

  newState[key] = {
    error: null,
    loading: false,
    data: {
      page: payload.page,
      total_pages: payload.total_pages,
      total_results: payload.total_results,
      results: newResults,
      resultsMap: newMap,
    },
  };
  return newState;
};

const setFailureHelper = (
  state: CommonStateType,
  payload: Error,
  key: keyof MovieCommonListType,
): CommonStateType => {
  const newState = {...state};
  newState[key] = {...newState[key], loading: false, error: payload};
  return newState;
};

const resetData = (
  state: CommonStateType,
  key: keyof MovieCommonListType,
): CommonStateType => {
  const newState = {...state};
  newState[key] = getInitialData();
  return newState;
};

export const reducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case AUTHENTICATION_ACTION_TYPE.STORE_ACCOUNT_ID:
      return storeAccountId(state, action.payload);

    case NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_LOADING:
      return setLoadingHelper(state, action.payload, 'nowPlayingMovies');
    case NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_SUCCESS:
      return setSuccessHelper(state, action.payload, 'nowPlayingMovies');
    case NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS:
      return setPaginatedSuccessHelper(
        state,
        action.payload,
        'nowPlayingMovies',
      );
    case NOW_PLAYING_MOVIE_ACTIONS_TYPES.SET_FAILURE:
      return setFailureHelper(state, action.payload, 'nowPlayingMovies');

    case POPULAR_MOVIE_ACTIONS_TYPES.SET_LOADING:
      return setLoadingHelper(state, action.payload, 'popularMovies');
    case POPULAR_MOVIE_ACTIONS_TYPES.SET_SUCCESS:
      return setSuccessHelper(state, action.payload, 'popularMovies');
    case POPULAR_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS:
      return setPaginatedSuccessHelper(state, action.payload, 'popularMovies');
    case POPULAR_MOVIE_ACTIONS_TYPES.SET_FAILURE:
      return setFailureHelper(state, action.payload, 'popularMovies');

    case TOP_RATED_MOVIE_ACTIONS_TYPES.SET_LOADING:
      return setLoadingHelper(state, action.payload, 'topRatedMovies');
    case TOP_RATED_MOVIE_ACTIONS_TYPES.SET_SUCCESS:
      return setSuccessHelper(state, action.payload, 'topRatedMovies');
    case TOP_RATED_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS:
      return setPaginatedSuccessHelper(state, action.payload, 'topRatedMovies');
    case TOP_RATED_MOVIE_ACTIONS_TYPES.SET_FAILURE:
      return setFailureHelper(state, action.payload, 'topRatedMovies');

    case UPCOMING_MOVIE_ACTIONS_TYPES.SET_LOADING:
      return setLoadingHelper(state, action.payload, 'upcomingMovies');
    case UPCOMING_MOVIE_ACTIONS_TYPES.SET_SUCCESS:
      return setSuccessHelper(state, action.payload, 'upcomingMovies');
    case UPCOMING_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS:
      return setPaginatedSuccessHelper(state, action.payload, 'upcomingMovies');
    case UPCOMING_MOVIE_ACTIONS_TYPES.SET_FAILURE:
      return setFailureHelper(state, action.payload, 'upcomingMovies');

    case SEARCH_MOVIE_ACTIONS_TYPES.SET_LOADING:
      return setLoadingHelper(state, action.payload, 'searchedMovies');
    case SEARCH_MOVIE_ACTIONS_TYPES.SET_SUCCESS:
      return setSuccessHelper(state, action.payload, 'searchedMovies');
    case SEARCH_MOVIE_ACTIONS_TYPES.SET_PAGINATED_SUCCESS:
      return setPaginatedSuccessHelper(state, action.payload, 'searchedMovies');
    case SEARCH_MOVIE_ACTIONS_TYPES.SET_FAILURE:
      return setFailureHelper(state, action.payload, 'searchedMovies');
    case SEARCH_MOVIE_ACTIONS_TYPES.RESET_DATA:
      return resetData(state, 'searchedMovies');

    case FAVORITE_MOVIE_ACTION_TYPES.SET_LOADING:
      return setLoadingHelper(state, action.payload, 'favoriteMovies');
    case FAVORITE_MOVIE_ACTION_TYPES.SET_SUCCESS:
      return setSuccessHelper(state, action.payload, 'favoriteMovies');
    case FAVORITE_MOVIE_ACTION_TYPES.SET_PAGINATED_SUCCESS:
      return setPaginatedSuccessHelper(state, action.payload, 'favoriteMovies');
    case FAVORITE_MOVIE_ACTION_TYPES.SET_FAILURE:
      return setFailureHelper(state, action.payload, 'favoriteMovies');
    case FAVORITE_MOVIE_ACTION_TYPES.RESET_DATA:
      return resetData(state, 'favoriteMovies');

    default:
      return state;
  }
};
