import * as React from 'react';
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { APIService, TOKEN_KEY } from '../services/APIService';

const LoginHere = (props: LoginProps) => {
  let navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || password == null) return alert('🤬 Fill out the fields!🤦🏻‍♂️');

    APIService('/auth/login', 'POST', { email, password })
      .then((data) => {
        localStorage.setItem('token', data.token);
        //localStorage.setItem(TOKEN_KEY, token)
        navigate(`/`);
        console.log(data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className=" row m-5 justify-content-center ">
        <h1 className="display-3 m-3 text-center">Login Here! </h1>
        <form className="form-group p-5 border rounded-lg col-md-6">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
              className="form-control my-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button onClick={handleLoginButton} className="btn btn-primary">
            Login!
          </button>
        </form>
      </div>
    </>
  );
};
interface LoginProps {}
export default LoginHere;
