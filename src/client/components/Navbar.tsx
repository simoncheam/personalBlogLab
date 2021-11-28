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
            <Link type="button" className="m-2 btn btn-outline-primary" to="/register">
                Register
            </Link>
            {/* <Link type="button" className="m-2 btn btn-outline-primary" to="/authors">
                Authors
            </Link> */}
            <Link type="button" className="m-2 btn btn-outline-primary" to="/donate">
                Donate
            </Link>
            {/* <Link type="button" className="m-2 btn btn-outline-primary" to="/vip">
                VIP
            </Link> */}
            <Link type="button" className="m-2 btn btn-outline-primary" to="/login">
                Login
            </Link>
            <Link type="button" className="m-2 btn btn-outline-danger" to="/private">
                Private
            </Link>




        </div>
    )
}

export default Navbar;