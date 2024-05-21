import { SortType, cities } from './const';
import store from './store';
import { changeFavorite } from './store/api-actions';
import { City } from './types/city';
import { Offer } from './types/offer';


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
