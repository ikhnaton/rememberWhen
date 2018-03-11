import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Messages from 'react-error';
import * as messageActions from 'react-error/actions';
import store from './store';
import { Header, Card, Divider, Menu, Grid, Image } from 'semantic-ui-react';
import { Home } from './components/home/home.jsx';
import { Gallery } from './components/gallery/gallery.jsx';
import { Pricing } from './components/pricing/pricing.jsx';
import { CreateNow } from './components/create/create.jsx';
import { Login } from './components/login/login.jsx';
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
			<BrowserRouter>
				<div>
					<Header className="mainheader" textAlign="center">
						<Header.Subheader className="subheader">
							<Menu className="menu">
								<Menu.Item><Link to="/">About</Link></Menu.Item>
								<Menu.Item><Link to="/gallery">Gallery</Link></Menu.Item>
								<Menu.Item><Link to="/pricing">Pricing</Link></Menu.Item>
								<Menu.Item><Link to="/create">Create NOW</Link></Menu.Item>
								<Menu.Item><Link to="/login">Sign In</Link></Menu.Item>
							</Menu>
						</Header.Subheader>
						<Header.Content className="main" >
							Your-Creations
							<Divider horizontal={true} fitted={true} className="divider"/>
						</Header.Content>
					</Header>
					<Grid>
						<Grid.Row>
							<Grid.Column textAlign="center">
								<Route path="/" exact component={ Home } />
								<Route path="/create" component={ CreateNow } />
								<Route path="/pricing" component={ Pricing } />
								<Route path="/gallery" component={ Gallery } />
								<Route path="/login" component={ Login } />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</BrowserRouter>
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
