import React from "react";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import movieReducer from './reducers/movie';

const rootReducer = combineReducers({
    movie: movieReducer
});

const middleware = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
}

export const store = createStore(rootReducer, applyMiddleware(middleware, thunkMiddleware));

export const withStore = (WrappedComponent) => {
    // eslint-disable-next-line react/display-name
    return (props) => (
        <Provider store={store}>
            <WrappedComponent {...props} />
        </Provider>
    );
};
