import { createStore, combineReducers } from 'redux';
import movieReducer from '../store/reducers/movie';

const createTestStore = () => {
    const store = createStore(
        combineReducers({
            movie: movieReducer
        })
    );
    return store;
}
export default createTestStore;