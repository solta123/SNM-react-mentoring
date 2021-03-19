import { createStore, combineReducers, applyMiddleware } from 'redux';
import movieReducer from './reducers/movie';
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