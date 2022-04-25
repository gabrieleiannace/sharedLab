import { Container, Col, Row, ListGroup, Form } from "react-bootstrap";
import "./Main.css";
import { Library } from './FilmsManager.js';
import dayjs from 'dayjs'

function Main(props) {
    return (
        <Col className="mt-3">
            <h1>{props.active}</h1>
            <ListGroup variant="flush">
                {Filter(props.active, props.films.film).map((film) =>
            <FilmRow film={film} key={film.id} />)}
            </ListGroup>
            <i class="bi bi-plus-circle-fill m-5 text-primary float-end"></i>
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

export default Main;