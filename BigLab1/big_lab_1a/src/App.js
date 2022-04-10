import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import MyMain from './main';
import MyNavbar from './Navbar';
import MySideBar from './sideBar';


function App() {
  return (
    <>
      <MyNavbar />
      <Container fluid>
        <Row>
          <Col sm={4} className="mt-3 ">
            <MySideBar />
          </Col>

          <Col>
            <MyMain />
          </Col>
        </Row>

      </Container>

    </>
  );
}

export default App;
