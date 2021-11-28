import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'
import { APIService } from '../services/APIService';

//import client types

const AuthorOverview = () => {


    const TOKEN_KEY = 'token';
    const token = localStorage.getItem(TOKEN_KEY);

    let navigate = useNavigate();

    // set author state
    const [authors, setAuthors] = useState<Authors[]>([]);

    //useEffect
    useEffect(() => {
        APIService('/api/authors')

            .then(a => setAuthors(a))
            .catch(e => console.log(e))
    }, []);


    return (
        <>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-3 m-3 text-center">Welcome Members, click your name to view your profile.. ✍️</h1>
                    <p className=" m-3 text-center">(visible to members only)! ✍</p>

                    <div className=" row justify-content-center">
                        <Link to={`/register`} className=" btn m-2 btn-success ">
                            Got Something Interesting To Say? Click Here To Share Your Ideas Today!
            </Link>
                    </div>
                    <ul className="justify-content-center list-group m-5">
                        {authors.reverse().map(author => (
                            <Link to={`/authors/${author.id}`} className="list-group-item" key={`author-${author.id}`}>

                                <div className="card shadow-lg m-2">

                                    {/* HEADER */}
                                    <div className="card-header">
                                        Name: {author?.name}
                                    </div>



                                    <div className="card-footer">
                                        <p> Blogging Since: <em>{author?._created}</em></p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </ul>
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