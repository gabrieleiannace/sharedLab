import { Navbar , Nav} from "react-bootstrap";
import "./Navbar.css"
function MyNavbar() {
    return (
<Navbar bg="primary" variant="dark">
    <div class="container-fluid px-0">
        <Navbar.Brand>
        <i id="logo_ico" class="bi bi-film mx-2"> Film Library</i>       
        </Navbar.Brand>
        <Navbar.Text class="d-flex">
            <input  class="form-control" type="search" placeholder="Search" aria-label="Search"/>
        </Navbar.Text>
        <Nav.Link href="" id="userbtn" className="px-0 py-0 mx-2 my-0">
            <i class="bi bi-person-circle h2"></i> 
        </Nav.Link>
    </div>
</Navbar>
    );
  }
  
  export default MyNavbar;