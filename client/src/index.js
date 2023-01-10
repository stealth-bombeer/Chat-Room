import React from 'react';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client'
import App from './App';
import reportWebVitals from './reportWebVitals';

const socket = io.connect('http://localhost:3001')
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<App socket={socket} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


