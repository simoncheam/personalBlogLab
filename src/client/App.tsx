import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Blogs from './views/Blogs';
import Create from './views/Create';
import Browse from './views/Browse';
import Authors from './views/Authors';
import NotFound from './views/NotFound';
import Navbar from './components/Navbar';
import CreateAuthor from './views/CreateAuthor';

const App = () => {
	

	return (
		
		<BrowserRouter>
			{/* Navbar */}
			<Navbar/>


		<div className="container">
			<Switch>



				{/* Blogs */}
				<Route exact path="/">
						<Blogs/>
				</Route>
				
				
				{/* Create */}
				<Route exact path="/create">
						<Create/>
				</Route>

				{/* New Author */}
				<Route exact path="/createAuthor">
						<CreateAuthor/>
				</Route>
				
				
				{/* Browse */}
				<Route exact path="/browse">
						<Browse/>
				</Route>
				
				
				{/* Authors */}
				<Route exact path="/authors">
						<Authors/>
				</Route>
				
				
				{/* NotFound */}

					<Route  path = "*">
							<NotFound/>
					</Route>
									

			</Switch>

		</div>
			
		
		
		
		</BrowserRouter>



	);
};



export default App;
