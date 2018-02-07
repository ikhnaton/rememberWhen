import { combineReducers } from 'redux';

import message from 'react-error/reducer';

const rootReducer = combineReducers({
	messages: message
});

export default rootReducer;
