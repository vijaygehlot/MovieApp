export type AuthenticateUserResponseType = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export type CreateSessionTokenResponseType = {
  success: boolean;
  expires_at: string;  // ISO 8601 format
  request_token: string;
};

export type CreateSessionIdResponseType = {
  success: boolean;
  session_id: string;
};

export type GetUserDetailsResponseType = {
  avatar: {
    gravatar: {hash: string};
    tmdb: {avatar_path: string | null};
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export type MovieResponseType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type DatesType = {
  maximum: string;
  minimum: string;
};

export type MovieListResponseType = {
  dates: DatesType;
  page: number;
  results: MovieResponseType[];
  total_pages: number;
  total_results: number;
};

export type MovieErrorResponseType = {
  status_code: number;
  status_message: string;
  success: boolean;
};
