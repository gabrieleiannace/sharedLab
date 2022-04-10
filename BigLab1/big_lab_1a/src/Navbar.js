import { Navbar, Form, Row, Col, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
import { BsFilm, BsPersonCircle } from 'react-icons/bs'


function MyNavbar() {

    return (
        <>
            <Navbar bg="primary" variant="dark" >
                <Container fluid>
                    <Navbar.Brand  >
                        <BsFilm size={32} />
                        {' '}
                        Film Library
                    </Navbar.Brand>



                    <Form >
                        <Form.Control size="lg" type="search" placeholder="Search" />
                    </Form>



                    <Navbar.Brand>
                        <BsPersonCircle size={32} />
                    </Navbar.Brand>
                </Container>



            </Navbar >
        </>
    )
}

export default MyNavbar;

