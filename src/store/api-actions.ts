import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './store';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { changeAuthorizationStatus, changeCity, loadComments, loadNearbyOffers, loadUserData, setError } from './action';
import { Offer } from '../types/offer';
import store from '.';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { TReview } from '../types/review';
import { ReviewData } from '../types/review-data';
import { FavoriteData } from '../types/favorite-data';

export const clearErrorAction = createAsyncThunk(
  'cities/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    const comments = (await api.get<TReview[]>(`${APIRoute.Comments}/${id}`)).data;
    const nearbyOffers = (await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`)).data;
    dispatch(loadComments(comments));
    dispatch(loadNearbyOffers(nearbyOffers));
    dispatch(changeCity(data.city));
    dispatch(clearErrorAction());
    return data;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(clearErrorAction());
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(loadUserData(data));
    } catch {
      dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
    dispatch(clearErrorAction());
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(loadUserData(data));
    dispatch(fetchFavoriteOffers());
    dispatch(fetchOffersAction());
    dispatch(clearErrorAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(clearErrorAction());
  },
);

export const postComment = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/comment',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    await api.post<ReviewData>(`${APIRoute.Comments}/${id}`, {comment, rating});
    const comments = (await api.get<TReview[]>(`${APIRoute.Comments}/${id}`)).data;
    dispatch(loadComments(comments));
    dispatch(clearErrorAction());
  },
);


export const changeFavorite = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/favorite',
  async ({id, status}, {dispatch, extra: api}) => {
    await api.post<ReviewData>(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(fetchFavoriteOffers());
    dispatch(clearErrorAction());
  },
);
