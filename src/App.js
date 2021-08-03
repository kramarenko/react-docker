import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

const App = () => {
	return (
		<Router>
			<AppWithRouterAccess />
		</Router>
	);
};

export default App;