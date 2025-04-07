import {NavigationProp, NavigationState} from '@react-navigation/native';

import {MovieResponseType} from './responseTypes.js';

export type MovieType = Omit<
  MovieResponseType,
  'adult' | 'genre_ids' | 'original_language' | 'video'
>;

export type MovieListType = {
  page: number;
  results: MovieType[];
  resultsMap: Map<number, MovieType>;
  total_pages: number;
  total_results: number;
};

export type MovieStateType = {
  loading: boolean;
  data: MovieListType;
  error: Error | null;
};

export type CommonStateType = {
  auth: {accountId: number | null};
  nowPlayingMovies: MovieStateType;
  popularMovies: MovieStateType;
  topRatedMovies: MovieStateType;
  upcomingMovies: MovieStateType;
  searchedMovies: MovieStateType;
  favoriteMovies: MovieStateType;
};

export type MovieCommonListType = Omit<CommonStateType, 'auth'>;

export type NavigationType = Omit<
  NavigationProp<Record<string, object | undefined>>,
  'getState'
> & {
  getState(): NavigationState | undefined;
};
