import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { State } from './store';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes, makeFakeFavoriteData, makeFakeOffer, makeFakeReviewData } from '../utils';
import { initialState as dataInitialState } from './data/data';
import { initialState as userInitialState } from './user-process/user-process';
import { APIRoute } from '../const';
import { changeFavorite, checkAuthAction, clearErrorAction, fetchFavoriteOffers, fetchOfferAction, fetchOffersAction, loginAction, logoutAction, postComment } from './api-actions';
import { AuthData } from '../types/auth-data';
import { changeAuthorizationStatus, loadComments, loadUserData, setError } from './action';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({DATA: dataInitialState, USER: userInitialState});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emmitedActions = store.getActions();
      const actions = extractActionsTypes(emmitedActions);
      const fetchOffersActionFulfilled = emmitedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 400', async () => {
      const expectedErrorMessage = 'Generic error message';
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, [{payload: '', error: {message: expectedErrorMessage}}]);

      await store.dispatch(fetchOffersAction());

      const emmitedActions = store.getActions();
      const actions = extractActionsTypes(emmitedActions);

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });

    describe('fetchOfferAction', () => {
      it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response 200', async () => {
        const mockOffer = makeFakeOffer();
        const mockId = 'fakeIdString';
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}`).reply(200, mockOffer);

        await store.dispatch(fetchOfferAction(mockId));

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);
        const fetchOffersActionFulfilled = emmitedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

        expect(actions).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.fulfilled.type,
        ]);

        expect(fetchOffersActionFulfilled.payload)
          .toEqual(mockOffer);
      });

      it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected".', async () => {
        const mockId = 'fakeIdString';
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}`).reply(400, []);

        await store.dispatch(fetchOfferAction(mockId));

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.rejected.type,
        ]);
      });
    });

    describe('fetchFavoriteOffers', () => {
      it('should dispatch "fetchFavoriteOffers.pending" and "fetchFavoriteOffers.fulfilled" when server response 200', async () => {
        const mockOffers = [makeFakeOffer()];
        mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, mockOffers);

        await store.dispatch(fetchFavoriteOffers());

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);
        const fetchFavoriteOffersActionFulfilled = emmitedActions.at(1) as ReturnType<typeof fetchFavoriteOffers.fulfilled>;

        expect(actions).toEqual([
          fetchFavoriteOffers.pending.type,
          fetchFavoriteOffers.fulfilled.type,
        ]);

        expect(fetchFavoriteOffersActionFulfilled.payload)
          .toEqual(mockOffers);
      });

      it('should dispatch "fetchFavoriteOffers.pending" and "fetchFavoriteOffers.rejected" when server response 400.', async () => {
        const expectedErrorMessage = 'Generic error message';
        mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(400, [{payload: '', error: {message: expectedErrorMessage}}]);

        await store.dispatch(fetchFavoriteOffers());

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          fetchFavoriteOffers.pending.type,
          fetchFavoriteOffers.rejected.type,
        ]);
      });
    });
    describe('loginAction', () => {
      it('should dispatch "loginAction.pending" and "loginAction.fulfilled" and "saveToken" when server response 200', async () => {
        const fakeUser: AuthData = {email: 'fakeUser@fake.ru', password: 'password'};
        const fakeServerReply = {token: 'secretToken'};
        mockAxiosAdapter.onGet(`${APIRoute.Login}`).reply(200, fakeServerReply);
        const mockSaveToken = vi.spyOn(localStorage, 'saveToken');

        await store.dispatch(loginAction(fakeUser));

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          changeAuthorizationStatus.type,
          loadUserData.type,
        ]);
        expect(mockSaveToken).toBeCalledTimes(1);
        expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
      });
    });

    describe('logoutAction', () => {
      it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" and "saveToken" when server response 200', async () => {
        mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(204);
        const mockDropToken = vi.spyOn(localStorage, 'dropToken');

        await store.dispatch(logoutAction());

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          changeAuthorizationStatus.type,
        ]);
        expect(mockDropToken).toBeCalledTimes(1);
      });
    });

    describe('clearErrorAction', () => {
      it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" and "saveToken" when server response 200', async () => {
        await store.dispatch(clearErrorAction());

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          setError.type,
        ]);
      });
    });

    describe('postComment', () => {
      it('should dispatch "loadComments" and "postComment.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onPost(`${APIRoute.Comments}/123`).reply(200);
        await store.dispatch(postComment(makeFakeReviewData()));

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          postComment.fulfilled.type,
          loadComments.type,
        ]);
      });
      it('should dispatch "postComment.rejected when server response 400', async () => {
        mockAxiosAdapter.onPost(`${APIRoute.Comments}/1`).reply(400);
        await store.dispatch(postComment(makeFakeReviewData()));

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          postComment.rejected.type,
        ]);
      });
    });

    describe('changeFavorite', () => {
      it('should dispatch "changeFavorite.fulfilled" and "fetchFavoriteOffers" when server response 200', async () => {
        mockAxiosAdapter.onPost(`${APIRoute.Favorite}/1/1`).reply(200);
        await store.dispatch(changeFavorite(makeFakeFavoriteData()));

        const emmitedActions = store.getActions();
        const actions = extractActionsTypes(emmitedActions);

        expect(actions).toEqual([
          changeFavorite.fulfilled.type,
          fetchFavoriteOffers.fulfilled.type,
        ]);
      });
    });
  });
});
