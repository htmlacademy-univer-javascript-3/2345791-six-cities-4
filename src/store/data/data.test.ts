import { SortType, cities } from '../../const';
import { makeFakeComment, makeFakeOffer } from '../../utils';
import { changeCity, changeSelectedOffer, changeSortType, loadComments, loadNearbyOffers } from '../action';
import { fetchFavoriteOffers, fetchOfferAction, fetchOffersAction } from '../api-actions';
import { data, initialState } from './data';

describe('Data slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const result = data.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const result = data.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const expectedCity = cities[2];

    const result = data.reducer(initialState, changeCity(cities[2]));

    expect(result.city).toEqual(expectedCity);
  });

  it('should change selected offer with "changeSelectedOffer" action', () => {
    const expectedOffer = makeFakeOffer();

    const result = data.reducer(initialState, changeSelectedOffer(expectedOffer));

    expect(result.selectedOffer).toEqual(expectedOffer);
  });

  it('should change sort type with "changeSortType" action', () => {
    const expectedSortType = SortType.PriceLowToHigh;

    const result = data.reducer(initialState, changeSortType(expectedSortType));

    expect(result.sortType).toEqual(expectedSortType);
  });

  it('should change offers and isOffersDataLoading with "fetchOffersAction.fulfilled" action', () => {
    const offers = [makeFakeOffer()];
    const expectedState = {...initialState, offers: offers, isOffersDataLoading: false};

    const result = data.reducer(initialState, fetchOffersAction.fulfilled(offers, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should change hasError and isOffersDataLoading with "fetchOffersAction.pending" action', () => {
    const expectedState = {...initialState, hasError: false, isOffersDataLoading: true};

    const result = data.reducer(initialState, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should change hasError and isOffersDataLoading with "fetchOffersAction.rejected" action', () => {
    const expectedState = {...initialState, hasError: true, isOffersDataLoading: false};

    const result = data.reducer(initialState, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should change loadedOffer and isOfferDataLoading with "fetchOfferAction.fulfilled" action', () => {
    const expectedState = {...initialState, loadedOffer: makeFakeOffer(), isOfferDataLoading: false};

    const result = data.reducer(initialState, fetchOfferAction.fulfilled(makeFakeOffer(), '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should change isOfferDataLoading with "fetchOfferAction.pending" action', () => {
    const expectedState = {...initialState, isOfferDataLoading: true};

    const result = data.reducer(initialState, fetchOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should change error and isOfferDataLoading with "fetchOfferAction.rejected" action', () => {
    const expectedState = {...initialState, error: 'Generic Error message', isOfferDataLoading: false};

    const result = data.reducer(initialState, fetchOfferAction.rejected({name: 'Name', message: 'Generic Error message'}, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should change favoriteOffers and isFavoriteOffersDataLoading with "fetchFavoriteOffers.fulfilled" action', () => {
    const expectedState = {...initialState, favoriteOffers: [makeFakeOffer()], isFavoriteOffersDataLoading: false};

    const result = data.reducer(initialState, fetchFavoriteOffers.fulfilled([makeFakeOffer()], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should change isFavoriteOffersDataLoading with "fetchFavoriteOffers.pending" action', () => {
    const expectedState = {...initialState, isFavoriteOffersDataLoading: true};

    const result = data.reducer(initialState, fetchFavoriteOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should change error and isFavoriteOffersDataLoading with "fetchFavoriteOffers.rejected action', () => {
    const expectedState = {...initialState, error: 'Generic Error message', isFavoriteOffersDataLoading: false};

    const result = data.reducer(initialState, fetchFavoriteOffers.rejected({name: 'Name', message: 'Generic Error message'}, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should change comments with "loadComments" action', () => {
    const expectedComments = [makeFakeComment()];

    const result = data.reducer(initialState, loadComments(expectedComments));

    expect(result.comments).toEqual(expectedComments);
  });

  it('should change nearbyOffers with "loadNearbyOffers" action', () => {
    const expectedNearbyOffers = [makeFakeOffer()];

    const result = data.reducer(initialState, loadNearbyOffers(expectedNearbyOffers));

    expect(result.nearbyOffers).toEqual(expectedNearbyOffers);
  });
});
