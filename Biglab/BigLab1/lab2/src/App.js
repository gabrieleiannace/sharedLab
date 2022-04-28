import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Nav, Navbar, Alert, Table, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { Film, FilmLibrary } from './Film.js'
import './animation.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import dayjs from 'dayjs';

// Creating some film entries
const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
const f3 = new Film(3, "Star Wars", false);
const f4 = new Film(4, "Matrix", false);
const f5 = new Film(5, "Shrek", false, "2022-03-21", 3);

// Creating the film library
const library = new FilmLibrary();

// Adding the films to the FilmLibrary
library.addNewFilm(f1);
library.addNewFilm(f2);
library.addNewFilm(f3);
library.addNewFilm(f4);
library.addNewFilm(f5);

// Adding the list of filter aviable
const filterList = ["All", "Favorite", "Best Rated", "Seen Last Month", "Unseen"];

function FilmRow(props) {
  const film = props.film;
  const filledStars = [];
  const emptyStars = [];



  for (let i = 0; i < film.rating; ++i) {
    filledStars.push(<i class="bi bi-star-fill"></i>)
  }

  for (let i = 0; i < 5 - film.rating; ++i) {
    emptyStars.push(<i class="bi bi-star"></i>)
  }
  return (
    <tr>

      <td>
        <Button variant="none" className='p-1'><i class="bi bi-pencil-square"></i></Button>
      </td>
      <td><Button variant="none" className='p-1'><i class="bi bi-trash"></i></Button>
      </td>
      <td>
        {film.title}
      </td>


      <td>
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={film.favorite} />
        <label class="form-check-label px-1" for="flexCheckDefault">
          Favorite
        </label>
      </td>
      <td>{film.watchDate ? film.watchDate.format('MMMM D, YYYY') : "none"}</td>
      <td>{filledStars}{emptyStars}</td>
    </tr>
  );
}

function FilmTable(props) {
  const filmList = props.filmList;


  return (
    <>
      <Table>
        <tbody>{filmList.map(
          film => <FilmRow film={film} key={film.id} />)}</tbody>
      </Table>
      <AddButton addFilm2List={props.addFilm2List} filmList={filmList} />
    </>
  );
}

function AddButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('Titolo');
  const [watchDate, setWatchDate] = useState(dayjs());
  const [rating, setRating] = useState(0);

  // Error Message: Empty string like '' = there is not an error
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    //  Validation
    if (title) {


      //  Add
      const newFilm = new Film(1234, title, true, watchDate, rating);
      props.addFilm2List(newFilm);
      handleClose()
    } else {
      setErrorMsg('Errore: il titolo non può essere vuoto')
    }
  }

  return (
    <>
      <Button variant="none" className='position-fixed bottom-0 end-0 mx-5 my-5' onClick={handleShow}>
        <i className="bi bi-plus-circle-fill" style={{ fontSize: "32px" }}></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi un nuovo film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Completa i seguenti campi per aggiungere un film alla libreria:
          <br />
          <br />
          <br />
          {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
          <Form>
            <Form.Group>
              <Form.Label>Nome Film</Form.Label>
              <Form.Control
                className="text-muted"
                value={title}
                onClick={() =>
                  title === 'Titolo' ? setTitle('') : false}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data di visulizzazione</Form.Label>
              <Form.Control className='text-muted' value={watchDate.format('YYYY-MM-DD')} type='date' onChange={ev => setWatchDate(dayjs(ev.target.value))}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                className='text-muted'
                value={rating}
                onClick={() => setRating('')}
                onChange={(ev) => setRating(ev.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="dark" onClick={handleSubmit}>Salva</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function FilmManager(props) {
  
  const [filmList, setFilmList] = useState(props.filmList);
  const [showedfilmList, setShowedFilmList] = useState(props.filmList);
  const filters = props.filters;

  const [activedFilter, setActivedFilter] = useState(0)

  function addFilm2List(film) {
    setFilmList((oldList) => oldList.concat(film));
    setShowedFilmList((oldList) => oldList.concat(film));
  }

  function filterHandle(index) {
    setActivedFilter(index);

    switch (index) {
      case 1:
        setShowedFilmList(filmList.filter((film) => {
          return film.favorite;
        }));
        break;
      case 2:
        setShowedFilmList(filmList.filter((film) => {
          return film.rating === 5;
        }))
        break;
      case 3:
        setShowedFilmList(filmList.filter((film) => {
          const today = dayjs(new Date());

          return (today.diff(film.watchDate, 'day') < 30)
        }))
        break;
      case 4:
        setShowedFilmList(filmList.filter((film) => {
          return film.watchDate === '';
        }))
        break;
      default:
        setShowedFilmList(filmList)
        break;
    }
  }


  return (
    <>
      <FilmLibraryNavBar filters={filters} filterHandle={filterHandle} />
      < Container fluid>
        <Row>
          <Col className='col-sm-4 h6 d-none d-sm-block g-0'>
            <SideBar filters={filters} activedFilter={activedFilter} filterHandle={filterHandle} />
          </Col>
          <Col className="col-sm-8 col-12 py-2">
            <h2>{filters[activedFilter]}</h2>
            <FilmTable filmList={showedfilmList} addFilm2List={addFilm2List}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function SideBar(props) {
  const filters = props.filters;

  return (
    <Container className='list-group-flush my-list vh-100 bg-light py-2'>
      {filters.map((filter, index) =>
        <SideBarElement
          filter={filter}
          active={index === props.activedFilter}
          key={index}
          filterHandle={props.filterHandle}
          index={index}
        />
      )}
    </Container >
  );
}

function SideBarElement(props) {
  return (
    <>
      <ListGroup.Item
        action
        active={props.active}
        onClick={() => { props.filterHandle(props.index) }}>
        {props.filter}
      </ListGroup.Item>
    </>

  );
}

function FilmLibraryNavBar(props) {
  const filters = props.filters;

  const [hideElem, setHideElem] = useState(true);
  return (
    <>
      <Navbar collapseOnSelect onToggle={() => { setHideElem(!hideElem) }} expand="sm" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home"><a><i class="bi bi-collection-play" style={{ fontSize: "32px" }}></i> FilmLibrary</a></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {filters.map((filter, index) => <Nav.Link href="#all" hidden={hideElem} onClick={() => props.filterHandle(index)}>{filter}</Nav.Link>)}
              <Nav.Link href="#all">
                <input className="form-control me-2 justify-content-center " type="search" placeholder="Search" aria-label="Search" />
              </Nav.Link>
              {hideElem ?
                <Nav.Link href="#all" className='position-absolute top-0 end-0'><i class="bi bi-person-circle p-1 " style={{ fontSize: "32px" }}></i>Account</Nav.Link>
                :
                <Nav.Link href="#all"><i class="bi bi-person-circle p-1 " style={{ fontSize: "32px" }}></i>Account</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function App() {
  return (
    <body>

      <FilmManager
        filmList={library.list}
        filters={filterList}
      />

    </body >
  );
}
export default App;
