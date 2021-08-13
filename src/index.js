import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Router>,
  document.getElementById('root')
);