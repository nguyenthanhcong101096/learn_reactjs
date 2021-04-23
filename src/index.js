import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UseState from './hooks/UseState';
import UseEffect from './hooks/UseEffect';

ReactDOM.render(
  <React.StrictMode>
    <UseEffect />
  </React.StrictMode>,
  document.getElementById('root')
);
