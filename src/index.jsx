import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import 'antd/dist/antd.css';
import App from './App';
import mocks from './mocks';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
