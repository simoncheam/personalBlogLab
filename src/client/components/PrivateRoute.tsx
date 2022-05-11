import * as React from 'react';
//import {  Route } from 'react-router';
import { Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIService, TOKEN_KEY } from '../services/APIService';

// need to import private button panel

// need to clarify meaning of "...rest" not used here// not needed except when we have other props

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  let navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [isAuthed, setIsAuthed] = useState(null);

  useEffect(() => {
    const TOKEN = localStorage.getItem(TOKEN_KEY);
    console.log(TOKEN);

    if (!TOKEN) {
      navigate(`/login`);
    } else {
      APIService(`/auth/validate`)
        .then((res) => {
          console.log(res.one_author);

          const tokenStatus = res.one_author ? true : false;

          setIsAuthed(tokenStatus);
          setLoaded(true);
          //console.log('APIservice then chain should work!');
        })
        .catch((e) => {
          console.log('Your token is bad!');
          console.log(e);
          navigate(`/login`);
        });
    }
  }, []);

  if (!loaded) return <></>;

  // is there a token? if not=> send to login
  if (!isAuthed) {
    console.log('not logged in!');
    navigate(`/login`);
  } else {
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  }
};

interface PrivateRouteProps {
  path?: string;
  exact?: boolean;
  children?: React.ReactNode;
}

export default PrivateRoute;
