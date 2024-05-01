import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { AuthorizationStatus, SortType } from '../const';
import { UserData } from '../types/user-data';

export const changeCity = createAction('cities/change', (city: City) => ({
  payload: city
})
);

export const changeSelectedOffer = createAction('offers/change', (offer:Offer) => ({
  payload: offer
}));

export const changeSortType = createAction('sortType/change', (sortType:SortType) => ({
  payload: sortType
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setError = createAction<string | null>('cities/setError');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const changeAuthorizationStatus = createAction<AuthorizationStatus>('user/changeAuthorizationStatus');

export const loadUserData = createAction<UserData>('data/loadUserData');
