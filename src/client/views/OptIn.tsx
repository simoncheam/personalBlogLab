import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Blogs, BlogTagsJoined, Tags } from '../client_types';
import Skeleton from 'react-loading-skeleton';
import { APIService, TOKEN_KEY } from '../services/APIService';

const OptIn = () => {
  let nav = useNavigate();

  const [from, setFrom] = React.useState(''); // !!! need to change to contacts email later
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  //! disable mailgun due to potential breaking documentation changes
  //   const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();

  //     const token = localStorage.getItem(TOKEN_KEY);

  //     console.log(token);
  //     localStorage.setItem(TOKEN_KEY, token);

  //     const res = await //@ts-ignore
  //     APIService('/apimailgun/contact', 'POST', {
  //       from: `Hey_${from}<+${subject}+@ishere.yum>`,
  //       subject: `Your ${subject} is on the way!😜`,

  //       message: `Yo ${from}!
  //                 \n\n Just testing some Mailgun awesomeness!

  //                 \n Also, got your note about:\n "${message}"
  //                 \n\n(we couldn't agree more😆)\n Stay tuned for more great content coming your way.

  //                 \n - cheers,\n -Simon

  //                 \n\n\n Not interested in creating an awesome life?
  //                 \n Click the link below: \n\n %unsubscribe_url%
  //                 `,
  //     })
  //       // .then(res=>res.json())
  //       .then((res) => {
  //         console.log(res);
  //         navigate(`/welcome`);
  //       })
  //       .catch((e) => console.log(e));
  //   };

  return (
    <>
      <main className="container">
        <h1 className="display-3 m-3 text-center">Enjoying the blog?... </h1>
        <p className="display-6 m-3 text-center">
          Check out our other exclusive content and special bonuses below!)
        </p>
        <div className="text-center">
          <img
            src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif"
            className="rounded m-3"
            alt="..."
          />
        </div>

        {/* Input section */}
        <section className="row justify-content-center">
          <div className="col-md-6">
            <div className="d-grid gap-2">
              <a
                href="https://ultimate-life-purpose.herokuapp.com"
                target="_blank"
                className=" btn btn-primary"
                role="button"
              >
                Life Purpose App
              </a>
              <a
                href="https://covidtrackerdashboard.herokuapp.com"
                target="_blank"
                className=" btn btn-primary"
                role="button"
              >
                Covid-19 Tracker
              </a>
              <a
                href="https://react-github-user-dashboard.netlify.app/login"
                target="_blank"
                className=" btn btn-primary"
                role="button"
              >
                Git Hub Users Dashboard
              </a>
              <a
                href="https://www.simoncheam.dev"
                target="_blank"
                className=" btn btn-primary"
                role="button"
              >
                Hire an Awesome Developer :)
              </a>
            </div>

            {/* <form className="form-group p-3 border rounded-lg">
              <input
                className="form-control mb-3"
                placeholder="What's your first name?"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <input
                className="form-control mb-3"
                placeholder="What's your favorite food? (only 1 food item allowed please:)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <textarea
                className="form-control mb-3"
                placeholder="What's your favorite quote or saying?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button onClick={handleSubmit} className="btn btn-success">
                Add Me Now!
              </button>
            </form> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default OptIn;
