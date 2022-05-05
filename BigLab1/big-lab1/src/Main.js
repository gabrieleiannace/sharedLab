import { Container, Col, Row, ListGroup, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import "./Main.css";
import { Library, Film } from './FilmsManager.js';
import dayjs from 'dayjs'

function Main(props) {

    const [showForm, setShowForm] = useState(false);
    const [filmList, setFilmList] = useState(props.films.film);

    const [idMax, setIdMax] = useState(filmList.length); // da modificare, meglio prendere il massimo

    function addFilm(film) {
        setFilmList(oldFilms => [...oldFilms, film]);
        setShowForm(false);
        setIdMax(idMax + 1);
    }

    function updateList(film) {
        setFilmList(oldList => {
            return oldList.map((e) => {
                if (e.id === film.id) return film;
                else return e;
            })
        })
    }

    function deleteFilm(film) {
        setFilmList(() => (filmList.filter((e) => e.id !== film.id)))
    }

    return (
        <Col className="mt-3">
            <h1>{props.active}</h1>
            <ListGroup variant="flush">
                {Filter(props.active, filmList).map((film) =>
                    <FilmRow film={film} key={film.id} updateList={updateList} deleteFilm={deleteFilm} />)}
            </ListGroup>

            {(!showForm) ? <Button variant="none" className="float-end" onClick={() => setShowForm(true)}>
                <i class="bi bi-plus-circle-fill"></i></Button> :
                <AddFilmForm cancel={() => setShowForm(false)} addFilm={addFilm} filmList={filmList} idMax={idMax} />}

        </Col>
    );
}

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

function FilmRow(props) {

    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < props.film.rating) stars.push(<i class="bi bi-star-fill" key={i + 1} onClick={() => updateRating(i + 1)}></i>)
        else stars.push(<i class="bi bi-star" key={i + 1} onClick={() => updateRating(i + 1)}></i>)
    }

    function updateRating(rating) {
        props.updateList(new Film(props.film.id, props.film.title, props.film.favorite, props.film.date, rating));
    }

    function updateFavorite(favorite){
        props.updateList(new Film(props.film.id, props.film.title, favorite, props.film.date, props.film.rating));
    }

    return (
        <>
            <ListGroup.Item>
                <Container fluid>
                    <Row>
                        <Col xs="4">
                            <i class="bi bi-pencil-square"></i>
                            <i class="bi bi-trash" onClick={() => props.deleteFilm(props.film)}></i>
                            <span style={{ color: props.film.favorite ? 'red' : '' }}>{props.film.title}</span>
                        </Col>
                        <Col xs="3">
                            {props.film.favorite ? <Form.Check label='Favorite' defaultChecked
                            onChange={(e) => {updateFavorite(false)}}/> : <Form.Check label='Favorite'
                            onChange={(e) => {updateFavorite(true)}}/>}
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

function AddFilmForm(props) {

    const [errorMsg, setErrorMsg] = useState('');  // stringa vuota '' = non c'e' errore
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(dayjs());
    const [checkFavorite, setCheckFavorite] = useState(false);
    const [rating, setRating] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation
        if (title === '') {
            setErrorMsg('Il titolo non può essere vuoto');
        } else if (dayjs().isBefore(date)) {
            setErrorMsg('La data non può essere futura');
        } else {
            const newFilm = new Film(props.idMax + 1, title, checkFavorite, date, rating);
            props.addFilm(newFilm);
        }

    }

    return (
        <>
            {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
            <Form>

                <Row className="me-3">
                    <Col sm={3}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={ev => setTitle(ev.target.value)}></Form.Control>
                    </Col>

                    <Col sm={3}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
                    </Col>

                    <Col sm={2}>
                        <Form.Label>Favorite</Form.Label>
                        <Form.Check type="checkbox" defaultChecked={checkFavorite} onChange={() => setCheckFavorite(!checkFavorite)} />
                    </Col>

                    <Col sm={4}>
                        <Form.Label>Stars</Form.Label>
                        <Form.Control type='number' onChange={ev => { setRating(ev.target.value) }} />
                    </Col>
                </Row>

                <Form.Group className="mt-3">
                    <Button onClick={handleSubmit} className="me-2">Save</Button>
                    <Button onClick={props.cancel}>Cancel</Button>
                </Form.Group>


            </Form>

        </>
    )
}

export default Main;