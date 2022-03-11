'use strict'

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

    //uso operatore spreed prende tutti gli elementi
    this.addNewFilm = (...e) => {       //inserisco nel mio array i film , usaro arrow funtion
        this.film.push(e);
    }

    //ordino in base alle date dalla piu piccola alla piu grande 
    this.sortByDate = () => {
        let newArray = [...this.film].sort((a, b) => (a.date.isAfter(b.date) ? 1 : -1))
        console.log(newArray.toString())
    }

    this.deleteFilm = (id) => {
        [...this.film].filter(f => f.id !== id)
        console.log(this.film.toString())
    }

    //lo faccio oer stampare l'oggetto
    this.print = () => {
        console.log(this.film.toString());
    }

}


const f0 = new Film(1, 'Pulp fiction', dayjs(new Date(2022, 3, 10)), 5, true);
const f1 = new Film(2, 'Star wars', dayjs(new Date(2021, 9, 12)), 4);
const f2 = new Film(3, 'Matrix', dayjs(new Date(2022, 7, 28)), 3);
const f3 = new Film(4, 'Shrek', dayjs(new Date(2020, 8, 2)), 2, true);
//const f4 = new Film(5, 'Mizzica', undefined, 1, true);

const library = new FilmLibrary();
library.addNewFilm(f0, f1, f2, f3)
//library.addNewFilm(f1)
//library.addNewFilm(f2)
//library.addNewFilm(f3)

//library.print();
//library.sortByDate()
library.deleteFilm(3)