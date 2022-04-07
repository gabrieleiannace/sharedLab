import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Button } from 'react-bootstrap';

function MyButton(props) {
  if (props.lang === "it")
    return <Button>ciao</Button>
    else
    return <Button>hello</Button>
}

function App() {
  return (
    <p>Premi qui <MyButton lang="en" /></p>
  );
}

export default App;
