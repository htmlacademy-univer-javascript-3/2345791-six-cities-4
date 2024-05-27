import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus, cardType, cardTypeMap } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSelectedOffer } from '../../store/action';
import React from 'react';
import { changeFavoriteStatus } from '../../utils';

type CardProps = {
  offer:Offer;
  type: cardType;
}

function CardComponent({offer, type}: CardProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = React.useState(offer.isFavorite);
  return (
    <article className= {cardTypeMap.get(type)} onMouseEnter={() => {
      if (type === cardType.Main) {
        dispatch(changeSelectedOffer(offer));
      }
    }} data-testid='card-container'
    >
      {offer.isPremium ?
        <div className="place-card__mark">
          <span> Premium </span>
        </div> : null}
      <div className={(type === cardType.Favorite) ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={(type === cardType.Favorite) ? 150 : 260}
            height={(type === cardType.Favorite) ? 110 : 200}
          />
        </a>
      </div>
      <div className={(type === cardType.Favorite) ? 'favorites__card-info place-card__info' : 'place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
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
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
export const Card = React.memo(CardComponent, (prevProps, currentProps) => prevProps.offer === currentProps.offer && prevProps.type === prevProps.type);
