import { render, screen } from '@testing-library/react';
import { Card } from './card';
import { makeFakeOffer } from '../../utils';
import { AuthorizationStatus, cardType } from '../../const';
import { withRouting, withStore } from '../../utils/withStore';

describe('Component: Card', () => {
  it('should render correct', () => {
    const cardContainerTestId = 'card-container';
    const {withStoreComponent} = withStore(<Card offer={makeFakeOffer()} type={cardType.Main}/>, {USER: {authorizationStatus: AuthorizationStatus.Auth}});
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const cardContainer = screen.getByTestId(cardContainerTestId);

    expect(cardContainer).toBeInTheDocument();
    expect(screen.getByText(makeFakeOffer().title)).toBeInTheDocument();
  });
});
