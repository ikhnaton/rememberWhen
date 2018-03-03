import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import Messages from 'react-error';
import * as messageActions from 'react-error/actions';
import store from './store';
import { Header, Button, Grid, Image } from 'semantic-ui-react';
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
				<Header className="header">
					<div class="headerText">
						<div class="headerTextMain">IBM</div>
						<div class="headerTextSub">I4I</div>
					</div>
					<div>
						<img src="images/logo.png" width="200" height="40" alt="Home"/>
					</div>
				</Header>
				<Grid celled={true} columns={16}>
					<Grid.Column className="left-column">
						<Button className="left-nav" icon>
							<Image src="images/home.png" size="mini" centered={true} wrapped={true}/>
						</Button>
						<Button className="left-nav" icon>
							<Image src="images/search.png" size="mini" centered={true} wrapped={true}/>
						</Button>
						<Button className="left-nav" icon>
							<Image src="images/edit-hand.png" size="mini" centered={true} wrapped={true}/>
						</Button>
						<Button className="left-nav" icon>
							<Image src="images/save.png" size="mini" centered={true} wrapped={true}/>
						</Button>
						<Button className="left-nav" icon>
							<Image src="images/email1.png" size="mini" centered={true} wrapped={true}/>
						</Button>
					</Grid.Column>
				</Grid>
				<div class="lefttbox" style={{ outline: "1px solid red" }}>
					<div class="navicon">
						<a href="#" title="Home">
							<img src="images/home.png" width="50" height="50" alt="Home"/>
						</a>
					</div>
					<div class="navicon">
						<a href="#" title="Search">
							<img src="images/search.png" width="50" height="50" alt="Edit"/>
						</a>
					</div>
					<div class="navicon">
						<a href="#" title="Edit">
							<img src="images/edit-hand.png" width="50" height="50" alt="Edit"/>
						</a>
					</div>
					<div class="navicon">
						<a href="#" title="Save">
							<img src="images/save.png" width="50" height="50" alt="Save"/>
						</a>
					</div>
					<div class="navicon">
						<a href="#" title="Email">
							<img src="images/email1.png" width="50" height="50" alt="Email"/>
						</a>
					</div>
				</div>
				<div class="content" style={{ outline: "1px solid blue" }}>
					<div class="rboxheader">Content</div>
				</div>
				<div class="rightbox" style={{ outline: "1px solid green" }}>
					<div class="rbox">
						<div class="rboxheader">Me</div>
					</div>
					<div class="rbox">
						<div class="rboxheader">Alerts</div>
					</div>
					<div class="rbox">
						<div class="rboxheader">About</div>
					</div>
				</div>
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
