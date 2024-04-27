
import { OfferType } from '../const';
import {Image} from '../types/image';
import {TReview} from '../types/review';
import { City } from './city';
import { Host } from './host';
import { Location } from './location';

export type Offer = {
  id: string;
  title: string;
  description: string;
  image: Image;
  price: number;
  type: OfferType;
  isFavorite: boolean;
  rating: number;
  reviews: TReview [];
  isPremium: boolean;
  city: City;
  location: Location;
  bedrooms: number;
  goods: string[];
  images: string[];
  maxAdults: number;
  host: Host;
  previewImage: string;
};
