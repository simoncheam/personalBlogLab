import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'
import { APIService } from '../services/APIService';


const AuthorDetail = () => {

    let navigate = useNavigate();
    const TOKEN_KEY = 'token';
    const token = localStorage.getItem(TOKEN_KEY);

    let params = useParams();
    const id = params.id;

    // set author state
    const [author, setAuthor] = useState<Authors>();

    //useEffect
    useEffect(() => {
        APIService(`/api/authors/${id}`)
           .then(a => {
                console.log(a);
                setAuthor(a.one_author)
            })
            .catch(e => console.log(e))
    }, []);
    if (!author) { return <h1>LOADING...</h1> }

    return (
        <>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-3 m-3 text-center">🏆 {author.name} ✍️</h1>
                    <div className="row m-5">Hi my name is {author.name}, this is my personal bio. You can email me at {author.email} for more juicy details about my life. Have a nice day:)</div>

                    <div className=" row justify-content-center">
                        <Link to={`/create`} className=" btn m-2 btn-success ">
                            Got Something Interesting To Say? Click Here To Share Your Ideas Today!
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

export default AuthorDetail;