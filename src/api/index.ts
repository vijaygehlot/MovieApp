//import TMDB_ACCESS_TOKEN from '../config';
import {BASE_URLS} from './baseURL';
const TMDB_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjVjMjhkZjUxYzFkZWEzNWVhNGU1MzRjMGUyZDQ4NyIsIm5iZiI6MTc0Mzg1MDQxNC45MTM5OTk4LCJzdWIiOiI2N2YxMGJhZTJmN2Q0MzcwMjc5OTg4OGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KRIAbL3x3g1SPdancyzl3YcmrjpCaowMxmvv_4nlBgI';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

const getPostOptions = (body: Object) => ({
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
  body: JSON.stringify(body),
});

export const authenticationUserApi = async () => {
  return await fetch(BASE_URLS.AUTHENTICATE_USER, options);
};

export const createRequestTokenApi = async () => {
  return await fetch(BASE_URLS.CREATE_REQUEST_TOKEN, options);
};

export const createSessionIdApi = async (requestToken: string) => {
  return await fetch(
    BASE_URLS.CREATE_SESSION_ID,
    getPostOptions({request_token: requestToken}),
  );
};

export const getUserDetailsApi = async (sessionId: string) => {
  const url = `${BASE_URLS.GET_ACCOUNT_DETAILS}?session_id=${sessionId}`;
  return await fetch(url, options);
};

export const getMovieDataApi = async (endPoint: string, page: number) => {
  const url = `${BASE_URLS.MOVIE_LIST}/${endPoint}?language=en-US&include_adult=false&include_video=false&page=${page}`;
  return await fetch(url, options);
};

export const searchMovieApi = async (query: string, page: number) => {
  const url = `${BASE_URLS.SEARCH_MOVIES}?query=${query}&language=en-US&include_adult=false&include_video=false&page=${page}`;
  return await fetch(url, options);
};

export const getFavoritesApi = async (accountId: number, page: number) => {
  const url = `${BASE_URLS.GET_ACCOUNT_DETAILS}/${accountId}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.desc`;
  return await fetch(url, options);
};

export const setFavoriteMovieApi = async (
  accountId: number,
  movieId: number,
) => {
  const url = `${BASE_URLS.GET_ACCOUNT_DETAILS}/${accountId}/favorite`;
  return await fetch(
    url,
    getPostOptions({
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    }),
  );
};
