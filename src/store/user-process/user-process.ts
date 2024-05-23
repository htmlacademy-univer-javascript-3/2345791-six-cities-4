import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { changeAuthorizationStatus, loadUserData } from '../action';
import { UserData } from '../../types/user-data';

type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
}
export const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(loadUserData, (state, action) => {
        state.userData = action.payload;
      });
  }
});
