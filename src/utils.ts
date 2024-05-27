import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { OfferType, SortType, cities } from './const';
import store from './store';
import { changeFavorite } from './store/api-actions';
import { City } from './types/city';
import { Offer } from './types/offer';
import { TReview } from './types/review';
import { UserData } from './types/user-data';
import { createAPI } from './services/api';
import { State } from './store/store';
import { Location } from './types/location';
import { ReviewData } from './types/review-data';
import { FavoriteData } from './types/favorite-data';

export function sortOffers(offers: Offer[], sortType: SortType) {
  switch(sortType) {
    case SortType.PriceHighToLow:
      offers.sort((a, b) => b.price - a.price);
      break;
    case SortType.PriceLowToHigh:
      offers.sort((a, b) => a.price - b.price);
      break;
    case SortType.Rating:
      offers.sort((a, b) => b.rating - a.rating);
      break;
  }
  return offers;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const newDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
  return newDate;
}

export function formatDateForView(dateString: string) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const date = new Date(dateString);
  const newDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  return newDate;
}

export function changeFavoriteStatus(offer: Offer, isFavorite: boolean) {
  const status = isFavorite ? 0 : 1;
  store.dispatch(changeFavorite({id: offer.id, status: status}));
}

export function getRandomCity(): City {
  return cities[Math.round(Math.random() * 5)];
}

function makeFakeLocation(): Location {
  return {
    latitude: 1,
    longitude: 1,
    zoom: 1,
  };
}

export function makeFakeOffer(): Offer {
  return {
    id: 'string',
    title: 'string',
    description: 'string',
    price: 1,
    type: OfferType.Apartment,
    isFavorite: true,
    rating: 3,
    isPremium: true,
    city: cities[0],
    location: makeFakeLocation(),
    bedrooms: 1,
    goods: ['', 'fwef', 'random'],
    images: ['', 'fwef', 'random'],
    maxAdults: 3,
    host: {
      name: 'string',
      avatarUrl: 'string',
      isPro: true,
    },
    previewImage: 'string',
  };
}

export function makeFakeComment(): TReview {
  return {
    id: 1,
    rating: 3,
    date: 'March 5th',
    comment: 'string',
    user: {
      name: 'string',
      avatarUrl: 'string',
      isPro: true,
    },
  };
}

export function makeFakeUserData(): UserData {
  return {
    name: 'string',
    email: 'string',
    token: 'string',
    avatarUrl: 'string',
    isPro: true,
  };
}

export function makeFakeReviewData(): ReviewData {
  return {
    id: '1',
    rating: 3,
    comment: 'string',
  };
}

export function makeFakeFavoriteData(): FavoriteData {
  return {
    id: '1',
    status: 1,
  };
}

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
