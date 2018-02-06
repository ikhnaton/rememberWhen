const React = require('react');
const ReactDOM = require('react-dom');
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
				Hello Niall
			</div>
		);
	}
}

document.addEventListener("DOMContentLoaded", (event) =>
{
	ReactDOM.render(
		<App/>,
		document.getElementById("root")
	);
});
