import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import movieReducer from './store/reducers/movie';
import thunk from 'redux-thunk';

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

export const store = createStore(rootReducer, applyMiddleware(middleware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
