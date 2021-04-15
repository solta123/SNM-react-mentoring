import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';
import AppHeader from './AppHeader';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { createStore, combineReducers } from 'redux';
import { mount } from "enzyme";
import movieReducer from '../store/reducers/movie';
import common_hu from "../../translations/hu/common.json";
import common_en from "../../translations/en/common.json";
import { act } from 'react-dom/test-utils';

describe('AppHeader', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = createStore(
            combineReducers({
                movie: movieReducer
            })
        );

        i18next.init({
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

        act(() => {
            wrapper = mount(
                <Suspense fallback="loading">
                    <I18nextProvider i18n={i18next}>
                        <MemoryRouter>
                            <Provider store={store}>
                                <AppHeader />
                            </Provider>
                        </MemoryRouter>
                    </I18nextProvider>
                </Suspense>
            );
        });
    });

    it('should match snapshot', () => {
        const tree = renderer.create(
            <Suspense fallback="loading">
                <I18nextProvider i18n={i18next}>
                    <MemoryRouter>
                        <Provider store={store}>
                            <AppHeader />
                        </Provider>
                    </MemoryRouter>
                </I18nextProvider>
            </Suspense>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should open add movie modal', () => {
        act(() => {
            wrapper.find('button#AddMovieButton').simulate('click');
        });
        expect(store.getState().movie.isAddModalOpen).toEqual(true);
        expect(store.getState().movie.editableMovie).toBeFalsy();
    });

    // it('should change language', () => {
    //     wrapper.find('div#lang-select').simulate('click');
    //     wrapper.find('li#hu').simulate('click');
    //     expect(store.getState().movie.lang).toEqual('hu');
    // });
});