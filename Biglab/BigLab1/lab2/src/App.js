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
const f5 = new Film(5, "Shrek", false, "2022-04-01", 3);

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

  const [rating, setRating] = useState(film.rating);

  const filledStars = [];
  const emptyStars = [];

  const [favorite, setFavorite] = useState(film.favorite);

  function updateRating(rating) {
    setRating(rating);
    props.updateFilm2List(new Film(film.id, film.title, film.favorite, film.watchDate, rating));
  }

  for (let i = 0; i < rating; ++i) {
    filledStars.push(<i className="bi bi-star-fill" key={i+1} onClick={() => updateRating(i + 1)}></i>)
  }

  for (let i = 0; i < 5 - rating; ++i) {
    emptyStars.push(<i className="bi bi-star" key={rating+1+i} onClick={() => updateRating(rating + 1 + i)}></i>)
  }


  return (
    <tr>

      <td>
        <Button variant="none" className='p-1'><i className="bi bi-pencil-square"></i></Button>
      </td>
      <td><Button variant="none" className='p-1'><i className="bi bi-trash" onClick={() => props.deleteFilm2List(film)}></i></Button>
      </td>
      {favorite ?
        <td className="text-danger"> {film.title}</td> :
        <td>
          {film.title}
        </td>
      }



      <td>
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={favorite}
          onChange={(ev) => {
            setFavorite(ev.target.checked)
            const newFilm = new Film(film.id, film.title, ev.target.checked, film.watchDate, film.rating)
            console.log(newFilm);
            props.updateFilm2List(newFilm);
          }} />
        <label className="form-check-label px-1" htmlFor="flexCheckDefault">
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
          film => <FilmRow
            film={film} key={film.id}
            deleteFilm2List={props.deleteFilm2List}
            updateFilm2List={props.updateFilm2List}
          />)}</tbody>
      </Table>
      <AddButton addFilm2List={props.addFilm2List} filmList={filmList} />
    </>
  );
}

function AddButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => { setShow(false); setErrorMsg(''); }
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [watchDate, setWatchDate] = useState(dayjs(new Date()));
  const [rating, setRating] = useState(0);


  //  Error Message: Empty string like '' = there is not an error
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();


    //  Validation: avoid empty title
    if (!title) {
      setErrorMsg('Errore: il titolo non può essere vuoto')
      return;
    }

    const today = dayjs(new Date());
    //  Validation: avoid future dates
    if ((today.diff(dayjs(watchDate)) <= 1)) {
      setErrorMsg('Errore: i viaggi nel tempo non sono ancora implementati')
      return;
    }

    //  Add
    const newFilm = new Film(0, title, favorite, watchDate, rating);
    props.addFilm2List(newFilm);
    handleClose()
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
                placeholder="Titolo"
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>

              <div className="form-check form-switch">
                <br />
                <Form.Label>Favorite</Form.Label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onClick={(ev) => setFavorite(ev.target.checked)}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Data di visulizzazione</Form.Label>
              <Form.Control className='text-muted' value={watchDate.format('YYYY-MM-DD')} type='date' onChange={ev => setWatchDate(dayjs(ev.target.value))}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                placeholder='0-5'
                value={rating}
                onChange={
                  (ev) => {
                    if (ev.target.value > 5)
                      setRating(5);
                    else if (ev.target.value < 0)
                      setRating(0);
                    else
                      setRating(ev.target.value);
                  }
                }
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

  function updateFilm2List(film) {
    setFilmList(oldList => {
      return oldList.map((item) => {
        if (item.id === film.id) {
          console.log(item + " " + item.id)
          return film;
        }
        return item;
      })
    })
  }

  function deleteFilm2List(film) {
    setFilmList(() => (filmList.filter((element) => element.id !== film.id)))
    setShowedFilmList(oldList => {
      return oldList.filter((element) => element.id !== film.id);
    })
  }

  function addFilm2List(film) {

    //  Generate a new key ID
    let max = 0;
    for (const element of filmList) {
      if (element.id > max)
        max = element.id
    }
    //  max + 1 for unique ID
    film.id = max + 1;

    setFilmList((oldList) => oldList.concat(film));
    filterHandle(activedFilter)
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
            <FilmTable
              filmList={showedfilmList}
              addFilm2List={addFilm2List}
              deleteFilm2List={deleteFilm2List}
              updateFilm2List={updateFilm2List}
            />
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
          <Navbar.Brand><a><i className="bi bi-collection-play" style={{ fontSize: "32px" }}></i> FilmLibrary</a></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {filters.map((filter, index) => <Nav.Link hidden={hideElem} key={index} onClick={() => props.filterHandle(index)}>{filter}</Nav.Link>)}
              <Nav.Link>
                <input className="form-control me-2 justify-content-center " type="search" placeholder="Search" aria-label="Search" />
              </Nav.Link>
              {hideElem ?
                <Nav.Link className='position-absolute top-0 end-0'><i className="bi bi-person-circle p-1 " style={{ fontSize: "32px" }}></i>Account</Nav.Link>
                :
                <Nav.Link><i className="bi bi-person-circle p-1 " style={{ fontSize: "32px" }}></i>Account</Nav.Link>
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


    <FilmManager
      filmList={library.list}
      filters={filterList}
    />

  );
}
export default App;
