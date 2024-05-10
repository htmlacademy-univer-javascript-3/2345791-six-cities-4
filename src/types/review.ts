import { User } from './user';

export type TReview = {
  id: number;
  rating: number;
  date: string;
  comment: string;
  user: User;
}
