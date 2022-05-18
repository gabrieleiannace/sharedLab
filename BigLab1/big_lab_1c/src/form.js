import { Card, Table, Alert, Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { FilmLibrary } from './StructureFilm';
import dayjs, { Dayjs } from 'dayjs'
import { BsFillPlusCircleFill } from "react-icons/bs";


function MyForm(props) {
    const [title, setTitle] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [rating, setRating] = useState();

    const [errorMsg, setErrorMsg] = useState('');  // stringa vuota '' = non c'e' errore

    const handleSubmit = (event) => {
        event.preventDefault();
        // validation
        if (rating <= 5) {
            // add
            const NewFilm = { title: title, favorite: favorite, date: date, rating: rating }
            props.addFilm(NewFilm);
        } else {
            //console.log('Errore voto: ' + score);
            setErrorMsg('Errore voto: ' + rating);
        }
    }

    /* const handleScore = (event) => {
         event.preventDefault();
         if (date > new Dayjs()) {
             // add
             const newExam = { title: title, favorite: favorite, date: date, rating: rating }
             props.addExam(newExam);
         } else {
             //console.log('Errore voto: ' + score);
             setErrorMsg('Errore voto: ' + date);
         }
 
     }*/




    return (
        <>

            {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} placeholder='Insert Title' onChange={ev => setTitle(ev.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type='number' placeholder='Insert Rating' min={0} max={5} value={rating} onChange={ev => setRating(ev.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Check type='checkbox' label="Favorite" value={favorite} onChange={ev => setFavorite(ev.target.value)}></Form.Check>
                </Form.Group>
            </Form>
            <Button onClick={handleSubmit}>Save</Button>
            <Button onClick={props.cancel}>Cancel</Button>
        </>
    );
}

export default MyForm