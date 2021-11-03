import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'

//import client types

const AuthorOverview = () => {

    const { goBack } = useHistory();
    const hist = useHistory();

    // set author state
    const [authors, setAuthors] = useState<Authors[]>([]);

    //useEffect
    useEffect(() => {
        fetch('/api/authors')
            .then(res => res.json())
            .then(a => setAuthors(a))
            .catch(e => console.log(e))
    }, []);


    return (
        <>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-8">
                    <h1 className="display-3 m-3 text-center">🏆 Blogger Hall Of Fame! ✍️</h1>
                    <div className=" row justify-content-center">
            <Link to={`/createAuthor`} className=" btn m-2 btn-success ">
                Got Something Interesting To Say? Click Here To Share Your Ideas Today!
            </Link>
                    </div>
                    <ul className="justify-content-center list-group m-5">
                        {authors.reverse().map(author => (
                            <Link to={`/blogs/browseauthors`} className="list-group-item" key={`author-${author.id}`}>

                                <div className="card shadow-lg m-2">

                                    {/* HEADER */}
                                    <div className="card-header">
                                        Name: {author?.name}
                                    </div>
                                    {/* BODY */}
                                    <div className="card-body">
                                        <p> 📧 <em>{author?.email}</em></p>
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
                    <div onClick={goBack} className="btn mt-2 btn-danger">
                        Go Back?
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthorOverview;