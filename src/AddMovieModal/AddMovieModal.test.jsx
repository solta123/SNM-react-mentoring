import React from "react";
import { shallow } from "enzyme";
import AddMovieModal from './AddMovieModal';
import { Provider } from "react-redux";
import createTestStore from "../test/testHelper";

describe("AddMovieModal test", () => {
    let store;
    beforeEach(() => {
        store = createTestStore();
    });
    it("renders correctly", () => {
        const ref = React.createRef();
        const wrapper = shallow(
            <Provider store={store}>
                <AddMovieModal ref={ref} />
            </Provider>);

        expect(wrapper).toMatchSnapshot();

    });
});