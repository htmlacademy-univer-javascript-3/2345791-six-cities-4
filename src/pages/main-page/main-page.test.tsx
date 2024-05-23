import { render, screen } from '@testing-library/react';
import { withRouting, withStore } from '../../utils/withStore';
import MainPage from './main-page';

describe('Component: MainPage', () => {
  it('should render correct', () => {
    const MainPageContainerTestId = 'MainPageContainer';
    const {withStoreComponent} = withStore(<MainPage/>);
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const MainPageContainer = screen.getByTestId(MainPageContainerTestId);

    expect(MainPageContainer).toBeInTheDocument();
  });
});
