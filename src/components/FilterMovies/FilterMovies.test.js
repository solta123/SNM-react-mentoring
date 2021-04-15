import React from 'react';
import { Provider } from 'react-redux';
import FilterMovies from './FilterMovies';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { mount } from "enzyme";
import thunk from 'redux-thunk';
import movieReducer from '../store/reducers/movie';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import initTranslations from '../../translations/initTranslations';

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

        initTranslations();

        const properties = {
            sortBy: 'release_date',
            sortOrder: 'desc',
            selectedGenre: 'all',
            onGenreClick: () => store.dispatch({ type: 'GENRE_FILTER', selectedGenre: 'Thriller', movies: [] }),
            onSortSelect: () => store.dispatch({ type: 'SORT', sortBy: 'title', sortOrder: 'asc', movies: [] })
        };
        wrapper = mount(
            <I18nextProvider i18n={i18next}>
                <Provider store={store} >
                    <FilterMovies {...properties} />
                </Provider>
            </I18nextProvider>
        );
    });

    it('renders correctly', () => {
        expect(wrapper.find('button.Mui-selected#all').exists()).toBeTruthy();
        expect(wrapper.find('input[value="release_date"]')).toBeTruthy();
    });
});