import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { data } from './data/data';
import { userProcess } from './user-process/user-process';

export const reducer = combineReducers({
  [NameSpace.Data]: data.reducer,
  [NameSpace.User]: userProcess.reducer,
});
