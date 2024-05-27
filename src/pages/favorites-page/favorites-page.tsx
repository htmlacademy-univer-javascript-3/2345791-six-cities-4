import {Helmet} from 'react-helmet-async';
import { AppRoute, NameSpace, TIMEOUT, cardType, cities } from '../../const';
import OfferList from '../../components/offer-list/offer-list';
import { useAppSelector } from '../../hooks';
import {Header} from '../../components/header/header';
import store from '../../store';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { useEffect } from 'react';
import LoadingScreen from '../loading-page/loading-page';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state[NameSpace.Data].favoriteOffers);
  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      if (isMounted) {
        store.dispatch(fetchFavoriteOffers());
      }
    }, TIMEOUT);

    return () => {
      isMounted = false;
    };
  }, []);
  const isFavoritesLoading = useAppSelector((state) => state.DATA.isFavoriteOffersDataLoading);
  if (isFavoritesLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <div className="page" data-testid='FavoritesPageContainer'>
      <Helmet>
        <title>6 городов. Любимые предложения</title>
      </Helmet>
      <Header />
      {(offers.length > 0) ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => {
                  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
                  if (filteredOffers.length > 0) {
                    return (
                      <li className="favorites__locations-items" key={city.name}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <div>
                              <a className="locations__item-link">
                                <span>{city.name}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <OfferList offers={filteredOffers} type={cardType.Favorite}/>
                      </li>
                    );
                  }
                })}
              </ul>
            </section>
          </div>
        </main>) : (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <a className="footer__logo-link" href={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>

  );
}
export default FavoritesPage;
