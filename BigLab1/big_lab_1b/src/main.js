import { Card, Table, Container, Form } from 'react-bootstrap';
import { useState } from 'react'
import { FilmLibrary } from './StructureFilm';
import dayjs from 'dayjs'

function MyMain(props) {
    const [filmList, setFilmList] = useState(props.films.film)
    return (
        <>
            <Container className="col-xs-12 col-sm-10' col-md-9 col-lg-8 col-12 ml-sm-auto px-md-4">
                <Card.Title as="h1" className='pt-2'>
                    {props.active}
                </Card.Title>
                <FilmTable films={filmList} active={props.active} setFilmList={setFilmList} />
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0d6efd"
                    class="bi bi-plus-circle-fill float-end" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
            </Container>
        </>
    )
}

function FilmTable(props) {
    //const [films, setFilms] = useState(props.films.film);
    //const list = ApplyFilter;
    return (
        <Table hover >
            <tbody>
                {
                    props.films.map((film) => <FilmRow films={film} active={props.active} key={film.id} />)

                }

            </tbody>

        </Table>
    );
}


function FilmRow(props) {
    return (
        <>
            <tr>
                <FilmData {...props} />
            </tr>
        </>
    );
}

function FilmData(props) {

    switch (props.active) {
        case 'All':
            return (
                <>
                    <Title title={props.films.title} favorite={props.films.favorite} />
                    <Favorite favorite={props.films.favorite} />
                    <Date date={props.films.date} />
                    <Rating rating={props.films.rating} />
                </>
            );
            break;
        case 'Favorites':
            if (props.films.favorite)
                return (
                    <>
                        <Title title={props.films.title} favorite={props.films.favorite} />
                        <Favorite favorite={props.films.favorite} />
                        <Date date={props.films.date} />
                        <Rating rating={props.films.rating} />
                    </>
                );
            break;
        case 'Best Rated':
            if (props.films.rating == 5)
                return (
                    <>
                        <Title title={props.films.title} favorite={props.films.favorite} />
                        <Favorite favorite={props.films.favorite} />
                        <Date date={props.films.date} />
                        <Rating rating={props.films.rating} />
                    </>
                );
            break;
        case 'Seen Last Month':
            const last_month = dayjs().subtract(1, 'month')
            if (props.films.date >= last_month)
                return (
                    <>
                        <Title title={props.films.title} favorite={props.films.favorite} />
                        <Favorite favorite={props.films.favorite} />
                        <Date date={props.films.date} />
                        <Rating rating={props.films.rating} />
                        {console.log(last_month)}
                    </>
                );
            break;
        case 'Unseen':
            if (props.films.date == '')
                return (
                    <>
                        <Title title={props.films.title} favorite={props.films.favorite} />
                        <Favorite favorite={props.films.favorite} />
                        <Date date={props.films.date} />
                        <Rating rating={props.films.rating} />
                    </>
                );
            break;
    }




}

function Rating(props) {
    switch (props.rating) {
        case 0:
            return (
                <th>
                    &#9734;&#9734;&#9734;&#9734;&#9734;
                </th>
            )
        case 1:
            return (
                <th>
                    &#9733;&#9734;&#9734;&#9734;&#9734;
                </th>
            )
        case 2:
            return (
                <th>
                    &#9733;&#9733;&#9734;&#9734;&#9734;
                </th>
            )
        case 3:
            return (
                <th>
                    &#9733;&#9733;&#9733;&#9734;&#9734;
                </th>
            )
        case 4:
            return (
                <th>
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                </th>
            )
        case 5:
            return (
                <th>
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                </th>
            )
    }
}

function Title(props) {
    if (props.favorite) {
        return (
            <td className='text-danger'>
                {props.title}
            </td>
        )
    }
    else {
        return (
            <td>
                {props.title}
            </td>
        )
    }
}

function Date(props) {
    if (props.date == "") {
        return (
            <td>
                {props.date}
            </td>
        )
    }
    else {
        return (
            <td>
                {props.date.format('MMMM D , YYYY')}
            </td>
        )
    }
}

function Favorite(props) {
    return (
        <td>
            <Form>
                {props.favorite ? <Form.Check label='Favorite' defaultChecked /> : <Form.Check label='Favorite' />}
            </Form>
        </td>
    )
}

export default MyMain