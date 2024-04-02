import { Offer } from '../types/offer';
import Card from './card';

type OfferListProps = {
  offers: Offer[];
  isNearPlaces: boolean;
};

function OfferList({offers, isNearPlaces}: OfferListProps): JSX.Element {
  return (
    <div className={(isNearPlaces) ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} isNearCard={isNearPlaces}/>
      ))}
    </div>
  );
}
export default OfferList;
