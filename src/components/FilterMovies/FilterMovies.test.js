import React from 'react';
import { Provider } from 'react-redux';
import FilterMovies from './FilterMovies';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { mount } from "enzyme";
import thunk from 'redux-thunk';
import movieReducer from '../store/reducers/movie';

describe('FilterMovies', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = createStore(
            combineReducers({
                movie: movieReducer
            }),
            applyMiddleware(thunk)
        );

        const properties = {
            sortBy: 'release_date',
            sortOrder: 'desc',
            selectedGenre: 'all',
            onGenreClick: () => store.dispatch({ type: 'GENRE_FILTER', selectedGenre: 'Thriller', movies: [] }),
            onSortSelect: () => store.dispatch({ type: 'SORT', sortBy: 'title', sortOrder: 'asc', movies: [] })
        }

        wrapper = mount(
            <Provider store={store} >
                <FilterMovies {...properties} />
            </Provider>
        );
    });

    it('renders correctly', () => {
        expect(wrapper.find('button.Mui-selected#all').exists()).toBeTruthy();
        expect(wrapper.find('input[value="release_date"]')).toBeTruthy();
    });

    // it('should change genre', () => {
    //     wrapper.find('button#Thriller').simulate('click');
    //     // store.dispatch({ type: 'GENRE_FILTER', selectedGenre: 'Thriller', movies: [] });
    //     // console.log(wrapper.html())
    //     // expect(store.getState().movie.selectedGenre).toEqual('Thriller')
    //     expect(wrapper.find('button.Mui-selected#Thriller').exists()).toBeTruthy();
    // });
});