import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Messages from 'react-error';
import * as messageActions from 'react-error/actions';
import store from './store';
import "./main.less";

class App extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div>
				<MessageWrapper />
				Hello Niall<br/>
				<button onClick={ () => this.props.dispatch(messageActions.setMessageText("This would be an error.")) }>
					Click for error
				</button>

			</div>
		);
	}
}

function mapStateToProps(state)
{
	return {
		messages: state.messages
	};
}

const Wrapper = connect(mapStateToProps)(App);
const MessageWrapper = connect(mapStateToProps)(Messages);

document.addEventListener("DOMContentLoaded", (event) =>
{
	ReactDOM.render(
		<Provider store={store}>
			<Wrapper>
				<App/>
			</Wrapper>
		</Provider>,
		document.getElementById("root")
	);
});
