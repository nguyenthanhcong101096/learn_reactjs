import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UseState from './hooks/UseState';
import UseEffect from './hooks/UseEffect';
import UseCallback from './hooks/UseCallback';

ReactDOM.render(
  <React.StrictMode>
    <UseCallback />
  </React.StrictMode>,
  document.getElementById('root')
);
