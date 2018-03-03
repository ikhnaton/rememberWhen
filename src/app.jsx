import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Messages from 'react-error';
import * as messageActions from 'react-error/actions';
import store from './store';
import { Header, Card, Container } from 'semantic-ui-react';
import "./reset.less";
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
				<Header className="header" textAlign="center">
					<Header.Content className="main" >
						Your-Creations
					</Header.Content>
				</Header>
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
