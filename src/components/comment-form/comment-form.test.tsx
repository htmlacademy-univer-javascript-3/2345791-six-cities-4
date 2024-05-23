import { render, screen } from '@testing-library/react';
import { CommentForm } from './comment-form';

describe('Component: CommentForm', () => {
  it('should render correct', () => {
    const commentFormContainerTestId = 'commentFormContainer';

    render(<CommentForm/>);
    const commentFormContainer = screen.getByTestId(commentFormContainerTestId);

    expect(commentFormContainer).toBeInTheDocument();
  });
});
