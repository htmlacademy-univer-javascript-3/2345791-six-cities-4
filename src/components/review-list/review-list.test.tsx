import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/withStore';
import { makeFakeComment } from '../../utils';
import ReviewList from './review-list';

describe('Component: ReviewList', () => {
  it('should render correct', () => {
    const ReviewListTestId = 'ReviewListContainer';
    const {withStoreComponent} = withStore(<ReviewList reviews={[makeFakeComment()]}/>);

    render(withStoreComponent);
    const ReviewListContainer = screen.getByTestId(ReviewListTestId);

    expect(ReviewListContainer).toBeInTheDocument();
  });
});
