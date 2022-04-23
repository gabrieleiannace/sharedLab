import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Nav, Table, Accordion, Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Film, FilmLibrary } from './Film.js'
import './animation.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

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
        <label class="form-check-label" for="flexCheckDefault">
          Favorite
        </label>
      </td>
      <td>{film.watchDate ? film.watchDate.format('MMMM D, YYYY') : "none"}</td>
      <td>{filledStars}{emptyStars}</td>
    </tr>
  );
}

function FilmTable(props) {
  const films = props.library.list;
  const filmsRow = films.map(
    film => <FilmRow film={film} key={film.id} />
  )
  return (<Table><tbody>{filmsRow}</tbody></Table>);
}
function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button onClick={decoratedOnClick}>{children}</Button>
  );
}

function App() {
  return (
    <body>
      <Nav className="bg-primary">
        <Container fluid>
          <Row>
            {/*Questo è hamburger-menu nel caso in cui sia small screen*/}
            <Col className='text-light d-sm-none g-0'>
              <Accordion defaultActiveKey="0">
                <Container fluid>

                  <CustomToggle eventKey="1"><a className="btn btn-primary px-0 text-center" data-bs-toggle="collapse" role="button"
                    aria-expanded="false" aria-controls="multiCollapseExample1">
                    <i class="bi bi-list" style={{ fontSize: "32px" }}></i>
                  </a></CustomToggle>

                  <Accordion.Collapse eventKey="1">
                    <Container fluid style={{ border: "2px solid red" }}>
                      <Row>
                        <Col>
                          <Container fluid style={{ border: "2px solid red" }} className='list-group-flush my-list py-2'>
                            <a class="list-group-item list-group-item-action active" aria-current="true">
                              All
                            </a>
                            <a className="list-group-item bg-primary list-group-item-action">Favorite</a>
                            <a className="list-group-item bg-primary list-group-item-action">Best Rated</a>
                            <a className="list-group-item bg-primary list-group-item-action">Last Seen</a>
                            <a className="list-group-item bg-primary list-group-item-action">Seen Last Month</a>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Collapse>
                </Container>
              </Accordion>

            </Col>
            <Col className='text-light p-1 py-2'>
              <a><i class="bi bi-collection-play" style={{ fontSize: "32px" }}></i> FilmLibrary</a>
            </Col>
            <Col className="d-none d-sm-block p-1" align="center">

              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </Col>
            <Col className='text-light d-flex flex-row-reverse p-2' align="center">
              <i class="bi bi-person-circle" style={{ fontSize: "32px" }}></i>
            </Col>
          </Row>
        </Container>
      </Nav >
      {/* Fine NavBar */}

      < Container fluid>
        <Row>
          <Col className='col-sm-4 h6 d-none d-sm-block g-0'>
            <Container className='list-group-flush my-list vh-100 bg-light py-2'>
              <a class="list-group-item list-group-item-action" id='customSideBarElem' aria-current="true">
                All
              </a>
              <a className="list-group-item list-group-item-action" id=''>Favorite</a>
              <a className="list-group-item list-group-item-action" id='customSideBarElem'>Best Rated</a>
              <a className="list-group-item list-group-item-action" id='customSideBarElem'>Last Seen</a>
              <a className="list-group-item list-group-item-action" id='customSideBarElem'>Seen Last Month</a>
            </Container>
          </Col>
          <Col className="col-sm-8 col-12 py-2">
            <h2>All</h2>
            <FilmTable library={library} />
          </Col>
        </Row>
      </Container>
    </body >
  );
}

export default App;
