import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'

//import client types

const AuthorOverview = () => {

    
    let navigate = useNavigate();

    let params = useParams();
    const  user_id  = params.user_id;

    // set author state
    const [authors, setAuthors] = useState<Authors[]>([]);

    //useEffect
    useEffect(() => {
        fetch(`/api/authors/${user_id}`)
            .then(res => res.json())
            .then(a => setAuthors(a))
            .catch(e => console.log(e))
    }, []);


    return (
        <>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-3 m-3 text-center">🏆 Welcome, USERNAME ✍️</h1>
                    <div className=" row justify-content-center">
            <Link to={`/createAuthor`} className=" btn m-2 btn-success ">
                Got Something Interesting To Say? Click Here To Share Your Ideas Today!
            </Link>
                    </div>
                   
                    <div className=" row justify-content-center">
                        <Link to={`/createAuthor`} className=" btn m-2 btn-success ">
                            Click Here To Get Started Today!
                        </Link>
                    </div>
                    <div onClick={() => navigate(-1)} className="btn mt-2 btn-danger">
                        Go Back?
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthorOverview;