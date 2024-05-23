import {Helmet} from 'react-helmet-async';
import { NameSpace, cardType, cities } from '../../const';
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
    store.dispatch(fetchFavoriteOffers());
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
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>

  );
}
export default FavoritesPage;
