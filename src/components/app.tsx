import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../const';
import MainPage from '../pages/main-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import NotFoundScreen from '../pages/not-found-page';
import PrivateRoute from './private-route';
import { offers } from '../mocks/offers';


type AppProps = {
  offersCount: number;
}
function App({offersCount}: AppProps): JSX.Element {
  const [choosenOffer] = React.useState(offers[0]);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element = {<MainPage offersCount={offersCount} offers={offers}/>}
          />
          <Route
            path={AppRoute.Login}
            element = {<LoginPage/>}
          />
          <Route
            path={AppRoute.Favorites}
            element = {
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element = {<OfferPage offer={choosenOffer}/>}
          />
          <Route
            path="*"
            element = {<NotFoundScreen/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>


  );
}
export default App;
