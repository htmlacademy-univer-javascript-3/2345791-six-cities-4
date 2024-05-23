import { render, screen } from '@testing-library/react';
import { withRouting, withStore } from '../../utils/withStore';
import NotFoundScreen from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correct', () => {
    const NotFoundPageContainerTestId = 'NotFoundPageContainer';
    const {withStoreComponent} = withStore(<NotFoundScreen/>);
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const NotFoundPageContainer = screen.getByTestId(NotFoundPageContainerTestId);

    expect(NotFoundPageContainer).toBeInTheDocument();
  });
});
