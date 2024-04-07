import { cardType } from '../const';
import { Offer } from '../types/offer';
import Card from './card';

type OfferListProps = {
  offers: Offer[];
  type: cardType;
};

function OfferList({offers, type}: OfferListProps): JSX.Element {
  function listSwitch(param: cardType) {
    switch(param) {
      case cardType.Near:
        return 'near-places__list places__list';
      case cardType.Main:
        return 'cities__places-list places__list tabs__content';
      case cardType.Favorite:
        return 'favorites__places';
      default:
        return undefined;
    }
  }
  return (
    <div className={listSwitch(type)}>
      {offers.map((offer) => (
        <Card key={offer.id} offer={offer} type={type}/>
      ))}
    </div>
  );
}
export default OfferList;
