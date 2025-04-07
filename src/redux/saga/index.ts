import {put} from 'redux-saga/effects';
import {
  GetMovieDataActionType,
  SearchMovieDataActionType,
  GetFavoriteMovieActionType,
  SetMovieFailureActionType,
  SetMovieLoadingActionType,
  SetMovieSuccessActionType,
} from '../../types/actionTypes';
import {
  MovieErrorResponseType,
  MovieListResponseType,
} from '../../types/responseTypes';
import {
  favoriteMoviesAction,
  nowPlayingMovieActions,
  popularMovieActions,
  searchMovieActions,
  topRatedMovieActions,
  upcomingMovieActions,
} from '../action';
import {getFavoritesApi, getMovieDataApi, searchMovieApi} from '../../api';

type RequestParamsType =
  | {
      type: 'fetchData';
      data: {endPoint: string};
    }
  | {
      type: 'search';
      data: {query: string};
    }
  | {
      type: 'favorites';
      data: {accountId: number};
    };

function* getDataHelper(requestParams: RequestParamsType, page: number) {
  try {
    let response: Response;
    switch (requestParams.type) {
      case 'search':
        response = yield searchMovieApi(requestParams.data.query, page);
        break;
      case 'favorites':
        response = yield getFavoritesApi(requestParams.data.accountId, page);
        break;
      case 'fetchData':
      default:
        response = yield getMovieDataApi(requestParams.data.endPoint, page);
        break;
    }
    if (response.ok) {
      const jsonResponse: MovieListResponseType = yield response.json();
      return jsonResponse;
    } else {
      const jsonResponse: MovieErrorResponseType = yield response.json();
      throw new Error(jsonResponse.status_message ?? 'Failed to fetch data');
    }
  } catch (error) {
    throw error;
  }
}

const getError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }
  return new Error(error?.message ?? 'Something went wrong!');
};

function* apiHelper({
  requestParams,
  page,
  setDataFailure,
  setDataLoading,
  setDataSuccess,
  setPaginatedDataSuccess,
}: {
  requestParams: RequestParamsType;
  page: number;
  setDataLoading: (val: boolean) => SetMovieLoadingActionType;
  setDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setPaginatedDataSuccess: (
    response: MovieListResponseType,
  ) => SetMovieSuccessActionType;
  setDataFailure: (response: Error) => SetMovieFailureActionType;
}) {
  try {
    yield put(setDataLoading(true));
    const response = yield* getDataHelper(requestParams, page);
    if (page > 1) {
      yield put(setPaginatedDataSuccess(response));
    } else {
      yield put(setDataSuccess(response));
    }
  } catch (error) {
    yield put(setDataFailure(getError(error)));
  }
}

export function* getNowPlayingMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    requestParams: {type: 'fetchData', data: {endPoint: 'now_playing'}},
    page: action.payload.page,
    setDataLoading: nowPlayingMovieActions.setDataLoading,
    setDataSuccess: nowPlayingMovieActions.setDataSuccess,
    setPaginatedDataSuccess: nowPlayingMovieActions.setPaginatedDataSuccess,
    setDataFailure: nowPlayingMovieActions.setDataFailure,
  });
}

export function* getPopularMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    requestParams: {type: 'fetchData', data: {endPoint: 'popular'}},
    page: action.payload.page,
    setDataLoading: popularMovieActions.setDataLoading,
    setDataSuccess: popularMovieActions.setDataSuccess,
    setPaginatedDataSuccess: popularMovieActions.setPaginatedDataSuccess,
    setDataFailure: popularMovieActions.setDataFailure,
  });
}

export function* getTopRatedMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    requestParams: {type: 'fetchData', data: {endPoint: 'top_rated'}},
    page: action.payload.page,
    setDataLoading: topRatedMovieActions.setDataLoading,
    setDataSuccess: topRatedMovieActions.setDataSuccess,
    setPaginatedDataSuccess: topRatedMovieActions.setPaginatedDataSuccess,
    setDataFailure: topRatedMovieActions.setDataFailure,
  });
}

export function* getUpcomingMovieData(action: GetMovieDataActionType) {
  yield* apiHelper({
    requestParams: {type: 'fetchData', data: {endPoint: 'upcoming'}},
    page: action.payload.page,
    setDataLoading: upcomingMovieActions.setDataLoading,
    setDataSuccess: upcomingMovieActions.setDataSuccess,
    setPaginatedDataSuccess: upcomingMovieActions.setPaginatedDataSuccess,
    setDataFailure: upcomingMovieActions.setDataFailure,
  });
}

export function* getSearchMovieData(action: SearchMovieDataActionType) {
  yield* apiHelper({
    requestParams: {type: 'search', data: {query: action.payload.query ?? ''}},
    page: action.payload.page,
    setDataLoading: searchMovieActions.setDataLoading,
    setDataSuccess: searchMovieActions.setDataSuccess,
    setPaginatedDataSuccess: searchMovieActions.setPaginatedDataSuccess,
    setDataFailure: searchMovieActions.setDataFailure,
  });
}

export function* getFavoriteMovieData(action: GetFavoriteMovieActionType) {
  if (action.payload.accountId) {
    yield* apiHelper({
      requestParams: {
        type: 'favorites',
        data: {accountId: action.payload.accountId},
      },
      page: action.payload.page,
      setDataLoading: favoriteMoviesAction.setDataLoading,
      setDataSuccess: favoriteMoviesAction.setDataSuccess,
      setPaginatedDataSuccess: favoriteMoviesAction.setPaginatedDataSuccess,
      setDataFailure: favoriteMoviesAction.setDataFailure,
    });
  } else {
    console.error('Received empty account id');
  }
}
