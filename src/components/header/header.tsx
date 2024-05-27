import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import React from 'react';
import { logoutAction } from '../../store/api-actions';

function HeaderComponent(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);
  const userData = useAppSelector((state) => state[NameSpace.User].userData);
  const favoritesCount = useAppSelector((state) => state.DATA.favoriteOffers).length;
  const dispatch = useAppDispatch();
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <header className="header" data-testid='HeaderMessageContainer'>
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{userData?.email}</span>
                    <span className="header__favorite-count">{favoritesCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to={AppRoute.Login}>
                    <span className="header__signout" onClick={() => {
                      {
                        dispatch(logoutAction());
                      }
                    }}
                    >Sign out
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href={AppRoute.Login}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <Link to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
export const Header = React.memo(HeaderComponent);
