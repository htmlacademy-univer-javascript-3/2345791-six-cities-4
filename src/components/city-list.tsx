import { cities } from '../const';
import { City } from '../types/city';

type CityListProps = {
  selectedCity: City;
  changeCity: (city: City) => void;
}

function CityList({selectedCity, changeCity}: CityListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city.name} onClick={() => changeCity(city)}>
          <a className={`locations__item-link tabs__item ${(city === selectedCity) ? 'tabs__item--active' : ''}`} >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
