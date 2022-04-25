import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import dayjs from 'dayjs';
import { Container, Row } from "react-bootstrap";
import { useState } from 'react';

import MyNavbar from './Navbar.js';
import Aside from './Aside.js';
import Main from './Main.js';
import { Film, Library } from './FilmsManager.js';

function createFilmsList() {
  const f1 = new Film(1, "Pulp Fiction", true, dayjs('2022-03-10'), 5);
  const f2 = new Film(2, "21 Grams", true, dayjs('2022-04-17'), 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, dayjs('2022-03-22'), 3);
  const library = new Library();
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);
  return library;
}

function App() {

  const [active, setActive] = useState('All');
  const films = createFilmsList();

  return (
    <>
      <MyNavbar active={active} setActive={setActive}/>
      <Container fluid>
        <Row>
          <Aside active={active} setActive={setActive}/>
          <Main films={films} active={active}/>
        </Row>
      </Container>
    </>
  );
}

export default App;
