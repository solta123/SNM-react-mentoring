import { cleanup } from '@testing-library/react';
import movieReducer, { initialState } from './movie';
import * as ACTIONS from '../actions';
import { getEmptyMovie, mapMovie } from '../../mapper/movieMapper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer from './movie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// allows us to easily return reponses and/or success/fail for a thunk that calls a service
const mockServiceCreator = (body, succeeds = true) => () =>
    new Promise((resolve, reject) => {
        setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10);
    });

describe('test the reducer and actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    afterEach(cleanup);

    it('should return the initial state', () => {
        expect(initialState).toEqual({
            selectedMovie: null,
            movies: [],
            filteredMovies: [],
            selectedGenre: 'all',
            sortBy: 'release_date',
            search: '',
            isAddModalOpen: false,
            editableMovie: null
        });
    });

    it('should select movie', () => {
        expect(reducer(initialState, {
            type: ACTIONS.SELECT_MOVIE,
            movie: { title: '', release_date: '2018-02-18', genres: [], overview: '' }
        })).toEqual({
            selectedMovie: { ...mapMovie(getEmptyMovie()), release_date: '2018-02-18' },
            movies: [],
            filteredMovies: [],
            selectedGenre: 'all',
            sortBy: 'release_date',
            search: '',
            isAddModalOpen: false,
            editableMovie: null
        });
    });

    it('should deselect movie', () => {
        expect(reducer(initialState, { type: ACTIONS.DESELECT_MOVIE }).selectedMovie)
            .toEqual(null);
    });

    it('should select genre', () => {
        expect(reducer(initialState, {
            type: ACTIONS.GENRE_FILTER,
            selectedGenre: 'Comedy',
            movies: [{}, {}]
        }))
            .toEqual({
                ...initialState, selectedGenre: 'Comedy',
                movies: [{}, {}], filteredMovies: [{}, {}]
            });
    });

    it('should select sort', () => {
        expect(reducer(initialState, {
            type: ACTIONS.SORT,
            sortBy: 'Name',
            movies: [{}]
        }))
            .toEqual({
                ...initialState, sortBy: 'Name',
                movies: [{}], filteredMovies: [{}]
            });
    });

    it('should search', () => {
        expect(reducer(initialState, {
            type: ACTIONS.SEARCH,
            search: 'star wars',
            movies: [{}]
        }))
            .toEqual({
                ...initialState, search: 'star wars',
                movies: [{}], filteredMovies: [{}]
            });
    });

    it('should get movies', () => {
        expect(reducer(initialState, {
            type: ACTIONS.GET,
            movies: [{}, {}]
        }))
            .toEqual({
                ...initialState, movies: [{}, {}], filteredMovies: [{}, {}]
            });
    });

    it('should open edit modal', async () => {
        expect(reducer(initialState, {
            type: ACTIONS.MODAL,
            value: true,
            movie: {}
        }))
            .toEqual({ ...initialState, editableMovie: {}, isAddModalOpen: true });
    });

    it('should close edit modal', async () => {
        await store.dispatch({
            type: ACTIONS.MODAL,
            value: false
        });
        expect(store.getState())
            .toEqual({
                ...initialState, editableMovie: null, isAddModalOpen: false
            });
    });
});
