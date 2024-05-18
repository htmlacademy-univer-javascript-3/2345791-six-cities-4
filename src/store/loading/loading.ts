import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { setError, setOfferDataLoadingStatus, setOffersDataLoadingStatus } from '../action';

type Loading = {
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
}
const initialState: Loading = {
  isOffersDataLoading: false,
  isOfferDataLoading: true,
  error: null,
};

export const loading = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setOffersDataLoadingStatus, (state, action) => {
        state.isOffersDataLoading = action.payload;
      })
      .addCase(setOfferDataLoadingStatus, (state, action) => {
        state.isOfferDataLoading = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
