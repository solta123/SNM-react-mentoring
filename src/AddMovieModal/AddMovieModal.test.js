import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import AddMovieModal from './AddMovieModal';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

describe('<AddMovieModal />', () => {
    let store;

    it('asd', () => {
        store = mockStore({
            myState: 'sample text',
        });

        const root = mount(<AddMovieModal store={store} />);

        expect(true).toEqual(true);
    });

});