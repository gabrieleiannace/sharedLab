import { Navbar, Form, Row, Col, Nav, ListGroup, Button, Card } from 'react-bootstrap';
import { Container, Table } from 'react-bootstrap'
import { BsFilm, BsPersonCircle } from 'react-icons/bs'
import './App.css'

function MyMain() {

    return (
        <>
            <Card.Title class="ms-2 mt-2" as="h1">
                All
            </Card.Title>
            <Row>
                <ListGroup as="ul" variant='flush'  >
                    <ListGroup.Item as="li" fluid>
                        <Row>
                            <Col md={4} >Pulp Fiction</Col>
                            <Col md={3}>
                                <Form>
                                    <Form.Check label='Favorite' checked />
                                </Form>

                            </Col>
                            <Col md={3}>March 10, 2022</Col>
                            <Col md={2}>&#9733;&#9733;&#9733;&#9733;&#9733;</Col>

                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item as="li" fluid>
                        <Row>
                            <Col md={4}>21 Grams</Col>
                            <Col md={3}>
                                <Form>
                                    <Form.Check label='Favorite' checked />
                                </Form>
                            </Col>
                            <Col md={3}>March 17, 2022</Col>
                            <Col md={2}>&#9733;&#9733;&#9733;&#9733;&#9734;</Col>

                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item as="li" fluid>
                        <Row>
                            <Col md={4}>Star Wars</Col>
                            <Col md={3}>
                                <Form>
                                    <Form.Check label='Favorite' />
                                </Form>
                            </Col>
                            <Col md={3}></Col>
                            <Col md={2}>&#9734;&#9734;&#9734;&#9734;&#9734;</Col>

                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item as="li" fluid>
                        <Row>
                            <Col md={4}>Matrix</Col>
                            <Col md={3}>
                                <Form>
                                    <Form.Check label='Favorite' />
                                </Form>
                            </Col>
                            <Col md={3}></Col>
                            <Col md={2}>&#9733;&#9733;&#9733;&#9733;&#9733;</Col>

                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item as="li" fluid>
                        <Row>
                            <Col md={4}>Shrek</Col>
                            <Col md={3}>
                                <Form>
                                    <Form.Check label='Favorite' />
                                </Form>
                            </Col>
                            <Col md={3}>March 21, 2022</Col>
                            <Col md={2}>&#9734;&#9734;&#9734;&#9733;&#9733;</Col>

                        </Row>
                    </ListGroup.Item>

                </ListGroup>


            </Row>
        </>
    )
}

export default MyMain;