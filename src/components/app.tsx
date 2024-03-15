import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../const';
import MainPage from '../pages/mainPage';
import LoginPage from '../pages/loginPage';
import FavoritesPage from '../pages/favoritesPage';
import OfferPage from '../pages/offerPage';
import NotFoundScreen from '../pages/notFound';
import PrivateRoute from './privateRoute';
import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';
import React from 'react';

type AppProps = {
  offersCount: number;
}
function App({offersCount}: AppProps): JSX.Element {
  const [choosenOffer, setChoosenOffer] = React.useState(offers[0]);
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
                authorizationStatus={AuthorizationStatus.NoAuth}
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
