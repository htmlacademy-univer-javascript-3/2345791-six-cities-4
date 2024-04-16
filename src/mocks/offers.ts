import {Offer} from '../types/offer';
import { cities, OfferType } from '../const';
import { reviews } from './reviews';
import { points } from './points';

export const offers: Offer[] = [
  {
    id: 0,
    name: 'Beautiful &amp; luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    price: 120,
    type: OfferType.Apartment,
    rating: 4.8,
    isFavorite: true,
    reviews: [reviews[0], reviews[1]],
    isPremium: false,
    image: {src:'img/apartment-01.jpg', alt: 'Apartment image'},
    city: cities[0],
    point: points[0]
  },
  {
    id: 1,
    name: 'Great room for all your needs!',
    description: 'An incredibly compact habitat for anything you might want! Only the best space-saving techniques are used such as a sofa that transforms into your bed and others!.',
    price: 100,
    type: OfferType.Room,
    rating: 3.8,
    isFavorite: false,
    reviews: [reviews[2]],
    isPremium: true,
    image: {src:'img/room.jpg', alt: 'Room image. Very compact.'},
    city: cities[3],
    point: points[1]
  },
  {
    id: 2,
    name: 'House',
    description: 'As the title says it is a house. I hope I don\' need to explain more... Do whatever with it.',
    price: 150,
    type: OfferType.House,
    rating: 5,
    isFavorite: true,
    reviews: [],
    isPremium: false,
    image: {src:'img/apartment-01.jpg', alt: 'House.'},
    city: cities[1],
    point: points[2]
  },
  {
    id: 3,
    name: 'Greatest. Hotel. Ever!!!!!',
    description: 'Gretest... Well, you get it.',
    price: 80,
    type: OfferType.Hotel,
    rating: 4.1,
    isFavorite: false,
    reviews: [reviews[2]],
    isPremium: true,
    image: {src:'img/amsterdam.jpg', alt: 'Now, let me tell you why this is the best hotel ever! First of all, it has premium PLASTIC doors! Moreover, it is...'},
    city: cities[4],
    point: points[3]
  },
];
