import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, BlogTagsJoined } from '../client_types'
import { APIService } from '../services/APIService';


const Blogs = () => {

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

            <div className="row mt-5 justify-content-center">

                    <h1 className="display-3 m-3 text-center">👋 Welcome To The Ultimate Blog!</h1>
                    <h2 className="display-4 m-2 text-center" >Your Source for Infinite Wisdom and Truth</h2>

                <div className="">
                    {blogs.reverse().map(blog => (

                        <div key={`blog-${blog.id}-${blog.authorid}`} className="row justify-content-center">

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
            </div>

        </>
    );
}

export default Blogs;