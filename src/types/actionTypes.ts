import {MovieListResponseType} from './responseTypes.js';

export type StoreAccountIdSuccessActionType = {
  type: string;
  payload: number;
};

export type GetMovieDataActionType = {
  type: string;
  payload: {page: number};
};

export type SearchMovieDataActionType = {
  type: string;
  payload: {query?: string; page: number};
};

export type SetMovieLoadingActionType = {
  type: string;
  payload: boolean;
};

export type SetMovieSuccessActionType = {
  type: string;
  payload: MovieListResponseType;
};

export type SetMovieFailureActionType = {
  type: string;
  payload: Error;
};

export type ResetDataActionType = {
  type: string;
  payload: any;
};

export type GetFavoriteMovieActionType = {
  type: string;
  payload: {accountId?: number; page: number};
};
