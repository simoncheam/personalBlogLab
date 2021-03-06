import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import Blogs from './views/Blogs';
import Create from './views/Create';
import Browse from './views/Browse';
import NotFound from './views/NotFound';
import Navbar from './components/Navbar';
import Register from './views/Register';
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
import LoginHere from './views/LoginHere';
import NotAuthorized from './views/NotAuthorized';
import AuthorDetail from './views/AuthorDetail';
import PrivateRoute from './components/PrivateRoute';
import SecretPage1 from './views/SecretPage1';
import Private from './views/Private';

const stripe = loadStripe(
  'pk_test_51JrmRQKRuAnoTcjnMIgGXWelfVNUongEu9Ja2mkoFoIJseO0x7AsD9PqIkk3IjnDrjj7z67fKPzrhlBqsANseyi700PDjNRoox'
);

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />

      <div className="container">
        <Routes>
          <Route
            path="/donate"
            element={
              <Elements stripe={stripe}>
                <Donate />
              </Elements>
            }
          ></Route>

          {/* Private Route */}

          {/* Outer wrapper is path to element  */}

          <Route path="/private" element={<PrivateRoute />}>
            {/* private has button panels */}
            <Route index element={<Private />} />
            <Route path="secret1" element={<SecretPage1 />} />
            <Route path="vip" element={<OptIn />} />
            <Route path="users" element={<AuthorOverview />} />
          </Route>

          {/* login */}
          <Route path="/login" element={<LoginHere />}></Route>

          {/* BrowseAuthors */}
          <Route path="/blogs/browseauthors" element={<BrowseAuthors />}></Route>

          {/* Browse */}
          <Route path="/blogs/browse" element={<Browse />}></Route>

          {/* Blog Detail */}
          <Route path="/blogs/:blog_id" element={<BlogDetail />}></Route>

          {/* Blogs */}
          <Route path="/" element={<Blogs />}></Route>

          {/* Welcome */}
          <Route path="/welcome" element={<Welcome />}></Route>

          {/* New Author */}
          <Route path="/register" element={<Register />}></Route>

          {/* Create Tag*/}
          <Route path="/createTag" element={<CreateTag />}></Route>

          {/* Create Blog*/}
          <Route path="/create" element={<Create />}></Route>

          {/* Edit */}
          <Route path="/blogs/:blog_id/edit" element={<Edit />}></Route>

          {/* Authors */}

          {/* Authors */}
          <Route path="/authors">
            <Route index element={<AuthorOverview />} />
            <Route path=":id" element={<AuthorDetail />} />
          </Route>

          {/* No auth */}
          <Route path="/bad" element={<NotAuthorized />}></Route>

          {/* NotFound */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
