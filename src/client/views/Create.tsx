import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'

const Create = () => {

    const { goBack } = useHistory();
    const hist = useHistory();

    //State - Blog
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [blog_content, setBlogContent] = useState("");
    const [blog_title, setBlogTitle] = useState("");
    const [blog_tag, setBlogTag] = useState("");

    // State - Tags
    const [tag, setTag] = useState<Tags[]>([]);

    // State - Author
    const [authors, setAuthors] = useState<Authors[]>([]);
    const [selectedAuthorId, setSelectedAuthorId] = useState(0);
    const [selectedTagId, setSelectedTagId] = useState(0);




    //useEffect
    useEffect(() => {
        fetch(`/api/blogs`)
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
            })
            .catch(error => {
                console.log(error);
            });

        fetch('/api/authors')
            .then(res => res.json())
            .then((a) => {
                setAuthors(a)

            })
            .catch(e => console.log(e))

        fetch('/api/tags')
            .then(res => res.json())
            .then((t) => {
                setTag(t)

            })
            .catch(e => console.log(e))
    }, []);


    // handleAuthorSelectUpdate
    const handleAuthorSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setSelectedAuthorId(Number(e.target.value))
    };

    // handleTagSelectUpdate
    const handleTagSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTagId(Number(e.target.value))
        console.log(selectedTagId);
    };

    if (!blogs) {
        <h1>Loading...</h1>
    }

    // const handleSubmitButton
    const handleSubmitButton = (newblog: React.MouseEvent<HTMLButtonElement>) => {
        newblog.preventDefault();

        //input val
        if (!blog_content || !blog_title || !selectedAuthorId || !selectedTagId) return alert('🤬 Fill out the god damn fields!')


        fetch("/api/blogs", {
            method: "POST",
            headers: {
                "CONTENT-TYPE": "application/json"
            },
            body: JSON.stringify({
                authorid: selectedAuthorId,
                content: blog_content,
                title: blog_title,
                tagid: selectedTagId
            })
        })
            .then(res => res.json())
            .then(data => {
                hist.push(`/`)
                console.log(data);

            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <h1 className="display-3 m-3 text-center">👋 Create Your Blog! </h1>

            <div className="row mt-5 justify-content-center">
                <div className="form-group col-6">

                    <label className="row" >✍️ Author:</label>

                    <select onChange={handleAuthorSelectUpdate} className="form-control m-2">

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>

                        <option value={0}> Select Your Name (honor system lol)</option>

                        {authors.map(author => (
                            <option key={`author-option-${author.id}`} value={author.id}>
                                {author.name}
                            </option>
                        ))}

                    </select>

                    <Link to={`/createAuthor`} className=" row btn m-2 btn-warning">
                        Not a Blogger yet? Click here and be one today!🖋
                    </Link>

                    {/* ----------- select Tag ----------- */}

                    <label className="row" >🏷 Tag</label>

                    <select onChange={handleTagSelectUpdate} className="form-control m-2">

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>

                        <option value={0}> Select a Tag for your Blog</option>

                        {tag.map(t => (
                            <option key={`author-option-${t.id}`} value={t.id}>
                                {t.name}
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

                    <div className="form-control input-group-text m-2" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlogContent(e.target.value)} >
                        <textarea className="form-control input-group-text" value={blog_content} placeholder="Write your Blog here..."  >
                        </textarea>
                    </div>

                    {/* ----------- CTA Buttons ----------- */}

                    <div onClick={goBack} className="btn m-2 btn-primary">
                        Go Back?
                    </div>

                    <button onClick={handleSubmitButton} className="btn btn-success m-2 shadow ">Click to Post Blog!</button>
                </div>
            </div>
        </>
    );
}

export default Create;