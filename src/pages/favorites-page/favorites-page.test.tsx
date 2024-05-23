import { render, screen } from '@testing-library/react';
import { withRouting, withStore } from '../../utils/withStore';
import FavoritesPage from './favorites-page';

describe('Component: FavoritesPage', () => {
  it('should render correct', () => {
    const FavoritesPageTestId = 'FavoritesPageContainer';
    const {withStoreComponent} = withStore(<FavoritesPage/>);
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const FavoritesPageContainer = screen.getByTestId(FavoritesPageTestId);

    expect(FavoritesPageContainer).toBeInTheDocument();
  });
});
