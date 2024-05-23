import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils';
import { changeAuthorizationStatus, loadUserData } from '../action';
import { initialState, userProcess } from './user-process';

describe('User Process slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const result = userProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change authorizationStatus with "changeAuthorizationStatus" action', () => {
    const expectedAuthorizationStatus = AuthorizationStatus.Auth;

    const result = userProcess.reducer(initialState, changeAuthorizationStatus(AuthorizationStatus.Auth));

    expect(result.authorizationStatus).toEqual(expectedAuthorizationStatus);
  });

  it('should change authorizationStatus with "loadUserData" action', () => {
    const expectedUserData = makeFakeUserData();

    const result = userProcess.reducer(initialState, loadUserData(makeFakeUserData()));

    expect(result.userData).toEqual(expectedUserData);
  });
});
