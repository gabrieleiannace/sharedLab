'use strict'

const dayjs = require('dayjs')
// internationalization (i18n) 
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat); // use shortcuts 'LL' for date in U.S. format
/* locale
  const locale_it = require('dayjs/locale/it');
  dayjs.locale('it');
*/
//devo creare un costruttore(quindi e un metodo)

function Film(id, title, favorite = false, date = '', rating = 0) {
    this.id = id;
    this.title = title
    this.date = date && dayjs(date)
    this.rating = rating
    this.favorite = favorite

    //questo lo faccio io per stampare
    //this.toString = () => (`Id = ${this.id} - Title = ${this.title} - Date = ${this.date.format('DD-MM-YYYY')} - Rating = ${this.rating} - Favorite = ${this.favorite}`)
    //altro modo per scrivere la stessa funzione solo che sopra l ho fatto con arrow function
    this.toString = function () {
        return `Id: ${this.id}, ` +
            `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this._formatRating()}, ` +
            `watchDate: ${this._formatWatchDate('LL')}\n`
    };

    this._formatWatchDate = (format) => {
        return this.date ? this.date.format(format) : '<not defined>';
    }

    this._formatRating = () => {
        return this.rating ? this.rating : '<not assigned>';
    }
}

function FilmLibrary() {
    this.film = []    //mi creo un array di film

    this.addNewFilm = (e) => {       //aggiungo i Film all'array film , e non ritrono nulla perchè il ritorno è implicito se non metto nulla
        //faccio il controllo del duplicato se esiste già non lo inserisco
        if (!this.film.some(f => f.id == e.id))
            this.film.push(e);
        else
            throw new Error('Duplicate ID')
    }

    //lo faccio per stampare l'oggetto usando la funzione definita in Film
    this.print = () => {
        console.log("***** List of Films *****");
        console.log(this.film.toString());
    }

}

//per rendere il programma più ordinato facciamo come suggerisce la soluzione del prof
//mi faccio un altro metodo main dove inserisco tutte le cose utili alla creazione degli oggetti
//e poi chiamo il etodo main

function main() {
    //creo alcune istanze dei film
    const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
    const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
    const f3 = new Film(3, "Star Wars", false);


    //aggiungo i film alla libreria
    const library = new FilmLibrary();
    library.addNewFilm(f1)
    library.addNewFilm(f2)
    library.addNewFilm(f3)
    //stampo tutti i film presenti nella libreria
    library.print();
}

main()
