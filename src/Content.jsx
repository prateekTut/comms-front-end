import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Emaillist from './Emaillist.js';

import Mail from './mail.js';

import Redux from './redux';

const Content = () => {
  return (
    <main>
      <Routes>
        <Route element={<Mail/>} path="/mail" />      
        <Route element={<Emaillist/>} path="/" />  
        <Route element={<Navigate from="*" to="/" />} />  
        <Route element={<Redux/>} path="/redux" />    
      </Routes>
    </main>
  );
};

export default Content;