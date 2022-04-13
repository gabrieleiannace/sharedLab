import { Navbar, Form } from 'react-bootstrap';
import { Container, Button } from 'react-bootstrap'
import { BsFilm, BsPersonCircle } from 'react-icons/bs'


function MyNavbar() {

    return (
        <>
            <Navbar bg="primary" variant="dark" >
                <Container fluid>

                    <div className="d-md-none">
                        <Button className="btn btn-primary w-auto float-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list"
                                viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </Button>
                    </div>


                    <Navbar.Brand >
                        <BsFilm size={32} />
                        {' '}
                        Film Library
                    </Navbar.Brand>



                    <Form className="collapse d-md-block ">
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

