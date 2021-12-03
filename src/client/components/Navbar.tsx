import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { APIService } from '../services/APIService';

const Navbar = () => {

    let nav = useNavigate();
    const [isAuthed, setIsAuthed] = useState(null);
    const loc = useLocation()

    useEffect(() => {
        
        APIService(`/auth/validate`)
            .then(res => {
                const tokenStatus = res.one_author ? true : false;
                setIsAuthed(tokenStatus)
            })
            .catch(e => {
                setIsAuthed(false)
                console.log('Your token is bad!');
                console.log(e);
            })

    }, [loc.pathname])

    return (

        <div className="bg-dark">
            <Link type="button" className="m-2 btn btn-outline-primary" to="/">
                Home
            </Link>

            {isAuthed && (
                <Link type="button" className="m-2 btn btn-outline-primary" to="/blogs/browse">
                    Browse
                </Link>
            )}

            {isAuthed && (
                <Link type="button" className="m-2 btn btn-outline-primary" to="/create">
                    Create Blog
                </Link>
            )}

            {!isAuthed && (<Link type="button" className="m-2 btn btn-outline-primary" to="/register">
                Register
            </Link>)}

            <Link type="button" className="m-2 btn btn-outline-primary" to="/donate">
                Donate
            </Link>
            
            {!isAuthed && (<Link type="button" className="m-2 btn btn-outline-primary" to="/login">
                Login
            </Link>
            )}

            {isAuthed && (
                <button type="button" className="m-2 btn btn-outline-danger" onClick={() => {
                    localStorage.removeItem("token");
                    nav("/login")
                }}>
                    Sign Out
                </button>
            )}

            {isAuthed && (
                <Link type="button" className="m-2 btn btn-outline-danger" to="/private">
                    Private
                </Link>
            )}
        </div >
    )
}

export default Navbar;