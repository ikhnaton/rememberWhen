import { createStore, compose, applyMiddleware } from 'redux';

//import the root reducer
import rootReducer from './reducers';
//import actions from './actions';

const initialState = {
	messages: {
		text: null,
		isVisible: false,
		className: "message-text",
		titleText: "An error has occurred:",
		titleClassName: "message-title"
	}
};

// example of custom middleware
const logAllActions = store => next => action =>
{
	console.log(action);
	next(action);
};

const enhancers = compose(
	applyMiddleware(logAllActions),
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, initialState, enhancers);

export default store;
