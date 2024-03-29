import { Offer } from '../types/offer';
import Card from './card';

type OfferListProps = {
  offers: Offer[];
};

function OfferList({offers}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer}/>
      ))}
    </div>
  );
}
export default OfferList;
