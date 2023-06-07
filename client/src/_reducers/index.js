import { combineReducers } from 'redux';
import trainDataReducer from './trainDataReducer';

const rootReducer = combineReducers({
    trainData: trainDataReducer,
});

export default rootReducer;