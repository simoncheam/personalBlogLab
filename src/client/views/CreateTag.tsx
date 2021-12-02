import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tags } from '../client_types'
import { APIService } from '../services/APIService';

//import client types

const CreateTag = () => {

    const pizza = useRef(null);
    let navigate = useNavigate();

    // set author state
    const [tags, setTags] = useState<Tags[]>([]);
    const [new_tag_name, setNewTag_name] = useState("");

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!new_tag_name) return alert('Fill out the god damn fields!')

        //Question: what is the best way to alert user of duplicate entry attempt? 500=>check entry?
        //the table Tag name is unique so it does not allow it

        //@ts-ignore
        APIService(`/api/tags`, 'POST', {
            name: new_tag_name
        })
            .then(data => {
                navigate(`/create`)
            })
            .catch(e => {
                console.log(e)
            })
    };
    //useEffect
    useEffect(() => {
        APIService('/api/tags')
            .then(t => setTags(t))
            .catch(e => console.log(e))
    }, []);

    return (
        <>
            <div className="row m-5 justify-content-center">

                <h1 className="display-3 m-3 text-center">👋 Before you create a Tag... </h1>
                <p className="display-6 m-3 text-center">Check the list(duplicates not allowed):</p>

                {/* existing tags */}

                <ul className="col-6 justify-content-center list-group m-2">
                    {tags.map(tag => (
                        <Link to={`/blogs/browse/${tag.id}`} className="list-group-item" key={`tag-${tag.id}`}>

                            <div className="card shadow-lg m-2">

                                {/* HEADER */}
                                <div className="card-header">
                                    {tag?.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </ul>

                <div className="row mt-5 justify-content-center">
                    <p className="display-6 m-3 text-center">Create your tag below...</p>

                    <div className="form-group col-6">

                        <input ref={pizza} type="text" className="form-control m-2" placeholder="Create your tag name" value={new_tag_name} onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                setNewTag_name(e.target.value);
                                pizza.current.scrollIntoView(); //this focuses text field if scroll view alignment is off

                            }} />
                        <button onClick={handleSubmitButton} className="btn btn-primary m-2 shadow ">Click to Create a New Tag!</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateTag;