import { Container, Col, Row, ListGroup, Form } from "react-bootstrap";

function FilmLibrary() {

    const icons = {
        fontSize: '.8em',
        color: 'DodgerBlue'
    };

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col lg="3" md="3" className="d-none d-md-block">
                    <ListGroup>
                        <ListGroup.Item active>All</ListGroup.Item>
                        <ListGroup.Item>Favorites</ListGroup.Item>
                        <ListGroup.Item>Best Rated</ListGroup.Item>
                        <ListGroup.Item>Last Seen</ListGroup.Item>
                        <ListGroup.Item>Seen Last Month</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <h1>All</h1>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Container fluid>
                                <Row>
                                    <Col xs="4">
                                        <i class="bi bi-pencil-square text-primary" style={icons}></i>
                                        <i class="bi bi-trash text-primary" style={icons}></i>
                                        <span style={{ color: 'red' }}>Pulp Fiction</span>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Check
                                            type="checkbox"
                                            id="disabledFieldsetCheck"
                                            label="Favorites"
                                        />
                                    </Col>
                                    <Col xs="3">
                                        March 10, 2022
                                    </Col>
                                    <Col xs="2">
                                        &#9733;&#9733;&#9733;&#9733;&#9733;
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Container fluid>
                                <Row>
                                    <Col xs="4">
                                        <i class="bi bi-pencil-square text-primary" style={icons}></i>
                                        <i class="bi bi-trash text-primary" style={icons}></i>
                                        <span style={{ color: 'red' }}>21 Grams</span>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Check
                                            type="checkbox"
                                            id="disabledFieldsetCheck"
                                            label="Favorites"
                                        />
                                    </Col>
                                    <Col xs="3">
                                        March 17, 2022
                                    </Col>
                                    <Col xs="2">
                                        &#9733;&#9733;&#9733;&#9733;&#9734;
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Container fluid>
                                <Row>
                                    <Col xs="4">
                                        <i class="bi bi-pencil-square text-primary" style={icons}></i>
                                        <i class="bi bi-trash text-primary" style={icons}></i>
                                        <span>Star Wars</span>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Check
                                            type="checkbox"
                                            id="disabledFieldsetCheck"
                                            label="Favorites"
                                        />
                                    </Col>
                                    <Col xs="3">
                                    </Col>
                                    <Col xs="2">
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Container fluid>
                                <Row>
                                    <Col xs="4">
                                        <i class="bi bi-pencil-square text-primary" style={icons}></i>
                                        <i class="bi bi-trash text-primary" style={icons}></i>
                                        <span>Matrix</span>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Check
                                            type="checkbox"
                                            id="disabledFieldsetCheck"
                                            label="Favorites"
                                        />
                                    </Col>
                                    <Col xs="3">
                                    </Col>
                                    <Col xs="1">
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Container fluid>
                                <Row>
                                    <Col xs="4">
                                        <i class="bi bi-pencil-square text-primary" style={icons}></i>
                                        <i class="bi bi-trash text-primary" style={icons}></i>
                                        <span>Shrek</span>
                                    </Col>
                                    <Col xs="3">
                                        <Form.Check
                                            type="checkbox"
                                            id="disabledFieldsetCheck"
                                            label="Favorites"
                                        />
                                    </Col>
                                    <Col xs="3">
                                        March 21, 2022
                                    </Col>
                                    <Col xs="2">
                                        &#9733;&#9733;&#9733;&#9734;&#9734;
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                    </ListGroup>
                    <i class="bi bi-plus-circle-fill m-5 text-primary float-end" style={{ fontSize: '2.5em' }}></i>
                </Col>
            </Row>
        </Container>
    );
}

export default FilmLibrary;