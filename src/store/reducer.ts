import { createReducer } from '@reduxjs/toolkit';
import { cities } from '../const';
import { changeCity, changeSelectedOffer, getOffers } from './action';
import { offers } from '../mocks/offers';
import {Offer} from '../types/offer';
import { City } from '../types/city';

type StateType = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer;
}

const initialState: StateType = {
  city: cities[0],
  offers: offers,
  selectedOffer: offers[0]
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
    });
});

export {reducer};
