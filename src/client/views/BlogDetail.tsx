import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { BlogTagsJoined } from '../client_types'
import { APIService } from '../services/APIService';

//import client types

const BlogDetail = () => {

    let params = useParams();
    let navigate = useNavigate();
    const blog_id = params.blog_id;


    //const { blog_id } = useParams<{ blog_id: string }>();
    const [blog, setBlog] = useState<BlogTagsJoined>();
    const [blog_tag, setBlogTag] = useState<string>();

    //useEffect
    useEffect(() => {
        APIService(`/api/blogs/${blog_id}`)

       
            .then(data => { //removed: (data: BlogTagsJoined)

                data = data[0];  // destructuring object from array (removes meta data)
                setBlogTag(data.tag_name)
                setBlog(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    if (!blog || !blog_tag) { return <h1>LOADING...</h1> }

    return (

        <div className="">

            <h1 className="display-3 m-3 text-center">👋 BlogDetail Blog ID#:  {blog.blog_id}! </h1>

            <div className=" row justify-content-center">
                <div className="card col-12 col-md-6 shadow-lg m-3">

                    <div className="card-header">
                        <h3 className="card-title">{blog.title} </h3>

                        <h5>
                            <small className="text-muted">Author: {blog.a_name}</small>
                        </h5>

                        <h6>
                            <span className=" mx-2 badge text-light badge-pill bg-primary">🏷 {blog_tag}</span>
                        </h6>

                    </div>

                    <div className="card-body">
                        <p>{blog.content}</p>
                    </div>

                    <div className="card-footer">
                        Like the content? Feel free to donate below if you've enjoyed the blog. Your support is appreciated!🙏

                        <footer className=" m-2 blockquote-footer"> {blog.blog_created} </footer>

                        <div>
                            <div onClick={() => navigate(-1)} className="btn mx-2 btn-primary">
                                Go Back?
                            </div>
                            <Link to={`/donate`} className="btn mx-2 btn-success">
                                Donate Now
                            </Link>

                            <Link to={`/blogs/${blog_id}/edit`} className="btn mx-2 btn-warning">
                                Edit?
                            </Link>



                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BlogDetail;