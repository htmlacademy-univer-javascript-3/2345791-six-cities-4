import { createSlice } from '@reduxjs/toolkit';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { NameSpace, SortType, cities } from '../../const';
import { TReview } from '../../types/review';
import { changeCity, changeSelectedOffer, changeSortType, loadComments, loadNearbyOffers } from '../action';
import { fetchOffersAction, fetchOfferAction, fetchFavoriteOffers } from '../api-actions';

type Data = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer;
  sortType: SortType;
  loadedOffer?: Offer;
  comments?: TReview[];
  nearbyOffers?: Offer[];
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  hasError: boolean;
  favoriteOffers: Offer[];
  isFavoriteOffersDataLoading: boolean;
}
const initialState: Data = {
  city: cities[0],
  offers: [],
  favoriteOffers: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isFavoriteOffersDataLoading: false,
  error: null,
  hasError: false,
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
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.loadedOffer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(loadComments, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(loadNearbyOffers, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});
