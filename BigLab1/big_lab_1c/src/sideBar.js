import { Nav, ListGroup } from 'react-bootstrap';

import './App.css'

function MySideBar(props) {

    return (

        <Nav id='sidebar-menu' className='below-nav col-sm-2 col-md-3 col-lg-4 d-md-block bg-light collapse'>
            <ListGroup id="filter-sidebar" variant="flush" defaultActiveKey="#all">
                <ListGroup.Item action href="#all" onClick={() => { props.setActive('All') }}>All</ListGroup.Item>
                <ListGroup.Item action href="#favorites" onClick={() => { props.setActive('Favorites') }}>Favorites</ListGroup.Item>
                <ListGroup.Item action href="#best-rated" onClick={() => { props.setActive('Best Rated') }}>Best Rated</ListGroup.Item>
                <ListGroup.Item action href="#seen-last-month" onClick={() => { props.setActive('Seen Last Month') }}>Seen Last Month</ListGroup.Item>
                <ListGroup.Item action href="#unseen" onClick={() => { props.setActive('Unseen') }}>Unseen</ListGroup.Item>
            </ListGroup>
        </Nav>

    )
}

export default MySideBar;