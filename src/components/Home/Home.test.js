import React from 'react';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import movieReducer from '../store/reducers/movie';
import { combineReducers, createStore, applyMiddleware } from 'redux';

describe('Home', () => {
    let store;

    beforeEach(() => {
        store = createStore(
            combineReducers({
                movie: movieReducer
            }),
            applyMiddleware(thunk)
        );
    });

    it('should render searchbar', () => {
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <Home selectedMovie={null} onGetMovies={() => store.dispatch({ type: 'GET', movies: [] })} />
                </Provider>
            </MemoryRouter>
        );

        expect(wrapper.find('div.SearchbarDiv').exists()).toBeTruthy();
    });

    it('should render movie details', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/film/2"]}>
                <Provider store={store}>
                    <Home selectedMovie={{}} onGetMovies={() => store.dispatch({ type: 'GET', movies: [] })} />
                </Provider>
            </MemoryRouter>
        );

        expect(wrapper.find('div.MovieDetail').exists()).toBeTruthy();
    });
});

