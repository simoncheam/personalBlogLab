import * as React from 'react';
import { Link } from 'react-router-dom';



const Private = () => {
    return (
        <div>

            <div>
                    <h1 className="text-center display-1">You are on a PrivateRoute!</h1>
                </div>
                <div className="mt-5 justify-content-center">

                    <Link to={`/private/secret1/`} className="btn mx-2 btn-primary">Secret 1</Link>

                    <Link to={`/private/vip/`} className="btn mx-2 btn-success">VIP ACCESS </Link>

                    <Link to={`/private/users/`} className="btn mx-2 btn-warning">Member Directory </Link>
                </div>
            
        </div>
    )
}

export default Private
