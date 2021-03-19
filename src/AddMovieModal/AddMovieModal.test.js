import React from "react";
import { mount } from "enzyme";
import AddMovieModal from './AddMovieModal';
import { Provider } from "react-redux";
import { createStore, combineReducers } from 'redux';
import movieReducer from '../store/reducers/movie';
import { render } from "react-dom";
import { act } from '@testing-library/react';

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
        )
    });

    it('renders correctly', () => {
        expect(wrapper).toBeTruthy();
    });

    it('asdasd', async () => {
        let asd = document.createElement('div');
        // store.setState({movie: { ...}})
        await act(async () => {
            render(<Provider store={store} >
                <AddMovieModal ref={ref} />
            </Provider>, asd)
        });

        const submitButton = asd.querySelector('button[id="AddMovieSubmit"]');
            //wrapper.findByLabel('#AddMovieSubmit').length;
        // console.log(submitButton)
        await submitButton.dispatchEvent(new MouseEvent('click'));

        // await act(async () => {
        //     submitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        // });
        const errorMessages = asd.querySelector('div[class="error"]');
        console.log(errorMessages)

        expect(errorMessages).toBeTruthy();
    });
});