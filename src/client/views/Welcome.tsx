import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Blogs, BlogTagsJoined } from '../client_types'
import { APIService } from '../services/APIService';


const Welcome = () => {

    const [blogs, setBlogs] = useState<Blogs[]>([]);

   
    useEffect(() => {

        APIService(`/api/blogs`)
            .then(data => {
                setBlogs(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    if (!blogs) {
        return <h1>LOADING...</h1>
    }

    console.log(blogs);

    return (
        <>
            <div className="row justify-content-center">


                <h1 className="display-3 m-3 text-center">👋 Hey Future Blogger!</h1>
                <h2 className="display-4 m-2 text-center" >Welcome to our VIP community</h2>
                <h3>Everything is on its way...</h3>
                <p>Check your inbox for a confirmation message from me with a special surpise😝, it should arrive in the next few minutes. If you don’t receive it soon, please check your junk mail or spam folder. Sometimes the message gets stuck there. Hope you enjoy your free content I've put together along with some other awesome bonuses that will be coming your way. </p>

                <h3>While you wait, check out these strange blogs😂...</h3>

                {blogs.reverse().map(blog => (

                    <div key={`blog-${blog.id}-${blog.authorid}`} className="container">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header">Featured Blog #: {blog.id} | Author ID: {blog.authorid} </h5>

                            <div className="card-body">
                                <h5 className="card-title">{blog.title} </h5>
                                <p className="card-text">{blog.content}</p>
                                <footer className="blockquote-footer">{blog._created} </footer>

                    <Link to={`/blogs/${blog.id}/`} className="btn mx-2 btn-primary">
                        Read More
                    </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Welcome;