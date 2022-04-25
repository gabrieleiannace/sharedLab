import { Col, ListGroup } from "react-bootstrap";

function Aside(props) {
    return (
        <Col lg="3" md="3" className="d-none d-md-block mt-3">
            <ListGroup defaultActiveKey="#all">
                <ListGroup.Item action href="#all" onClick={() => { props.setActive('All') }}>All</ListGroup.Item>
                <ListGroup.Item action href="#favorites" onClick={() => { props.setActive('Favorites') }}>Favorites</ListGroup.Item>
                <ListGroup.Item action href="#best-rated" onClick={() => { props.setActive('Best Rated') }}>Best Rated</ListGroup.Item>
                <ListGroup.Item action href="#seen-last-month" onClick={() => { props.setActive('Seen Last Month') }}>Seen Last Month</ListGroup.Item>
                <ListGroup.Item action href="#unseen" onClick={() => { props.setActive('Unseen') }}>Unseen</ListGroup.Item>
            </ListGroup>
        </Col>
    );
}

export default Aside;