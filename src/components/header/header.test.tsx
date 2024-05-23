import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/withStore';
import { Header } from './header';

describe('Component: Header', () => {
  it('should render correct', () => {
    const HeaderContainerTestId = 'HeaderMessageContainer';
    const {withStoreComponent} = withStore(<Header/>);

    render(withStoreComponent);
    const HeaderMessageContainer = screen.getByTestId(HeaderContainerTestId);

    expect(HeaderMessageContainer).toBeInTheDocument();
  });
});
