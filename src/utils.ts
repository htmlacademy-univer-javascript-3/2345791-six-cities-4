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
