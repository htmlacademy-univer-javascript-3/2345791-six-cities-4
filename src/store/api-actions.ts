import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './store';
import { AxiosInstance } from 'axios';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { loadOffer, loadOffers, setError, setOfferDataLoadingStatus, setOffersDataLoadingStatus } from './action';
import { Offer } from '../types/offer';
import store from '.';

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
    dispatch(setOfferDataLoadingStatus(false));
    dispatch(loadOffer(data));
  }
);
