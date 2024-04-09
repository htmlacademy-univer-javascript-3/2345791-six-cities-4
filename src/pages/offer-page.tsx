import {Helmet} from 'react-helmet-async';
import { Offer } from '../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute, cardType } from '../const';
import ReviewList from '../components/review-list';
import Map from '../components/map';
import { points } from '../mocks/points';
import { amsterdam } from '../mocks/amsterdam';
import OfferList from '../components/offer-list';
import { offers } from '../mocks/offers';

type OfferPageProps = {
  offer:Offer;
}

function OfferPage({offer}: OfferPageProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 городов</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src={offer.image.src} alt={offer.image.alt} />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.name}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${offer.rating * 20}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
              3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
              Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                Washing machine
                  </li>
                  <li className="offer__inside-item">
                Towels
                  </li>
                  <li className="offer__inside-item">
                Heating
                  </li>
                  <li className="offer__inside-item">
                Coffee machine
                  </li>
                  <li className="offer__inside-item">
                Baby seat
                  </li>
                  <li className="offer__inside-item">
                Kitchen
                  </li>
                  <li className="offer__inside-item">
                Dishwasher
                  </li>
                  <li className="offer__inside-item">
                Cabel TV
                  </li>
                  <li className="offer__inside-item">
                Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                Angelina
                  </span>
                  <span className="offer__user-status">
                Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <ReviewList reviews={offer.reviews} ></ReviewList>
            </div>
          </div>
          <section className="offer__map map" >
            <Map points={points} city={amsterdam} selectedPoint={undefined}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offers={offers} type={cardType.Near}/>
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
