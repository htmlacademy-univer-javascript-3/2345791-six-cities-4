import { createReducer } from '@reduxjs/toolkit';
import { cities, SortType } from '../const';
import { changeCity, changeSelectedOffer, changeSortType, loadOffer, loadOffers, setError, setOfferDataLoadingStatus, setOffersDataLoadingStatus } from './action';
import {Offer} from '../types/offer';
import { City } from '../types/city';

type StateType = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer;
  sortType: SortType;
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  loadedOffer?: Offer;
}

const initialState: StateType = {
  city: cities[0],
  offers: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  isOfferDataLoading: true,
  error: null,
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
