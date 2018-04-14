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

	componentDidMount()
	{
		const qs = document;
		const s = document;
		const d = document;
		let js = document;
		let q = document;
		const gi = d.getElementById;
		const ce = d.createElement;
		const gt = d.getElementsByTagName;
		const id = "typef_orm_share";
		const b = "https://embed.typeform.com/";
		if (!gi.call(d, id))
		{
			js = ce.call(d, "script");
			js.id = id;
			js.src = `${b}embed.js`;
			q = gt.call(d, "script")[0];
			q.parentNode.insertBefore(js, q);
		}
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
							<Image src="images/main.png" verticalAlign="middle" centered={true}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<a className="typeform-share button remember-typeform"
								href="https://daphane.typeform.com/to/RLpMoY"
								data-mode="popup"
								verticalAlign="middle"
								horizontalAlign="middle"
								target="_blank">Card Creation Questionaire</a>

						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<a className="typeform-share button remember-typeform2"
								href="https://daphane.typeform.com/to/tV3EC0"
								data-mode="popup"
								verticalAlign="middle"
								horizontalAlign="middle"
								target="_blank">Payment Questionaire</a>
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
