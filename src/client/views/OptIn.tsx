import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blogs, BlogTagsJoined, Tags } from '../client_types';
import Skeleton from 'react-loading-skeleton'
import { APIService, TOKEN_KEY } from '../services/APIService';


const OptIn = () => {
    let navigate = useNavigate();

    const [from, setFrom] = React.useState('');  // !!! need to change to contacts email later
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem(TOKEN_KEY);

        console.log(token);
        localStorage.setItem(TOKEN_KEY, token)
        
        
        const res = await 
        //@ts-ignore
        APIService('apimailgun/contact', 'POST', {
       

                from: `Hey_${from}<+${subject}+@ishere.yum>`,
                subject: `Your ${subject} is on the way!😜`,

                message: `Yo ${from}! 
                \n\n Just testing some Mailgun awesomeness! 
                
                \n Also, got your note about:\n "${message}"
                \n\n(we couldn't agree more😆)\n Stay tuned for more great content coming your way.
                
                \n - cheers,\n -Simon
                
                \n\n\n Not interested in creating an awesome life? 
                \n Click the link below: \n\n %unsubscribe_url%
                `
            })
            
        
        // .then(res=>res.json())
        .then(res=>{
            
            console.log(res);
            navigate(`/welcome`)
        })
        .catch(e => console.log(e))

    }

    return (
        <>

            <main className="container">
                <h1 className="display-3 m-3 text-center">Enjoying the blog?... </h1>
                <p className="display-6 m-3 text-center">Join our VIP list for exclusive content and special bonuses not available on the site!)</p>

                {/* Input section */}
                <section className="row mt-5 justify-content-center">
                    <div className="col-md-6">


                            <form className="form-group p-3 border rounded-lg" >

                                <input className="form-control mb-3"
                                    placeholder="What's your first name?"
                                    value={from}
                                    onChange={e => setFrom(e.target.value)}
                                />

                                <input  className="form-control mb-3" placeholder="What's your favorite food? (only 1 food item allowed please:)"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />

                                <textarea className="form-control mb-3" placeholder="What's your favorite quote or saying?"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />


                                <button onClick={handleSubmit} className="btn btn-success">Add Me Now!</button>
                            </form>
                    </div>
                </section>
            </main>
        </>

    )

}



export default OptIn;