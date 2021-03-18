import React from 'react';
import { mount } from "enzyme";
import createTestStore from "../test/testHelper";
import { Provider } from "react-redux";
import AppHeader from './AppHeader';
import { Router, Switch } from 'react-router';

describe("AppHeader test", () => {
    let store;
    beforeEach(() => {
        store = createTestStore();
    });

    it('renders correctly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <AppHeader />
                </Router>
            </Provider>);
        expect(wrapper).toMatchSnapshot();
    });
});