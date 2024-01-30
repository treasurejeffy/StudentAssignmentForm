import React from 'react';
import ReactDOM from 'react-dom/client';
import Assignment from './Assignment/assign';
import RouterSwitch from './route';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterSwitch />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
