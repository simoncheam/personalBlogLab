import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'
import { APIService, TOKEN_KEY } from '../services/APIService';

const Create = () => {

    let navigate = useNavigate();

    //State - Blog
    const [blog_content, setBlogContent] = useState("");
    const [blog_title, setBlogTitle] = useState("");

    // State - Tags
    const [tag, setTag] = useState<Tags[]>([]);

    // State - Author
    const [selectedTagId, setSelectedTagId] = useState(0);


    useEffect(() => {
        APIService(`/api/tags`)
            .then((t) => {
                setTag(t)
            })
            .catch(e => console.log(e))
    }, []);


    // handleTagSelectUpdate
    const handleTagSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTagId(Number(e.target.value))
        console.log(selectedTagId);
    };

    // const handleSubmitButton

    const handleSubmitButton = (newblog: React.MouseEvent<HTMLButtonElement>) => {
        newblog.preventDefault();

        //const TOKEN_KEY imported from APIService; token defined
        const token = localStorage.getItem(TOKEN_KEY);

        localStorage.setItem(TOKEN_KEY, token)
        console.log(token);

        //input val
        if (!blog_content || !blog_title || !selectedTagId) return alert('🤬 Fill out the god damn fields please:)')

        //@ts-ignore
        APIService('/api/blogs', 'POST', {
            content: blog_content,
            title: blog_title,
            tagid: selectedTagId
        })
            .then(data => {
                console.log(data);
                navigate(`/`)
            })
            .catch(e => {
                console.log(e)
                alert(e);
                navigate(`/login`)
            })
    }

    return (
        <>
            <h1 className="display-3 m-3 text-center">👋 Create Your Blog! </h1>

            <div className="row mt-5 justify-content-center">
                <div className="form-group col-6">

                    <Link to={`/register`} className=" row btn m-2 btn-warning">
                        Not a Blogger yet? Click here and be one today!🖋
                    </Link>

                    {/* ----------- select Tag ----------- */}

                    <label className="row" >🏷 Tag</label>

                    <select value={selectedTagId} onChange={handleTagSelectUpdate} className="form-control m-2">

                        <option value={0}> Select a Tag for your Blog</option>

                        {tag.map(t => (
                            <option key={`author-option-${t.id}`} value={t.id}>

                                #{t.name}
                            </option>
                        ))}
                    </select>
                    <Link to={`/createTag`} className="btn m-2 btn-warning">
                        Don't see the tag you want?
                        Click here to Create your Own!🏷
                    </Link>

                    {/* set Blog Title */}
                    <label className="row" >📕 Title:</label>
                    <input type="text" className="form-control m-2" placeholder="Give Your Blog a Title" value={blog_title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlogTitle(e.target.value)} />

                    {/* set Blog Content */}
                    <div className="form-control input-group-text m-2"  >
                        <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBlogContent(e.target.value)} className="form-control input-group-text" value={blog_content} placeholder="Write your Blog here..."  >
                        </textarea>
                    </div>

                    {/* ----------- CTA Buttons ----------- */}
                    <div onClick={() => navigate(-1)} className="btn m-2 btn-primary">
                        Go Back?
                    </div>
                    <button onClick={handleSubmitButton} className="btn btn-success m-2 shadow ">Click to Post Blog!</button>
                </div>
            </div>
        </>
    );
}

export default Create;