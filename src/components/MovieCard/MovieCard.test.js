import React from 'react';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import MovieCard from './MovieCard';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import movieReducer from '../store/reducers/movie';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';

describe('MovieCard', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = createStore(
            combineReducers({
                movie: movieReducer
            }),
            applyMiddleware(thunk)
        );
    });

    fit('should render correctly', () => {
        const movie = {
            title: 'title',
            id: 'movieid',
            release_date: '2005-02-12',
            genres: ['Action', 'Sci-fi']
        };

        wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <MovieCard movie={movie} />
                </Provider>
            </MemoryRouter>
        );

        expect(wrapper.find('img.media').html().includes('no-image.png')).toBeTruthy();
        expect(wrapper.find('p.genres').text()).toBe('Action, Sci-fi');
        expect(wrapper.find('h4.movie-title').text()).toBe('title');
        expect(wrapper.find('div.year').text()).toBe('2005');
    });

    fit('should render image', () => {
        const movie = {
            release_date: '2010-05-01',
            genres: ['Action'],
            poster_path: 'img.png'
        };

        wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <MovieCard movie={movie} />
                </Provider>
            </MemoryRouter>
        );

        expect(wrapper.find('img.media').html().includes('no-image.png')).toBeFalsy();
        expect(wrapper.find('img.media').html().includes('img.png')).toBeTruthy();
    });
});