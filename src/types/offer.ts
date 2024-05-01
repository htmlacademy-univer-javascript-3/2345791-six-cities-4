
import { OfferType } from '../const';
import { City } from './city';
import { Location } from './location';
import { User } from './user';

export type Offer = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: OfferType;
  isFavorite: boolean;
  rating: number;
  isPremium: boolean;
  city: City;
  location: Location;
  bedrooms: number;
  goods: string[];
  images: string[];
  maxAdults: number;
  host: User;
  previewImage: string;
};
