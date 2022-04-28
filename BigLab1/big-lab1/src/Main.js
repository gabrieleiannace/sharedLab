import { Container, Col, Row, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import "./Main.css";
import { Library, Film } from './FilmsManager.js';
import dayjs from 'dayjs'

function Main(props) {

    console.log(props);
    const [showForm, setShowForm] = useState(false);
    //passare props

    // chiedere al prof
    // props.films.addNewFilm(new Film(6, "Shrek2", false, dayjs('2022-03-22'), 3));

    return (
        <Col className="mt-3">
            <h1>{props.active}</h1>
            <ListGroup variant="flush">
                {Filter(props.active, props.films.film).map((film) =>
                    <FilmRow film={film} key={film.id} />)}
            </ListGroup>

            {(!showForm) ? <Button variant="none" className="float-end" onClick={() => setShowForm(true)}>
                <i class="bi bi-plus-circle-fill"></i></Button> :
                <AddFilmForm cancel={() => setShowForm(false)} addFilm={addFilm} />}



        </Col>
    );
}

function FilmRow(props) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < props.film.rating) stars.push(<i class="bi bi-star-fill"></i>)
        else stars.push(<i class="bi bi-star"></i>)
    }

    return (
        <>
            <ListGroup.Item>
                <Container fluid>
                    <Row>
                        <Col xs="4">
                            <i class="bi bi-pencil-square"></i>
                            <i class="bi bi-trash"></i>
                            <span style={{ color: props.film.favorite ? 'red' : '' }}>{props.film.title}</span>
                        </Col>
                        <Col xs="3">
                            {props.film.favorite ? <Form.Check label='Favorite' defaultChecked /> : <Form.Check label='Favorites' />}
                        </Col>
                        <Col xs="3">
                            {props.film.date === "" ? props.date : props.film.date.format('MMMM D, YYYY')}
                        </Col>
                        <Col xs="2">
                            {stars}
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </>
    );
}

// Creare il componente delle stelle e passare la props con chiamata a funzione diversa nella visualizzazione a comparsa
// e quella base

function Filter(active, films) {
    let filteredList = new Library()
    switch (active) {
        case 'Favorites':
            filteredList = films.filter(f => f.favorite)
            break;
        case 'Best Rated':
            filteredList = films.filter(f => f.rating === 5)
            break;
        case 'Seen Last Month':
            filteredList = films.filter(f => f.date >= dayjs().subtract(1, 'month'))
            break;
        case 'Unseen':
            filteredList = films.filter(f => f.date === '')
            break;
        default:
            filteredList = films
            break;
    }
    return filteredList;
}

function AddFilmForm(props) {

    const [errorMsg, setErrorMsg] = useState('');  // stringa vuota '' = non c'e' errore
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(dayjs());
    const [checkFavorite, setCheckFavorite] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
            <Form>

                <Row>
                    <Col sm={3} className="my-1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={ev => setTitle(ev.target.value)}></Form.Control>
                    </Col>

                    <Col sm={3} className="my-1">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
                    </Col>

                    <Col xs="auto" className="my-1">
                        <Form.Check type="checkbox" defaultChecked={checkFavorite} onChange={() => setCheckFavorite(!checkFavorite)} label="Favorite" /> 
                    </Col>

                    <Form.Group>
                        <Form.Label>Stars</Form.Label>
                        <Form.Control type='number' min={18} max={31} value={5} />
                    </Form.Group>
                </Row>



                <Form.Group className="mt-3">
                    <Button onClick={handleSubmit}>Save</Button>
                    <Button onClick={props.cancel}>Cancel</Button>
                </Form.Group>


            </Form>

        </>
    )
}

function addFilm(exam) {

}


export default Main;