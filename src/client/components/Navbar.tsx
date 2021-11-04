import * as React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {

    return(

        <div className="bg-dark">
            <Link type="button" className="m-2 btn btn-outline-primary" to="/">
                Home
            </Link>
            <Link type="button" className="m-2 btn btn-outline-primary" to="/blogs/browse">
                Browse
            </Link>
            <Link type="button" className="m-2 btn btn-outline-primary" to="/create">
                Create Blog
            </Link>
            <Link type="button" className="m-2 btn btn-outline-primary" to="/createAuthor">
                Create Account
            </Link>
            <Link type="button" className="m-2 btn btn-outline-primary" to="/authors">
                Authors
            </Link>
            <Link type="button" className="m-2 btn btn-outline-primary" to="/donate">
                Donate
            </Link>




        </div>
    )
}

export default Navbar;