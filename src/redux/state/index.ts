import {CommonStateType, MovieStateType, MovieType} from '../../types';

export const getInitialData = () =>
  ({
    data: {
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: [],
      resultsMap: new Map<number, MovieType>(),
    },
    loading: false,
    error: null,
  } as MovieStateType);

export const initialState: CommonStateType = {
  auth: {accountId: null},
  nowPlayingMovies: getInitialData(),
  popularMovies: getInitialData(),
  topRatedMovies: getInitialData(),
  upcomingMovies: getInitialData(),
  searchedMovies: getInitialData(),
  favoriteMovies: getInitialData(),
};
