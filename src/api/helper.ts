import {
  authenticationUserApi,
  createRequestTokenApi,
  createSessionIdApi,
  getUserDetailsApi,
  setFavoriteMovieApi,
} from './index.js';
import {
  AuthenticateUserResponseType,
  CreateSessionIdResponseType,
  CreateSessionTokenResponseType,
  GetUserDetailsResponseType,
} from '../types/responseTypes.js';

const authenticateUser = async () => {
  try {
    const response = await authenticationUserApi();
    if (response.ok) {
      const jsonResponse: AuthenticateUserResponseType = await response.json();
      return jsonResponse.success;
    } else {
      throw new Error('Failed to authenticate user');
    }
  } catch (error) {
    throw error;
  }
};

const createRequestTokenHelper = async () => {
  try {
    const error = new Error('Failed to create request token');
    const requestTokenResponse = await createRequestTokenApi();
    if (requestTokenResponse.ok) {
      const jsonResponse: CreateSessionTokenResponseType =
        await requestTokenResponse.json();
      if (jsonResponse.success) {
        return jsonResponse.request_token;
      }
      throw error;
    }
    throw error;
  } catch (error) {
    throw error;
  }
};

export const getRequestToken = async () => {
  try {
    const authUserResponse = await authenticateUser();
    if (authUserResponse) {
      return await createRequestTokenHelper();
    }
    throw new Error('Auth error');
  } catch (error) {
    return null;
  }
};

const getSessionId = async (requestToken: string) => {
  try {
    const error = new Error('Failed to create session id');
    const response = await createSessionIdApi(requestToken);
    if (response.ok) {
      const jsonResponse: CreateSessionIdResponseType = await response.json();
      return jsonResponse.session_id;
    }
    throw error;
  } catch (error) {
    throw error;
  }
};

export const getUserAccountId = async (requestToken: string) => {
  try {
    const sessionId = await getSessionId(requestToken);
    const response = await getUserDetailsApi(sessionId);
    if (response.ok) {
      const jsonResponse: GetUserDetailsResponseType = await response.json();
      return jsonResponse.id;
    }
    throw new Error('Failed to get user details');
  } catch (error) {
    return null;
  }
};

export const setFavoriteMovie = async (accountId: number, movieId: number) => {
  try {
    const response = await setFavoriteMovieApi(accountId, movieId);
    return response.ok;
  } catch (error) {
    return null;
  }
};
