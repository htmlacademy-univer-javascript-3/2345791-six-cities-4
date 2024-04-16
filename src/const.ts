import { City } from './types/city';

export const Settings = {
  offersCount: 100
};

export const enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Root = '/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const enum OfferType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel'
}

export const enum cardType {
  Main = 'main',
  Favorite = 'favorite',
  Near = 'near'
}
export const cardTypeMap = new Map([
  [cardType.Near, 'near-places__card place-card'],
  [cardType.Main, 'cities__card place-card'],
  [cardType.Favorite, 'favorites__card place-card']
]);

export const listTypeMap = new Map([
  [cardType.Near, 'near-places__list places__list'],
  [cardType.Main, 'cities__places-list places__list tabs__content'],
  [cardType.Favorite, 'favorites__places']
]);


export const cities: City[] = [
  {
    title: 'Paris',
    lat: 48.864716,
    lng: 2.349014
  },
  {
    title: 'Brussels',
    lat: 50.85045,
    lng: 4.34878
  },
  {
    title: 'Cologne',
    lat: 50.933594,
    lng: 6.961899
  },
  {
    title: 'Amsterdam',
    lat: 52.377956,
    lng: 4.897070
  },
  {
    title: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682
  },
  {
    title: 'Dusseldorf',
    lat: 51.233334,
    lng: 6.783333
  },
];
