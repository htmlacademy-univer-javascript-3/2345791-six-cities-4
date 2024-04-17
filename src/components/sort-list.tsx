import React from 'react';
import { sortTypeEnum } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeSortType } from '../store/action';


function SortList(): JSX.Element {
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();
  return (
    <form className="places__sorting" action="#" method="get" onBlur =
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
        <li className={`places__option ${(sortType === sortTypeEnum.Popular) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => dispatch(changeSortType(sortTypeEnum.Popular))}>Popular</li>
        <li className={`places__option ${(sortType === sortTypeEnum.PriceLowToHigh) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => dispatch(changeSortType(sortTypeEnum.PriceLowToHigh))}>Price: low to high</li>
        <li className={`places__option ${(sortType === sortTypeEnum.PriceHighToLow) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => dispatch(changeSortType(sortTypeEnum.PriceHighToLow))}>Price: high to low</li>
        <li className={`places__option ${(sortType === sortTypeEnum.Rating) ? 'places__option--active' : ''}`} tabIndex={0} onClick={() => dispatch(changeSortType(sortTypeEnum.Rating))}>Top rated first</li>
      </ul>
    </form>
  );
}

export default SortList;
