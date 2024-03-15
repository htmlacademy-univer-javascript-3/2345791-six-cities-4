import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 0,
    author: 'Angelina',
    avatar: {src:'img/avatar-angelina.jpg', alt: 'avatar'},
    rating: 5,
    date: 'March 2024',
    description: 'Great!'
  },
  {
    id: 1,
    author: 'Max',
    avatar: {src:'img/avatar-max.jpg', alt: 'avatar'},
    rating: 2.5,
    date: 'December 2023',
    description: 'Too cold. Seriously, can they do something about the weather at least once?'
  },
  {
    id: 2,
    author: 'Max',
    avatar: {src:'img/avatar-max.jpg', alt: 'avatar'},
    rating: 3,
    date: 'June 2023',
    description: 'Too hot. Doors are plastic...'
  },
  {
    id: 3,
    author: 'Max',
    avatar: {src:'img/avatar-max.jpg', alt: 'avatar'},
    rating: 1,
    date: 'March 2024',
    description: 'Do not belive this offer! Fake reviews and poor hospitality! Spent sneezing and wheezing the entire trip. It\'s like they\'re not even trying to be accommodating!'
  }
];
