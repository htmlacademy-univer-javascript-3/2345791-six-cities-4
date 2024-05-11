import { City } from './types/city';

export const TIMEOUT_SHOW_ERROR = 2000;

export const enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  Root = '/'
}

export const enum AuthorizationStatus {
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
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
];

export const enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  Rating = 'Top rated first'
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Favorite = '/favorite',
  Comments = '/comments',
  Logout = '/logout',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Loading = 'LOADING',
}
