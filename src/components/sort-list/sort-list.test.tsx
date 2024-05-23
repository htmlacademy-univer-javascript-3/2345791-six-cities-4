import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/withStore';
import { SortList } from './sort-list';

describe('Component: SortList', () => {
  it('should render correct', () => {
    const SortListTestId = 'SortListContainer';
    const {withStoreComponent} = withStore(<SortList/>);

    render(withStoreComponent);
    const SortListContainer = screen.getByTestId(SortListTestId);

    expect(SortListContainer).toBeInTheDocument();
  });
});
