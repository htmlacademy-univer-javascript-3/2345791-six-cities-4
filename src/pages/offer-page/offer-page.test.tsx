import { render, screen } from '@testing-library/react';
import { withRouting, withStore } from '../../utils/withStore';
import OfferPage from './offer-page';

describe('Component: OfferPage', () => {
  it('should render correct', () => {
    const OfferPageContainerTestId = 'OfferPageContainer';
    const {withStoreComponent} = withStore(<OfferPage/>);
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const OfferPageContainer = screen.getByTestId(OfferPageContainerTestId);

    expect(OfferPageContainer).toBeInTheDocument();
  });
});
