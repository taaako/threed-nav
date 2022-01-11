import React from 'react';
import ReactDOM from 'react-dom';
import { NavText, Model, NavModal } from './Model';

ReactDOM.render(
  <React.StrictMode>
    <NavText />
    <Model />
    <NavModal />
  </React.StrictMode>,
  document.getElementById('root')
);
