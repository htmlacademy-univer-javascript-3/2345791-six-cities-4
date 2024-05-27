import {Helmet} from 'react-helmet-async';
import OfferList from '../../components/offer-list/offer-list';
import { NameSpace, cardType } from '../../const';
import {Map} from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {CityList} from '../../components/city-list/city-list';
import { changeCity, setOfferDataLoadingStatus } from '../../store/action';
import {SortList} from '../../components/sort-list/sort-list';
import { sortOffers } from '../../utils';
import store from '../../store';
import {Header} from '../../components/header/header';
import React from 'react';
import EmptyComponent from '../../components/empty-component/empty-component';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state[NameSpace.Data].city);
  const offers = useAppSelector((state) => state[NameSpace.Data].offers);
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state[NameSpace.Data].sortType);
  const filteredOffers = React.useMemo(() => sortOffers(offers.filter((offer) => JSON.stringify(offer.city) === JSON.stringify(city)), sortType), [city, offers, sortType]);
  const points = filteredOffers.map((offer) => offer.location);
  const hasError = useAppSelector((state) => state[NameSpace.Data].hasError);
  store.dispatch(setOfferDataLoadingStatus(true));
  return (
    <div className="page page--gray page--main" data-testid='MainPageContainer'>
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
        {hasError ? <EmptyComponent city={city}/> : (
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
                  <Map points={points}/>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default MainPage;
