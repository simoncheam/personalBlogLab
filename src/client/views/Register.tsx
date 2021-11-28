import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Blogs, Authors, Tags } from '../client_types'
import { APIService } from '../services/APIService';


const Register = () => {
    let navigate = useNavigate();

    // set author state
    const [author_name, setAuthor_name] = useState("");
    const [author_email, setAuthor_email] = useState("");
    const [author_password, setAuthor_password] = useState(null);


    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!author_name || !author_email || author_password == null)
            return alert('🙄 Fill out the fields please! Not a good start to your blogging career🤦🏻‍♂️');

        //@ts-ignore
        APIService("/auth/register", 'POST', {
            name: author_name,
            email: author_email,
            password: author_password

        })
            .then(data => {

                // !!! insert react-bootstrap toast?
                alert('Welcome!')

                localStorage.setItem('token', data.token)
                navigate(`/create`)


            })
            .catch(e => {
                console.log(e)
            })
    };


    return (
        <>
            <div className="row m-5 justify-content-center">

                <h1 className="display-3 m-3 text-center">👋 Become An Author!📝 </h1>
                <p className="display-6 m-3 text-center">Join Today👇</p>

                <div className="row mt-5 justify-content-center">

                    <div className="form-group col-6">
                        <input type="text" className="form-control m-2" placeholder="Choose your Username (cannot be changed)" value={author_name} onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => setAuthor_name(e.target.value)} />

                        <input type="text" className="form-control m-2" placeholder="email" value={author_email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor_email(e.target.value)} />

                        <input type="password" className="form-control m-2" placeholder="password" value={author_password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor_password(e.target.value)} />



                        <p> We keep your info safe with our super cool Covalence Authentication Technology(CAT)😽</p>

                        <button onClick={handleSubmitButton} className="btn btn-primary m-2 shadow ">Click to Create Account!</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;