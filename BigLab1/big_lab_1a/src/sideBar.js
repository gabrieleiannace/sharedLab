import { Navbar, Form, Row, Col, Nav, ListGroup, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { BsFilm, BsPersonCircle } from 'react-icons/bs'
import './App.css'

function MySideBar() {

    return (
        <ListGroup as="ul" variant='flush'>
            <ListGroup.Item as="li" active>
                All
            </ListGroup.Item>
            <ListGroup.Item >
                Favorites
            </ListGroup.Item>
            <ListGroup.Item >
                Best Rated
            </ListGroup.Item>
            <ListGroup.Item >
                Last Seen
            </ListGroup.Item>
            <ListGroup.Item >
                Seen Last Monthy
            </ListGroup.Item>
        </ListGroup>

    )
}

export default MySideBar;