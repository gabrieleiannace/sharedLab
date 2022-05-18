import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyMain from './main';
import MyNavbar from './Navbar';
import MySideBar from './sideBar';
import { Container, Row } from 'react-bootstrap';
import { Film, FilmLibrary } from './StructureFilm';
import dayjs from 'dayjs';
import { useState } from 'react';

function arrayFilm() {
  //creo alcune istanze dei film
  const f1 = new Film(1, "Pulp Fiction", true, dayjs('2022-03-10'), 5);
  const f2 = new Film(2, "21 Grams", true, dayjs('2022-03-17'), 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, dayjs('2022-03-22'), 3);
  const f6 = new Film(6, "La scuola cattolica", true, dayjs('2022-04-02'), 5);
  //aggiungo i film alla libreria
  const library = new FilmLibrary();
  library.addNewFilm(f1)
  library.addNewFilm(f2)
  library.addNewFilm(f3)
  library.addNewFilm(f4)
  library.addNewFilm(f5)
  library.addNewFilm(f6)

  return library
}


function App() {
  const [active, setActive] = useState('All')
  const films = arrayFilm();
  return (
    <>
      <MyNavbar />
      <Container fluid>
        <Row className="row-h-100">
          <MySideBar active={active} setActive={setActive} />
          <MyMain films={films} active={active} />
        </Row>
      </Container>

    </>
  );
}

export default App;
