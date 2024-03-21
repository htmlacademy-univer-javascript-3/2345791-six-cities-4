import {Image} from '../types/image';

export type TReview = {
  id: number;
  author: string;
  avatar: Image;
  rating: number;
  date: string;
  description: string;
}
