import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, NameSpace} from '../const';
import MainPage from '../pages/main-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import NotFoundScreen from '../pages/not-found-page';
import PrivateRoute from './private-route';
import ErrorMessage from './error-message/error-message';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../pages/loading-screen/loading-screen';


function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state[NameSpace.Data].isOffersDataLoading);
  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);

  if (isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>
      <ErrorMessage />
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element = {<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element = {<LoginPage/>}
          />
          <Route
            path={AppRoute.Favorites}
            element = {
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:offerId`}
            element = {<OfferPage/>}
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
