import { createSlice } from '@reduxjs/toolkit';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { NameSpace, SortType, cities } from '../../const';
import { TReview } from '../../types/review';
import { changeCity, changeSelectedOffer, changeSortType, loadOffers, loadOffer, loadComments, loadNearbyOffers } from '../action';

type Data = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer;
  sortType: SortType;
  loadedOffer?: Offer;
  comments?: TReview[];
  nearbyOffers?: Offer[];
}
const initialState: Data = {
  city: cities[0],
  offers: [],
  sortType: SortType.Popular,
};

export const data = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(changeSelectedOffer, (state, action) => {
        state.selectedOffer = action.payload;
      })
      .addCase(changeSortType, (state, action) => {
        state.sortType = action.payload;
      })
      .addCase(loadOffers, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(loadOffer, (state, action) => {
        state.loadedOffer = action.payload;
      })
      .addCase(loadComments, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(loadNearbyOffers, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});
