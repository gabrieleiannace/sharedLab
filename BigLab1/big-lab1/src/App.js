import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MyNavbar from './Navbar.js';
import FilmLibrary from './FilmLibrary.js';

function App() {
  return (
    <>
      <MyNavbar/>
      <FilmLibrary/>
    </>
  );
}

export default App;
