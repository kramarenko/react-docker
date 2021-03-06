import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import SignIn from './SignIn';
import Protected from './Protected';
import {Calendar} from './Calendar';

const AppWithRouterAccess = () => {
	const history = useHistory();
	const onAuthRequired = () => {
		history.push('/login');
	};


	const oktaAuth = new OktaAuth({
		issuer: `https://${process.env.REACT_APP_OKTA_URL_BASE}/oauth2/default`,
		clientId: `${process.env.REACT_APP_OKTA_CLIENTID}`,
		redirectUri: window.location.origin + '/login/callback',
		onAuthRequired: onAuthRequired,
		pkce: true,
	});

	const restoreOriginalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri, window.location.origin));
	};

	return (
		<Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
			<Route path='/' exact={true} component={Home} />
			<SecureRoute path='/protected' component={Calendar} />
			<Route path='/login' render={() => <SignIn />} />
			<Route path='/login/callback' component={LoginCallback} />
		</Security>
	);
};
export default AppWithRouterAccess;
