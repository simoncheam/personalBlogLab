
import * as React from 'react';
import { Route } from 'react-router';
import { Outlet, Navigate } from 'react-router-dom'
import SecretPage from '../views/SecretPage(test)';
import { TOKEN_KEY } from '../services/api-service'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Q: need to clarify meaning of "...rest"

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {


    //let navigate = useNavigate();

    const TOKEN = localStorage.getItem(TOKEN_KEY);

    const [loaded, setLoaded] = useState(false);
    const [isAuthed, setIsAuthed] = useState(null);


    useEffect(() => {
        fetch('/status', { headers: { "Authorization": `Bearer ${TOKEN}` } })
            .then(res => {
                setIsAuthed(res.ok);
                setLoaded(true);
            });

    }, [])





    if (!loaded) return <></>;


    // is there a token? if not=> send to login
    if ( !isAuthed || !TOKEN) {
        return (
         
            <Navigate to="/login" />
        );

    } else {
        return (
            <>
                <div>
                    <h1 className="text-center display-1">You are on a PrivateRoute!</h1>
                </div>
                <Link to={`/private/secret1/`} className="btn mx-2 btn-primary">Secret 1</Link>




                {children}
                <Outlet />
            </>
        );
    }

}

interface PrivateRouteProps {
    path?: string;
    exact?: boolean;
    children?: React.ReactNode;
}

export default PrivateRoute
