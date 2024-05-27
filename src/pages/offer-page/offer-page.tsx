import {Helmet} from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace, TIMEOUT, cardType } from '../../const';
import ReviewList from '../../components/review-list/review-list';
import {Map} from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { fetchOfferAction } from '../../store/api-actions';
import store from '../../store';
import LoadingScreen from '../loading-page/loading-page';
import { useEffect } from 'react';
import {Header} from '../../components/header/header';
import { TReview } from '../../types/review';
import { changeFavoriteStatus } from '../../utils';
import React from 'react';
import { changeSelectedOffer, setOfferDataLoadingStatus } from '../../store/action';


function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state[NameSpace.Data].loadedOffer) as Offer;
  if (!offer) {
    dispatch(setOfferDataLoadingStatus(true));
  }
  const isOfferDataLoading = useAppSelector((state) => state[NameSpace.Data].isOfferDataLoading);
  const location = useLocation().pathname;
  const offerId = location.substring(location.lastIndexOf('/') + 1);
  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted && !offer) {
        store.dispatch(fetchOfferAction(offerId));
      }
    }, TIMEOUT);

    return () => {
      isMounted = false;
    };
  }, [offer, offerId]);
  const [isFavorite, setIsFavorite] = React.useState(false);
  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      if (isMounted) {
        if (offer) {
          setIsFavorite(offer.isFavorite);
          dispatch(changeSelectedOffer(offer));
          dispatch(setOfferDataLoadingStatus(false));
        }
      }
    }, TIMEOUT);

    return () => {
      isMounted = false;
    };
  }, [dispatch, offer]);
  const offers = useAppSelector((state) => state[NameSpace.Data].nearbyOffers) as Offer[];
  const reviews = useAppSelector((state) => state[NameSpace.Data].comments) as TReview[];
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  if (isOfferDataLoading) {
    return (
      <LoadingScreen />
    );
  } else {
    return (
      <div className="page" data-testid='OfferPageContainer'>
        <Helmet>
          <title>6 городов</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images.slice(0, 6).map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
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
                    {offer.title}
                  </h1>
                  {(authorizationStatus === AuthorizationStatus.Auth) ? (
                    <button className={`place-card__bookmark-button button ${(isFavorite) ? 'place-card__bookmark-button--active' : ''}`} type="button" onClick={() => {
                      setIsFavorite(!isFavorite);
                      changeFavoriteStatus(offer, isFavorite);
                    }}
                    >
                      <svg className="place-card__bookmark-icon" width={18} height={19}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">{(isFavorite) ? 'To bookmarks' : 'In bookmarks'}</span>
                    </button>
                  ) : (
                    <Link to={AppRoute.Login}>
                      <button className="place-card__bookmark-button button" type="button">
                        <svg className="place-card__bookmark-icon" width={18} height={19}>
                          <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                      </button>
                    </Link>)}
                  <span className="visually-hidden">To bookmarks</span>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${Math.round(offer.rating) * 20}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} {(offer.bedrooms > 1) ? 'Bedrooms' : 'Bedroom'}
                  </li>
                  <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} {(offer.maxAdults > 1) ? 'adults' : 'adult'}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width={74} height={74} alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {offer.host.name}
                    </span>
                    <span className="offer__user-status">
                      {(offer.host.isPro) ? 'Pro' : 'Not pro'}
                    </span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <ReviewList reviews={reviews} ></ReviewList>
              </div>
            </div>
            <section className="offer__map map" >
              <Map points={[offer.location].concat(offers.slice(0, 3).map((offerItem) => offerItem.location))}/>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OfferList offers={offers.slice(0, 3).map((offerItem) => offerItem)} type={cardType.Near}/>
            </section>
          </div>
        </main>
      </div>
    );
  }
}
export default OfferPage;
