import { createReducer } from '@reduxjs/toolkit';
import { cities, sortTypeEnum } from '../const';
import { changeCity, changeSelectedOffer, changeSortType, getOffers } from './action';
import { offers } from '../mocks/offers';
import {Offer} from '../types/offer';
import { City } from '../types/city';

type StateType = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer;
  sortType: sortTypeEnum;
}

const initialState: StateType = {
  city: cities[0],
  offers: offers,
  selectedOffer: offers[0],
  sortType: sortTypeEnum.Popular
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload as unknown as City;
    })
    .addCase(getOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload as unknown as Offer;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload as unknown as sortTypeEnum;
    });
});

export {reducer};
