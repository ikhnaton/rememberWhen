import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import './login.less';

export const Login = () =>
	<Container textAlign="center">
		<Form size="large" widths="equal">
			<Form.Group widths={4}>
				<Form.Input className="login-form" label="User ID" type="text" width={4}/>
				<Form.Input className="login-form" label="Password" type="password" width={4}/>
			</Form.Group>
		</Form>
	</Container>;
