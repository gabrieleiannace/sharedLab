import { Navbar, Container, Nav, Form, FormControl, Col } from 'react-bootstrap';
import "./Navbar.css";

function MyNavbar(props) {
    return (
        <>
            <Navbar bg="primary" expand="xxl" variant="dark">
                <Container fluid>
                    <Col className="d-md-none">
                        <Navbar.Toggle aria-controls="navbarScroll" />
                    </Col>
                    <Col>
                        <Navbar.Brand href="#">
                            <i class="bi bi-collection-play"></i>
                            Film Library
                        </Navbar.Brand>
                    </Col>
                    <Col className="d-none d-md-block">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search" />
                        </Form>
                    </Col>
                    <Col>
                        <i class="bi bi-person-circle float-end"></i>
                    </Col>
                    <Navbar.Collapse id="navbarScroll">
                        <Form className="d-md-none mt-2 me-3">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </Form>
                        <Nav className="me-auto d-md-none" style={{ maxHeight: '120px' }} navbarScroll defaultActiveKey="#all">
                            <Nav.Link action href="#all" onClick={() => { props.setActive('All') }}>All</Nav.Link>
                            <Nav.Link action href="#favorites" onClick={() => { props.setActive('Favorites') }}>Favorites</Nav.Link>
                            <Nav.Link action href="#best-rated" onClick={() => { props.setActive('Best Rated') }}>Best Rated</Nav.Link>
                            <Nav.Link action href="#seen-last-month" onClick={() => { props.setActive('Seen Last Month') }}>Last Seen</Nav.Link>
                            <Nav.Link action href="#unseen" onClick={() => { props.setActive('Unseen') }}>Favorites</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default MyNavbar;