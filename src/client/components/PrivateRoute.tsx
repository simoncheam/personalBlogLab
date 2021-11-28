
import * as React from 'react';
//import {  Route } from 'react-router';
import { Route, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIService, TOKEN_KEY } from '../services/APIService';


//Q: need to clarify meaning of "...rest" not used here

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {


    let navigate = useNavigate();


    const [loaded, setLoaded] = useState(false);
    const [isAuthed, setIsAuthed] = useState(null);


    useEffect(() => {

        const TOKEN = localStorage.getItem(TOKEN_KEY);
        console.log(TOKEN);
       

        if (!TOKEN) {
            navigate(`/login`)
        } else {
            APIService(`/auth/validate`)
            .then(res => { /// something is fucked up here
                
                console.log(res.ok);//Q: why does res.ok console as undef
                const tokenStatus = true;
                
                console.log(`tokenStatus : ${tokenStatus}`);
                setIsAuthed(tokenStatus)
                setLoaded(true);
                //console.log('APIservice then chain should work!');
                return;
            })
            .catch(e => {
                console.log('Your token is bad!');
                console.log(e);
                navigate(`/login`)
            })
        }

    }, [])

    if (!loaded) return <></>;

    // is there a token? if not=> send to login
    if (!isAuthed) {
        console.log('not logged in!');
        return navigate(`/login`)

    } else {
        return (
            <>
                <div>
                    {/* <Route {...rest}>{children} </Route>; !!!! Remove from course markdown if using RRDv6 */}
                    <h1 className="text-center display-1">You are on a PrivateRoute!</h1>
                </div>
                <div className="mt-5 justify-content-center">

                <Link to={`/private/secret1/`} className="btn mx-2 btn-primary">Secret 1</Link>

                <Link to={`/private/vip/`} className="btn mx-2 btn-success">VIP ACCESS </Link>

                <Link to={`/private/users/`} className="btn mx-2 btn-warning">Member Directory </Link>
                </div>


                {children}
                <Outlet />
            </>
        );
    }

}

interface PrivateRouteProps {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}



export default PrivateRoute
