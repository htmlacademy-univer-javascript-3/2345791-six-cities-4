import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/withStore';
import { makeFakeComment } from '../../utils';
import Review from './review';

describe('Component: Review', () => {
  it('should render correct', () => {
    const ReviewTestId = 'ReviewContainer';
    const {withStoreComponent} = withStore(<Review review={makeFakeComment()}/>);

    render(withStoreComponent);
    const ReviewContainer = screen.getByTestId(ReviewTestId);

    expect(ReviewContainer).toBeInTheDocument();
  });
});
