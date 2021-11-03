import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'

//import client types



const CreateAuthor = () => {

    const hist = useHistory();

    // set author state
    const [author_name, setAuthor_name] = useState("");
    const [author_email, setAuthor_email] = useState("");


    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!author_name || !author_email) return alert('🤬 Fill out the god damn fields! Not a good start to your blogging career🤦🏻‍♂️')


        fetch("/api/authors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                name: author_name, 
                email: author_email 
            })
        })
            .then(res => res.json())
            .then(data => {
                hist.push(`/authors`)


            })
            .catch(these_hands => {
                console.log(these_hands)
            })
    };


    return (
        <>
            <div className="row m-5 justify-content-center">

                <h1 className="display-3 m-3 text-center">👋 Become An Author!📝 </h1>
                <p className="display-6 m-3 text-center">Create Your Blog Account Today👇</p>

                <div className="row mt-5 justify-content-center">

                    <div className="form-group col-6">
                        <input type="text" className="form-control m-2" placeholder="Choose your Username (cannot be changed)" value={author_name} onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => setAuthor_name(e.target.value)} />

                        <input type="text" className="form-control m-2" placeholder="email" value={author_email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor_email(e.target.value)} />

                        <p> We can't promise to keep your information safe(lol)😜</p>

                        <button onClick={handleSubmitButton} className="btn btn-primary m-2 shadow ">Click to Create Account!</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAuthor;