import {Helmet} from 'react-helmet-async';
import OfferList from '../components/offer-list';
import { cardType } from '../const';
import Map from '../components/map';
import { useAppDispatch, useAppSelector } from '../hooks';
import CityList from '../components/city-list';
import { changeCity, setOfferDataLoadingStatus } from '../store/action';
import SortList from '../components/sort-list';
import { sortOffers } from '../utils';
import store from '../store';
import Header from '../components/header';

function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state.sortType);
  const filteredOffers = sortOffers(offers.filter((offer) => JSON.stringify(offer.city) === JSON.stringify(city)), sortType);
  store.dispatch(setOfferDataLoadingStatus(true));
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 городов</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList selectedCity={city} changeCity={(newCity) => dispatch(changeCity(newCity))}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {city.name}</b>
              <SortList/>
              <OfferList offers={filteredOffers} type={cardType.Main}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                <Map points={filteredOffers.map((offer) => offer.location)}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
