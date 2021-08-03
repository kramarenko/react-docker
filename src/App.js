import React from 'react';
import { Calendar } from './Calendar';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

function App() {
	return (
		<Router>
			<Security
				issuer='https://dev-79232118.okta.com/oauth2/default'
				clientId='0oa1egxj6bYexox5A5d7'
				redirectUri={window.location.origin + '/callback'}
				pkce={true}
			>
				<SecureRoute path='/' exact={true} component={Calendar} />
				<Route path='/callback' component={LoginCallback} />
			</Security>
		</Router>
	);
}

export default App;
