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

    it('should render correctly', () => {
        const movie = {
            title: 'title',
            id: 'movieid',
            release_date: '2005-02-12',
            genres: ['Action', 'Science fiction']
        };

        wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <MovieCard movie={movie} />
                </Provider>
            </MemoryRouter>
        );

        expect(wrapper.find('img.media').html().includes('no-image.png')).toBeTruthy();
        expect(wrapper.find('p.MovieCardDetailsGenres').text())
            .toBe('NETFLIXROULETTE.GENRES.ACTION, NETFLIXROULETTE.GENRES.SCIENCE FICTION');
        expect(wrapper.find('h4.MovieCardDetailsTitle').text()).toBe('title');
        expect(wrapper.find('div.year').text()).toBe('2005');
    });

    it('should render image', () => {
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

    // it('should open movie details', () => {
    //     const movie = {
    //         title: 'title',
    //         id: 'movieid',
    //         release_date: '2005-02-12',
    //         genres: ['Action', 'Sci-fi']
    //     };

    //     wrapper = mount(
    //         <MemoryRouter>
    //             <Provider store={store}>
    //                 <MovieCard movie={movie} onSelectMovie={() => store.dispatch({ type: 'SELECT_MOVIE', movie })} />
    //             </Provider>
    //         </MemoryRouter>
    //     );

    //     wrapper.find('div.MovieCardRoot').simulate('click');

    //     expect(store.getState().detailedMovie).toBeTruthy();
    // });
});