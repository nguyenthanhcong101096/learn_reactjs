import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UseState from './hooks/UseState';
import UseEffect from './hooks/UseEffect';
import UseCallback from './hooks/UseCallback';
import Redux from './redux/Redux';

ReactDOM.render(
  <React.StrictMode>
    <Redux />
  </React.StrictMode>,
  document.getElementById('root')
);
