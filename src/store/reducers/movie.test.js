import { cleanup } from '@testing-library/react';
import * as Reducer from './movie';
import * as ACTIONS from '../actions';
import { getEmptyMovie, mapMovie } from '../../mapper/movieMapper';

afterEach(cleanup)

describe('test the reducer and actions', () => {
    it('should return the initial state', () => {
        expect(Reducer.initialState).toEqual({
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
        expect(Reducer.default(Reducer.initialState, {
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
        expect(Reducer.default(Reducer.initialState, { type: ACTIONS.DESELECT_MOVIE }).selectedMovie)
            .toEqual(null);
    });

    it('should select genre', () => {
        expect(Reducer.default(Reducer.initialState, {
            type: ACTIONS.GENRE_FILTER,
            selectedGenre: 'Comedy',
            movies: [{}, {}]
        }))
            .toEqual({
                ...Reducer.initialState, selectedGenre: 'Comedy',
                movies: [{}, {}], filteredMovies: [{}, {}]
            });
    });

    it('should select sort', () => {
        expect(Reducer.default(Reducer.initialState, {
            type: ACTIONS.SORT,
            sortBy: 'Name',
            movies: [{}]
        }))
            .toEqual({
                ...Reducer.initialState, sortBy: 'Name',
                movies: [{}], filteredMovies: [{}]
            });
    });

    it('should search', () => {
        expect(Reducer.default(Reducer.initialState, {
            type: ACTIONS.SEARCH,
            search: 'star wars',
            movies: [{}]
        }))
            .toEqual({
                ...Reducer.initialState, search: 'star wars',
                movies: [{}], filteredMovies: [{}]
            });
    });

    it('should get movies', () => {
        expect(Reducer.default(Reducer.initialState, {
            type: ACTIONS.GET,
            movies: [{}, {}]
        }))
            .toEqual({
                ...Reducer.initialState, movies: [{}, {}], filteredMovies: [{}, {}]
            });
    });

    it('should open edit modal', () => {
        expect(Reducer.default(Reducer.initialState, {
            type: ACTIONS.MODAL,
            value: true,
            movie: {}
        }))
            .toEqual({
                ...Reducer.initialState, editableMovie: {}, isAddModalOpen: true
            });
    });
    
    it('should close edit modal', () => {
        expect(Reducer.default(Reducer.initialState, {
            type: ACTIONS.MODAL,
            value: false
        }))
            .toEqual({
                ...Reducer.initialState, editableMovie: null, isAddModalOpen: false
            });
    });
});
