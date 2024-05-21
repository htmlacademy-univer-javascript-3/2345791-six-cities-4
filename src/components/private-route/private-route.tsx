import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { PropsWithChildren } from 'react';

type PrivateRouteProps = PropsWithChildren & {
  authorizationStatus: AuthorizationStatus;
}

function PrivateRoute(props: PrivateRouteProps): React.ReactNode {
  const {authorizationStatus, children} = props;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (children);
  }
  return <Navigate to={AppRoute.Login}/>;
}

export default PrivateRoute;
