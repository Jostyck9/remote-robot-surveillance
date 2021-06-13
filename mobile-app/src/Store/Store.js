import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import robotReducer from './Reducers/robotsReducer';
import userReducer from './Reducers/userReducer';

const reducers = combineReducers({
    robotReducer,
    userReducer
});

const Store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default Store;