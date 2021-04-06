import React from "react";
import { mount } from "enzyme";
import AddMovieModal from './AddMovieModal';
import { Provider } from "react-redux";
import { createStore, combineReducers } from 'redux';
import movieReducer from '../store/reducers/movie';
import validate from "./validate";
import renderer from 'react-test-renderer';

const testMovie = {
    title: 'title1',
    poster_path: 'img',
    release_date: '2000-01-01',
    overview: 'asd',
    runtime: 90,
    genres: ['Action'],
    tagline: 'asd'
};

describe("AddMovieModal test", () => {
    let store;
    let ref;
    let wrapper;

    beforeEach(() => {
        store = createStore(
            combineReducers({
                movie: movieReducer
            })
        );
        ref = React.createRef();
        wrapper = mount(
            <Provider store={store} >
                <AddMovieModal ref={ref} />
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    })

    it('renders correctly', () => {
        expect(wrapper).toBeTruthy();
    });

    it('error messages appear', () => {
        wrapper.find('button#AddMovieSubmit').simulate('click');
        const errorMessages = wrapper.find('div.error');
        expect(errorMessages).toBeTruthy();
    });

    it('should runtime message appear if empty', () => {
        wrapper.find('input#title').simulate('keydown', { key: 'a' });
        wrapper.find('input#poster_path').simulate('keydown', { key: 'a' });
        wrapper.find('textarea#overview').simulate('keydown', { key: 'a' });
        wrapper.find('input#release_date')
            .simulate('keydown', { key: '2' })
            .simulate('keydown', { key: '0' })
            .simulate('keydown', { key: '0' })
            .simulate('keydown', { key: '0' })
            .simulate('keydown', { key: '-' })
            .simulate('keydown', { key: '0' })
            .simulate('keydown', { key: '1' })
            .simulate('keydown', { key: '-' })
            .simulate('keydown', { key: '0' })
            .simulate('keydown', { key: '1' });
        wrapper.find('input#runtime').simulate('keydown', { key: '9' });
        wrapper.find('div#genres').simulate('change', { target: { value: ['Action'] } });

        wrapper.find('button#AddMovieSubmit').simulate('click');
        expect(wrapper.find('div.error').exists()).toBeFalsy();
        expect(renderer.create(wrapper.text()).toJSON()).toMatchSnapshot();
    });

    it('should fill inputs with data when editing', () => {
        store.getState().movie.editableMovie = { ...testMovie };
        const component = mount(
            <Provider store={store}>
                <AddMovieModal ref={ref} movieDetail={testMovie} />
            </Provider>
        );

        expect(component.find('input#title').html()).toContain('value="title1"');
        expect(component.find('input#release_date').html()).toContain('value="2000-01-01"');
        expect(component.find('textarea#overview').html()).toContain('asd');
        expect(component.find('input#runtime').html()).toContain('value="90"');
        expect(component.find('div#genres').html()).toContain('Action');
        component.unmount();
    });

    it('should not display error messagess if not submitted', () => {
        wrapper.find('input#title').simulate('keydown', { key: 'a' });
        expect(wrapper.find('div.error').exists()).toBe(false);
    });

    it('should validate the form and set errors', () => {
        const errors = validate({ genres: [] }, true);
        expect(errors).toEqual({
            title: 'Required title',
            release_date: 'Required release date',
            poster_path: 'Required to add a link to an image',
            genres: 'Please add at least one genre',
            overview: 'Required overview',
            runtime: 'Hmm, this seems a little short...'
        });
        const errors2 = validate({ genres: [], runtime: -2 }, true);
        expect(errors2).toEqual({
            title: 'Required title',
            release_date: 'Required release date',
            poster_path: 'Required to add a link to an image',
            genres: 'Please add at least one genre',
            overview: 'Required overview',
            runtime: 'Hmm, this seems a little short...'
        });
    });

    it('should not validate when it is not submitted', () => {
        const errors = validate({}, false);
        expect(errors).toEqual({
            title: '',
            release_date: '',
            poster_path: '',
            genres: '',
            overview: '',
            runtime: ''
        });
    });
});
