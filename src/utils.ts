import { SortType } from './const';
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

