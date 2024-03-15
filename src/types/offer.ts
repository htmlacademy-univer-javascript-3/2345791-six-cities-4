
import { OfferType } from '../const';
import {Image} from '../types/image';
import {Review} from '../types/review';

export type Offer = {
  id: number;
  name: string;
  description: string;
  image: Image;
  price: number;
  type: OfferType;
  isFavorite: boolean;
  rating: number;
  reviews: Review [];
  isPremium: boolean;
};
