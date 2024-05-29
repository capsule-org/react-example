import "./shim";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import '@usecapsule/react-sdk/styles.css';

ReactDOM.render(
  <BrowserRouter>{<App />}</BrowserRouter>,
  document.getElementById("root")
);
