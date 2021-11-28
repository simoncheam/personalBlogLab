import * as React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { database_config } from '../../server/config';
import { Blogs, Authors, Tags, BlogTags, BlogTagsJoined } from '../client_types'
import { APIService, TOKEN_KEY } from '../services/APIService';

const Edit = () => {
    let params = useParams();
    let navigate = useNavigate();


    //const { blog_id } = useParams<{ blog_id: string }>(); //old v5
    const blog_id = params.blog_id; //useParams<{ blog_id: string }>(); //v6


    //State - Blog
    const [blog, setBlog] = useState<BlogTagsJoined>();
    const [blog_content, setBlogContent] = useState("");
    const [blog_tag, setBlogTag] = useState("");
    const [blog_title, setBlogTitle] = useState("");
    const [tag, setTag] = useState<Tags[]>([]);


    // State - Author
    const [authors, setAuthors] = useState<Authors[]>([]);
    const [author, setAuthor] = useState<string>("");
    const [selectedAuthorId, setSelectedAuthorId] = useState(0);
    const [selectedTagId, setSelectedTagId] = useState(0);


    const token = localStorage.getItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token)

    // const handleUpdate
    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        //const TOKEN_KEY imported from APIService; token defined
        const token = localStorage.getItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token)

        console.log(token);

        // input validation

        //Q: What is the best way to set previous tag selection as the current state? If tag is not select, the blog will update, but returns 500 error for some reason.

        if (!blog_content || !blog_title || !selectedTagId) return alert('please complete all fields to confirm your update (check tag selection)') // need UI update

        // BLOG - PUT

        //@ts-ignore
        APIService(`/api/blogs/${blog_id}`, 'PUT', {
            title: blog_title,
            content: blog_content,
            tagid: selectedTagId

        })
            .then(data => {
                navigate(`/blogs/${blog_id}`)
                console.log(data);

            })
            .catch(e => console.log(e))
    }

    // const handleDelete

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem(TOKEN_KEY);

        console.log(token);
        localStorage.setItem(TOKEN_KEY, token)

        if (confirm('Are you sure?')) {

        }
        APIService(`/api/blogs/${blog_id}`, 'DELETE')
           
            .then(() => {
                navigate(`/`)

            })
            .catch(e => console.log(e))
    }

    //useEffect - blog specific
    useEffect(() => {

        APIService(`/api/blogs/${blog_id}`)
            .then(data => {  //had to remove:(data: BlogTagsJoined) due to error
                data = data[0];
                setBlog(data)


                // setblog state - tag, title, content
                setBlogTag(data.tag_name)
                setBlogContent(data.content)
                setBlogTitle(data.title)

                //author state - name 
                setAuthor(data.a_name)
                setSelectedAuthorId(data.a_id)
            })
            .catch(e => console.log(e))

        APIService('/api/authors')
            .then((a) => {
                setAuthors(a)
            })
            .catch(e => console.log(e))

        APIService('/api/tags')
            .then((t) => {
                setTag(t)
            })
            .catch(e => console.log(e))
    }, []);
    if (!blog_title) {
        return <h1>Loading...</h1>
    }


    // handleTagSelectUpdate
    const handleTagSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTagId(Number(e.target.value))
    };


    return (
        <>
            <h1 className="display-3 m-3 text-center">👋 Hey, {author}, Edit Your Blog! </h1>

            <div className="row mt-5 justify-content-center">
                <div className="form-group col-6">




                    {/* ----------- select Tag ----------- */}

                    <label >Update Tag:</label>
                    <select onChange={handleTagSelectUpdate} className="form-control m-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <option value={blog_tag}>Current: {blog_tag} (please select update below)</option>

                        {tag.map(t => (
                            <option key={`author-option-${t.id}`} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>

                    {/* set Blog Title */}
                    <label >Update Title: </label>

                    <input type="text" className="form-control m-2" placeholder="Blog Title" value={blog_title} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setBlogTitle(e.target.value)} />

                    {/* set Blog Content */}
                    <label >Update Content: </label>

                    <div className="form-control input-group-text m-2 justify-content-left" onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setBlogContent(e.target.value)} >
                        <textarea className="form-control input-group-text " value={blog_content} placeholder="Write your Blog here..."  >
                        </textarea>
                    </div>

                    {/* Buttons */}
                    <div className="m-2">
                        <div onClick={() => navigate(-1)} className="btn mx-2 btn-primary">Go Back?</div>
                        <button onClick={handleDelete} className="btn mx-2 btn-danger">Delete!</button>
                        <button onClick={handleUpdate} className="btn btn-Success">Save Updates!</button>
                    </div>

                </div>

            </div>


        </>
    );
}

export default Edit;