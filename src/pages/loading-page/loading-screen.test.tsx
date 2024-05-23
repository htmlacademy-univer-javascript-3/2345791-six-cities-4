import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-page';

describe('Component: LoadingScreen', () => {
  it('should render correct', () => {
    const loadingScreenContainerTestId = 'loading-container';

    render(<LoadingScreen/>);
    const loadingScreenContainer = screen.getByTestId(loadingScreenContainerTestId);

    expect(loadingScreenContainer).toBeInTheDocument();
  });
});
