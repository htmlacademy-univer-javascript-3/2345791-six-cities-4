
import { OfferType } from '../const';
import {Image} from '../types/image';
import {TReview} from '../types/review';

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
};
