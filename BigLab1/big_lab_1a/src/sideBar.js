import { Nav, ListGroup } from 'react-bootstrap';

import './App.css'

function MySideBar() {

    return (

        <Nav id='sidebar-menu' className='below-nav col-sm-2 col-md-3 col-lg-4 d-md-block bg-light collapse'>
            <ListGroup id="filter-sidebar" variant="flush" defaultActiveKey="#all">
                <ListGroup.Item action href="#all">All</ListGroup.Item>
                <ListGroup.Item action href="#favorites">Favorites</ListGroup.Item>
                <ListGroup.Item action href="#best-rated">Best Rated</ListGroup.Item>
                <ListGroup.Item action href="#last-seen">Last Seen</ListGroup.Item>
                <ListGroup.Item action href="#seen-last-monthy">Seen Last Monthy</ListGroup.Item>
            </ListGroup>
        </Nav>

    )
}

export default MySideBar;