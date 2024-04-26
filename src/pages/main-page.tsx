import {Helmet} from 'react-helmet-async';
import OfferList from '../components/offer-list';
import { Link } from 'react-router-dom';
import { AppRoute, cardType } from '../const';
import Map from '../components/map';
import { useAppDispatch, useAppSelector } from '../hooks';
import CityList from '../components/city-list';
import { changeCity } from '../store/action';
import SortList from '../components/sort-list';
import { sortOffers } from '../utils';

function MainPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state.sortType);
  const filteredOffers = sortOffers(offers.filter((offer) => offer.city === city), sortType);
  const points = filteredOffers.map((offer) => offer.point);
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 городов</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              <b className="places__found">{filteredOffers.length} places to stay in {city.title}</b>
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
      </main>
    </div>
  );
}
export default MainPage;
