import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './nft-marketplace/App';
import { BrowserRouter } from "react-router-dom";


console.log(process.env)
ReactDOM.render(
  <BrowserRouter>
    {<App/>}
  </BrowserRouter>,
  document.getElementById('root')
);

