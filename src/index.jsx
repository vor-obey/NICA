import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mocks from './mocks';

ReactDOM.render(
  <React.StrictMode>
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
