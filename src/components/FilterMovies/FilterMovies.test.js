import React from 'react';
import { Provider } from 'react-redux';
import FilterMovies from './FilterMovies';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { mount } from "enzyme";
import thunk from 'redux-thunk';
import movieReducer from '../store/reducers/movie';
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import common_hu from "../../translations/hu/common.json";
import common_en from "../../translations/en/common.json";

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

        i18n.init({
            interpolation: { escapeValue: false },
            lng: 'en',
            resources: {
                en: {
                    common: common_en
                },
                hu: {
                    common: common_hu
                },
            },
        });

        const properties = {
            sortBy: 'release_date',
            sortOrder: 'desc',
            selectedGenre: 'all',
            onGenreClick: () => store.dispatch({ type: 'GENRE_FILTER', selectedGenre: 'Thriller', movies: [] }),
            onSortSelect: () => store.dispatch({ type: 'SORT', sortBy: 'title', sortOrder: 'asc', movies: [] })
        };
        wrapper = mount(
            <I18nextProvider i18n={i18n}>
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