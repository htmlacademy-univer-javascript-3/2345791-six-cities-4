import { cardType, listTypeMap } from '../const';
import { Offer } from '../types/offer';
import Card from './card';

type OfferListProps = {
  offers: Offer[];
  type: cardType;
};

function OfferList({offers, type}: OfferListProps): JSX.Element {
  return (
    <div className={listTypeMap.get(type)}>
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} type={type}/>
      ))}
    </div>
  );
}
export default OfferList;
