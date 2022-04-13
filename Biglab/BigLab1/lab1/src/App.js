import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Nav, Table, Dropdown } from 'react-bootstrap';
import { Film, FilmLibrary } from './Film.js'

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


function FilmRow(props) {
  const film = props.film;
  const filledStars = [];
  const emptyStars = [];

  
  const ratingCounter = 0;
  for(let i = 0; i < film.rating; ++i){
    filledStars.push(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    className="bi bi-star-fill" viewBox="0 0 16 16">
    <path
        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>)
  }

  for(let i = 0; i < 5 - film.rating; ++i){
    emptyStars.push(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    className="bi bi-star" viewBox="0 0 16 16">
    <path
        d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
</svg>)
  }
  return (
    <tr>
      <td>{film.title}</td>
      <td>
        <Container className='form-check'>
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={film.favorite} />
          <label class="form-check-label" for="flexCheckDefault">
            Favorite
          </label>
        </Container>
      </td>
      <td>{film.watchDate ? film.watchDate.format('MMMM D, YYYY') : "none"}</td>
      <td><div>{filledStars}{emptyStars}</div></td>
    </tr>
  );
}

function FilmTable(props) {
  const films = props.library.list;
  const filmsRow = films.map(
    film => <FilmRow film={film} />
  )
  return (<Table><tbody>{filmsRow}</tbody></Table>);
}

function App() {
  return (
    <body>
      <Nav className="bg-primary" style={{ border: "5px solid red" }}>
        <Container>
          <Row>
            {/*Questo è hamburger-menu nel caso in cui sia small screen*/}
            <Col className='text-light d-sm-none'>
              <a className="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button"
                aria-expanded="false" aria-controls="multiCollapseExample1">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                  class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
              </a>
            </Col>
            <Col className='text-light'>
              <a><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                className="bi bi-collection-play" viewBox="0 0 16 16">
                <path
                  d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
                <path
                  d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
              </svg> FilmLibrary</a>
            </Col>
            <Col className="d-none d-sm-block">

              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </Col>
            <Col className='text-light d-flex flex-row-reverse'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className='col-12 my-col g-0 p-0 d-block d-sm-none'>
              <Container className='list-group-flush nav-list collapse multi-collapse'>
                <a href="#" className="list-group-item list-group-item-action active bg-dark"
                  aria-current="true">All</a>
                <a href="#" className="list-group-item bg-primary list-group-item-action text-light">Favorite</a>
                <a href="#" className="list-group-item bg-primary list-group-item-action text-light">Best Rated</a>
                <a href="#" className="list-group-item bg-primary list-group-item-action text-light">Last Seen</a>
                <a href="#" className="list-group-item bg-primary list-group-item-action text-light">Seen Last Month</a>
              </Container>
            </Col>
          </Row>
        </Container>
      </Nav>
      {/* Fine NavBar */}

      <Container className='container-fluid'>
        <Row style={{border: "10px solid violet"}}>
          <Col className='col-sm-4 my-col h6 d-none d-sm-block g-0' style={{border: "10px solid yellow"}}>
            <Container style={{ border: "10px solid green" }} className='list-group-flush my-list vh-100 bg-light py-2'>
              <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                All
              </a>
              <a href="#" className="list-group-item bg-light list-group-item-action">Favorite</a>
              <a href="#" className="list-group-item bg-light list-group-item-action">Best Rated</a>
              <a href="#" className="list-group-item bg-light list-group-item-action">Last Seen</a>
              <a href="#" className="list-group-item bg-light list-group-item-action">Seen Last Month</a>
            </Container>
          </Col>
          <Col className="col-sm-8 col-12 py-2"style={{border: "10px solid red"}}>
            <h2>All</h2>
            <FilmTable library={library}/>
          </Col>
        </Row>
      </Container>
    </body>
  );
}

export default App;
