import { render, screen } from '@testing-library/react';
import { withRouting, withStore } from '../../utils/withStore';
import LoginPage from './login-page';

describe('Component: LoginPage', () => {
  it('should render correct', () => {
    const LoginPageContainerTestId = 'LoginPageContainer';
    const {withStoreComponent} = withStore(<LoginPage/>);
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const LoginPageContainer = screen.getByTestId(LoginPageContainerTestId);

    expect(LoginPageContainer).toBeInTheDocument();
  });
});
