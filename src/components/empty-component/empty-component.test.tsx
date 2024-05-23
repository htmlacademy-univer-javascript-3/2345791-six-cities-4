import { render, screen } from '@testing-library/react';
import EmptyComponent from './empty-component';
import { cities } from '../../const';

describe('Component: EmptyComponent', () => {
  it('should render correct', () => {
    const EmptyComponentContainerTestId = 'EmptyComponentContainer';

    render(<EmptyComponent city={cities[0]}/>);
    const EmptyComponentContainer = screen.getByTestId(EmptyComponentContainerTestId);

    expect(EmptyComponentContainer).toBeInTheDocument();
  });
});
