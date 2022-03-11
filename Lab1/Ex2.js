'use strict'

const dayjs = require('dayjs')
//devo creare un costruttore(quindi e un metodo)

function Film(id, title, date, rating, favorite = false) {
    this.id = id;
    this.title = title
    this.date = date
    this.rating = rating
    this.favorite = favorite

    this.toString = () => (`Id = ${this.id} - Title = ${this.title} - Date = ${this.date.format('DD-MM-YYYY')} - Rating = ${this.rating} - Favorite = ${this.favorite}`)

}

function FilmLibrary() {
    this.film = []    //mi creo un array di film

    this.addNewFilm = (...e) => {       //inserisco nel mio array i film , usaro arrow funtion
        this.film.push(e);
    }

    //lo faccio oer stampare l'oggetto
    this.print = () => {
        console.log(this.film.toString());
    }

}


const f0 = new Film(1, 'Pulp fiction', dayjs(new Date(2022, 3, 10)), 2, true);
const f1 = new Film(2, 'Star wars', dayjs(new Date(2022, 5, 12)), 2, true);
const f2 = new Film(3, 'Matrix', dayjs(new Date(2021, 7, 28)), 2, true);
const f3 = new Film(4, 'Shrek', dayjs(new Date(2020, 8, 2)), 2, true);

const library = new FilmLibrary();
library.addNewFilm(f0, f1, f2, f3)
//library.addNewFilm(f1)
//library.addNewFilm(f2)
//library.addNewFilm(f3)
library.print();
