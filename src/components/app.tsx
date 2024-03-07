import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../const';
import MainPage from '../pages/mainPage';
import LoginPage from '../pages/loginPage';
import FavoritesPage from '../pages/favoritesPage';
import OfferPage from '../pages/offerPage';
import NotFoundScreen from '../pages/notFound';
import PrivateRoute from './privateRoute';

type AppProps = {
  offersCount: number;
}
function App({offersCount}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element = {<MainPage offersCount={offersCount}/>}
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
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
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
