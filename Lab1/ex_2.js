"use strict";

const dayjs = require('dayjs');
const sqlite = require('sqlite3');


function Film(id, title, fav = false, date, rating){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.date = date;
    this.rating = rating;
    // this.str = function() { return `${this.id}, ${this.title}, ${this.rate}, ${this.date.format()}` }
}

function filmLibrary(){
    this.library = [];

    this.addNewFilm = (...films) => {
        for(const film of films) this.library.push(film);
    }

    this.compareDate = (a, b) => { a.date.diff(b.date) };

    this.sortByDate = () => { this.library.sort(compareDate) };

}

const film1 = new Film(1, 'Pulp', true, dayjs('20211005'), 5);
const film2 = new Film(2, '21 Grams', true, dayjs('20220120'), 4);
const film3 = new Film(5, 'Shrek', false, dayjs('20211213'), 3);
const film4 = new Film(3, 'Star Wars', false);
const film5 = new Film(4, 'Matrix', false);

const library = new filmLibrary();
library.addNewFilm(film1, film2, film3, film4, film5);

console.log(library.sortByDate);