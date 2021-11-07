import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Blogs from './views/Blogs';
import Create from './views/Create';
import Browse from './views/Browse';
import NotFound from './views/NotFound';
import Navbar from './components/Navbar';
import CreateAuthor from './views/CreateAuthor';
import BlogDetail from './views/BlogDetail';
import Edit from './views/Edit';
import AuthorOverview from './views/AuthorOverview';
import CreateTag from './views/CreateTag';
import BrowseAuthors from './views/BrowseAuthors';
import Donate from './views/Donate';
import OptIn from './views/OptIn';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Welcome from './views/Welcome';

const stripe = loadStripe('pk_test_51JrmRQKRuAnoTcjnMIgGXWelfVNUongEu9Ja2mkoFoIJseO0x7AsD9PqIkk3IjnDrjj7z67fKPzrhlBqsANseyi700PDjNRoox');

const App = () => {


	return (

		<BrowserRouter>
			{/* Navbar */}
			<Navbar />


			<div className="container">
				<Switch>

					<Route exact path="/donate">
						<Elements stripe={stripe}>
							<Donate />
						</Elements>;
					</Route>

					{/* BrowseAuthors */}
					<Route exact path="/vip">
						<OptIn />
					</Route>

					{/* BrowseAuthors */}
					<Route exact path="/blogs/browseauthors">
						<BrowseAuthors />
					</Route>

					{/* Browse */}
					<Route exact path="/blogs/browse">
						<Browse />
					</Route>

					{/* Blog Detail */}
					<Route exact path="/blogs/:blog_id">
						<BlogDetail />
					</Route>

					{/* Blogs */}
					<Route exact path="/">
						<Blogs />
					</Route>

					{/* Welcome */}
					<Route exact path="/welcome">
						<Welcome />
					</Route>

					{/* New Author */}
					<Route exact path="/createAuthor">
						<CreateAuthor />
					</Route>

					{/* Create Tag*/}
					<Route exact path="/createTag">
						<CreateTag />
					</Route>

					{/* Create Blog*/}
					<Route exact path="/create">
						<Create />
					</Route>

					{/* Edit */}
					<Route exact path="/blogs/:blog_id/edit">
						<Edit />
					</Route>

					{/* Authors */}
					<Route exact path="/authors">
						<AuthorOverview />
					</Route>

					{/* NotFound */}
					<Route path="*">
						<NotFound />
					</Route>


				</Switch>
			</div>

		</BrowserRouter>

	);
};



export default App;
