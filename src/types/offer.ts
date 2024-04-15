
import { OfferType } from '../const';
import {Image} from '../types/image';
import {TReview} from '../types/review';
import { City } from './city';
import { Point } from './point';

export type Offer = {
  id: number;
  name: string;
  description: string;
  image: Image;
  price: number;
  type: OfferType;
  isFavorite: boolean;
  rating: number;
  reviews: TReview [];
  isPremium: boolean;
  city: City;
  point: Point;
};
