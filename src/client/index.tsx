import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import './scss/app';
import '@stripe/stripe-js';

render(<App />, document.getElementById("root"));