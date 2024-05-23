import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/withStore';
import ErrorMessage from './error-message';
import { initialState } from '../../store/data/data';

describe('Component: ErrorMessage', () => {
  it('should render correct', () => {
    const ErrorMessageContainereTestId = 'ErrorMessageContainer';
    const {withStoreComponent} = withStore(<ErrorMessage/>, {DATA: initialState || {error: 'Generic Error Message'}});

    render(withStoreComponent);
    const ErrorMessageContainer = screen.getByTestId(ErrorMessageContainereTestId);

    expect(ErrorMessageContainer).toBeInTheDocument();
  });
});
