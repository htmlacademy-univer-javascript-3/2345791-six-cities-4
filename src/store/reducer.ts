import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, cities, SortType } from '../const';
import { changeAuthorizationStatus, changeCity, changeSelectedOffer, changeSortType, loadComments, loadNearbyOffers, loadOffer, loadOffers, loadUserData, setError, setOfferDataLoadingStatus, setOffersDataLoadingStatus } from './action';
import {Offer} from '../types/offer';
import { City } from '../types/city';
import { UserData } from '../types/user-data';
import { TReview } from '../types/review';

type StateType = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer;
  sortType: SortType;
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  loadedOffer?: Offer;
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
  comments?: TReview[];
  nearbyOffers?: Offer[];
}

const initialState: StateType = {
  city: cities[0],
  offers: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  isOfferDataLoading: true,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.loadedOffer = action.payload;
    })
    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});

export {reducer};
