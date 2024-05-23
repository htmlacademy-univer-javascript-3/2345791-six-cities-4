import { render, screen } from '@testing-library/react';
import { cities } from '../../const';
import { withRouting, withStore } from '../../utils/withStore';
import { CityList } from './city-list';

describe('Component: CityList', () => {
  it('should render correct', () => {
    const cityListContainerTestId = 'cityListContainer';
    const {withStoreComponent} = withStore(<CityList selectedCity={cities[0]} changeCity={() => {}}/>);
    const withRoutingComponent = withRouting(withStoreComponent);

    render(withRoutingComponent);
    const cityListContainer = screen.getByTestId(cityListContainerTestId);

    expect(cityListContainer).toBeInTheDocument();
    expect(screen.getByText(cities[0].name)).toBeInTheDocument();
  });
});
