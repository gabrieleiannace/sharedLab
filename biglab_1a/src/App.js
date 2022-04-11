import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './Navbar.js';
import FilmList from './Film_list.js';
//import MyButton from './Button.js';
/*
<p>premi qui
  <MyButton lang="it"/>
</p>
*/
function App() {
  return (
    <>
      <MyNavbar/>
      <FilmList/>
    </>
  );
}

export default App;
