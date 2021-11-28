import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIService } from '../services/APIService';
import { Blogs } from '../client_types'
import { Link } from 'react-router-dom';


const SecretPage1 = (props: SecretProps) => {

    let navigate = useNavigate();

    //add state
    const [blogs, setBlogs] = useState<Blogs[]>([]);


    //useEffect with APIservice
    useEffect(() => {


        APIService('/api/blogs')
            .then(data => setBlogs(data))
            .catch(() => {
                alert('oops!')
                navigate(`/login`)
            })

    }, [])

    return (
        <div>
            <h1 className="text-center display-1">Secret Page</h1>
            <div className="text-center">
                <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" className="rounded" alt="..." />
            </div>


            <div className="">
                {blogs.reverse().map(blog => (

                    <div key={`blog-${blog.id}-${blog.authorid}`} className="row justify-content-center">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header">Featured Blog #: {blog.id} | Author ID: {blog.authorid} </h5>

                            <div className="card-body">
                                <h5 className="card-title">{blog.title} </h5>
                                <p className="card-text">{blog.content}</p>
                                <footer className="blockquote-footer">{blog._created} </footer>

                                <Link to={`/blogs/${blog.id}/`} className="btn mx-2 btn-primary">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

interface SecretProps { }

export default SecretPage1
