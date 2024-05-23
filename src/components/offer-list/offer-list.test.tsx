import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/withStore';
import OfferList from './offer-list';
import { makeFakeOffer } from '../../utils';
import { cardType } from '../../const';

describe('Component: OfferList', () => {
  it('should render correct', () => {
    const OfferListTestId = 'OfferListContainer';
    const {withStoreComponent} = withStore(<OfferList offers={[makeFakeOffer()]} type={cardType.Main}/>);

    render(withStoreComponent);
    const OfferListContainer = screen.getByTestId(OfferListTestId);

    expect(OfferListContainer).toBeInTheDocument();
  });
});
