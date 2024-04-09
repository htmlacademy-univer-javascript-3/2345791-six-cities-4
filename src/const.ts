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
    ])

    export const listTypeMap = new Map([
      [cardType.Near, 'near-places__list places__list'],
      [cardType.Main, 'cities__places-list places__list tabs__content'],
      [cardType.Favorite, 'favorites__places']
    ])
