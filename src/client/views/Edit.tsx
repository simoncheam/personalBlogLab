import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { database_config } from '../../server/config';
import { Blogs, Authors, Tags, BlogTags, BlogTagsJoined } from '../client_types'


const Edit = () => {

    const { goBack } = useHistory();
    const hist = useHistory();
    const { blog_id } = useParams<{ blog_id: string }>();

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


    // const handleUpdate
    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // input validation

        // BLOG - PUT
        fetch(`/api/blogs/${blog_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: blog_title,
                content: blog_content,
                authorid: selectedAuthorId,
                tagid: selectedTagId
            })
        })
            .then(res => res.json())
            .then(data => {
                hist.push(`/blogs/${blog_id}`)
                console.log(data);
            })
            .catch(e => console.log(e))
    }

    // const handleDelete

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (confirm('Are you sure?')) {
            console.log('delete blog confirmed');
        }
        fetch(`/api/blogs/${blog_id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => {
                hist.push(`/`)
            })
            .catch(e => console.log(e))
    }

    //useEffect - blog specific
    useEffect(() => {
        fetch(`/api/blogs/${blog_id}`)
            .then(res => res.json())
            .then((data: BlogTagsJoined) => {
                data = data[0];
                setBlog(data)

                // setblog state - tag, title, content
                setBlogTag(data.tag_name)
                setBlogContent(data.content)
                setBlogTitle(data.title)

                //author state - name 
                setAuthor(data.a_name)
            })
            .catch(e => console.log(e))

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
    if (!blog_title) {
        return <h1>Loading...</h1>
    }

    // handleAuthorSelectUpdate
    const handleAuthorSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setSelectedAuthorId(Number(e.target.value))
    };

    // handleTagSelectUpdate
    const handleTagSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedTagId(Number(e.target.value))
        console.log(Number(e.target.value));
    };



    return (
        <>
            <h1 className="display-3 m-3 text-center">👋 Hey, {author} Edit Your Blog! </h1>

            <div className="row mt-5 justify-content-center">
                <div className="form-group col-6">

                    {/* ----------- select authorname ----------- */}

                    <label >Update Author:</label>
                    <select onChange={handleAuthorSelectUpdate} className="form-control m-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <option  >Current: {author} (please select update below)</option>

                        {authors.map(author => (
                            <option key={`author-option-${author.id}`} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>

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
                        <div onClick={goBack} className="btn mx-2 btn-primary">Go Back?</div>
                        <button onClick={handleDelete} className="btn mx-2 btn-danger">Delete!</button>
                        <button onClick={handleUpdate} className="btn btn-Success">Save Updates!</button>
                    </div>

                </div>

            </div>


        </>
    );
}

export default Edit;