import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Messages from 'react-error';
import * as messageActions from 'react-error/actions';
import store from './store';
import { Header, Card, Divider, Menu, Grid, Image } from 'semantic-ui-react';
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
				<Header className="mainheader" textAlign="center">
					<Header.Subheader className="subheader">
						<Menu className="menu">
							<Menu.Item>About</Menu.Item>
							<Menu.Item>Gallery</Menu.Item>
							<Menu.Item>Pricing</Menu.Item>
							<Menu.Item>Create NOW</Menu.Item>
							<Menu.Item>Sign In</Menu.Item>
						</Menu>
					</Header.Subheader>
					<Header.Content className="main" >
						Your-Creations
						<Divider horizontal={true} fitted={true} className="divider"/>
					</Header.Content>
				</Header>
				<Grid>
					<Grid.Row>
						<Grid.Column>
							<Image src="images/main.png" verticalALign="middle" centered={true}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
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
