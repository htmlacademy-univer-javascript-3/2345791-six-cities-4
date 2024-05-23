import React from 'react';
import { NameSpace, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/action';


function SortListComponent(): JSX.Element {
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const sortType = useAppSelector((state) => state[NameSpace.Data].sortType);
  const dispatch = useAppDispatch();
  const changeSortTypeHandler = (selectedType: SortType) => {
    dispatch(changeSortType(selectedType));
    setIsSortOpen(false);
  };
  return (
    <form className="places__sorting" data-testid='SortListContainer' action="#" method="get" onBlur =
      {(e) => {
        if (e.relatedTarget === null) {
          setIsSortOpen(false);
        }
      }}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsSortOpen(true)}>
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${(isSortOpen) ? 'places__options--opened' : ''}`}>
        <li className={`places__option ${(sortType === SortType.Popular) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => changeSortTypeHandler(SortType.Popular)}>Popular</li>
        <li className={`places__option ${(sortType === SortType.PriceLowToHigh) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => changeSortTypeHandler(SortType.PriceLowToHigh)}>Price: low to high</li>
        <li className={`places__option ${(sortType === SortType.PriceHighToLow) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => changeSortTypeHandler(SortType.PriceHighToLow)}>Price: high to low</li>
        <li className={`places__option ${(sortType === SortType.Rating) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => changeSortTypeHandler(SortType.Rating)}>Top rated first</li>
      </ul>
    </form>
  );
}

export const SortList = React.memo(SortListComponent);
