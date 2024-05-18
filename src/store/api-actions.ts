import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './store';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { changeAuthorizationStatus, changeCity, loadComments, loadNearbyOffers, loadOffer, loadOffers, loadUserData, setError, setOfferDataLoadingStatus, setOffersDataLoadingStatus } from './action';
import { Offer } from '../types/offer';
import store from '.';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../token';
import { TReview } from '../types/review';
import { ReviewData } from '../types/review-data';

export const clearErrorAction = createAsyncThunk(
  'cities/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    const comments = (await api.get<TReview[]>(`${APIRoute.Comments}/${id}`)).data;
    const nearbyOffers = (await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`)).data;
    dispatch(loadOffer(data));
    dispatch(loadComments(comments));
    dispatch(loadNearbyOffers(nearbyOffers));
    dispatch(changeCity(data.city));
    dispatch(setOfferDataLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
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
  },
);