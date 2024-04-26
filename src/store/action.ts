import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortType } from '../const';

export const changeCity = createAction('cities/change', (city: City) => ({
  payload: city
})
);
export const getOffers = createAction('offers/get');

export const changeSelectedOffer = createAction('offers/change', (offer:Offer) => ({
  payload: offer
}));

export const changeSortType = createAction('sortType/change', (sortType:SortType) => ({
  payload: sortType
}));
