import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, BlogTagsJoined, Tags } from '../client_types';
import Skeleton from 'react-loading-skeleton'
import { APIService } from '../services/APIService';


//import client types

const Browse = () => {

    const [allblogs, setAllBlogs] = useState<BlogTagsJoined[]>([]);
    const [loaded, setHasLoaded] = useState<boolean>(false);
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [tag, setTag] = useState<Tags[]>([]);

    let navigate = useNavigate();

    // USE EFFECT #1 - load all tags

    useEffect(() => {

        APIService(`/api/tags`)

            .then((t) => {
                setTag(t)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {

        if (!selectedTagId) { return }
        APIService(`/api/blogs/browse/${selectedTagId}`)

            .then(data => {
                setAllBlogs(data[0])
                setHasLoaded(true);
            })
            .catch(e => console.log(e))
    }, [selectedTagId])


    // handleTagSelectUpdate - fires on tag select
    const handleTagSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setHasLoaded(false); // set has loaded = false
        setAllBlogs([]) // clears allblogs state
        setSelectedTagId(e.target.value) // set tagid >>> fires useEffect #2
    };


    return (
        <>
            <div className="row justify-content-center ">
                <h1 className="display-3 m-3 text-center"> Browse Blogs By Tag... </h1>

                <div className="row col-6 ">
                    <label className="row" >All Topics:</label>



                    <select onChange={handleTagSelectUpdate} className="form-control m-2 col-6">

                        <option value={0}> Select a tag to explore related topics</option>

                        {tag.map(t => (
                            <option key={`author-option-${t.id}`} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </div>



                {/* Add to notes */}
                {
                    selectedTagId && !allblogs.length && (!loaded ? <Skeleton /> : <h1>No blogs found with that tag</h1>)

                }


                {allblogs.map(blog => (

                    <div key={`blog-${blog.blog_id}-${blog.tag_id}`} className="row justify-content-center">

                        <div className="card col-12 col-md-6 shadow-lg m-3">
                            <h5 className="card-header">Featured Blog #: {blog.blog_id} | 🏷 {blog.tag_name}</h5>

                            <div className="card-body">

                                <h5 className="card-title"> {blog.title} </h5>
                                <p className="card-text"> {blog.content}</p>
                                <footer className="blockquote-footer"> {blog.blog_created} </footer>

                                <Link to={`/blogs/${blog.blog_id}/`} className="btn mx-2 btn-primary">
                                    Read More
                            </Link>
                            </div>
                        </div>
                    </div>
                ))}


            </div>

            <div onClick={() => navigate(-1)} className="btn m-2 btn-danger ">Go Back?</div>
            <Link to={`/blogs/browseauthors/`} className="btn m-2 btn-primary ">Want to Browse by Author? Click Here</Link>




        </>
    );
}

export default Browse;