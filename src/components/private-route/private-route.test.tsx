import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';
import { withRouting } from '../../utils/withStore';

describe('Component: PrivateRoute', () => {

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withRouting(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withRouting(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
