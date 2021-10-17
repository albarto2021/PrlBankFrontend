import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import StateProvider from "./StateProvider";
import reducer, { initialState } from "./reducer";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.Fragment>
    <StateProvider initialState={initialState} reducer={reducer}> 
      <App />
    </StateProvider>
    {/* <ToastContainer autoClose={2000}/> */}
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
