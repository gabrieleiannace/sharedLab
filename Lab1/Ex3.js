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

    //Ordinare i film per data 
    this.sortByDate = () => {
        let orderFilm = [...this.film].sort((a, b) => (a.date - b.date))
        console.log("**** Films sorted by date")
        console.log(orderFilm.toString())
    }

    //cancello il film con l'id passato come parametro
    this.deleteFilm = (Id) => {
        //const new_list = [...this.film].filter(a => a.id === Id)  //questa funzione mi ritorna il film cancellato non va bene perchè io voglio i film che non sono cancellati allora uso diverso
        //in modo da mettere tutti gli elementi che non sono uguali al ID passato e metterli nel nuovo array
        const new_list = [...this.film].filter(a => a.id !== Id)  //questa è la versione giusta
        console.log("****Film deleted****")
        console.log(new_list.toString())
    }

    //deletes the Watch date of all the Films in the FilmLibrary
    this.resetWatchedFilms = () => {
        //mi faccio un ciclo for dove scorro tutto l'array e imposto il valore di date a striga vuota
        for (let f of this.film)
            f.date = ""
        console.log("****Reset Watch Film****")
        console.log(this.film.toString())
    }

    this.getRated = () => {
        //seleziono tutti i film che hanno uno score
        const only_rated = [...this.film].filter(a => a.rating != 0)
        //ordinare questi film in base al rating decrescente usando l'array filtrato prima
        only_rated.sort((a, b) => (b.rating - a.rating))
        console.log("***** Films filtered, only the rated ones *****")
        console.log(only_rated.toString())
    }

}


function main() {
    //creo alcune istanze dei film
    const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
    const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
    const f3 = new Film(3, "Star Wars", false);
    const f4 = new Film(4, "Matrix", false);
    const f5 = new Film(5, "Shrek", false, "2022-03-21", 3);
    //aggiungo i film alla libreria
    const library = new FilmLibrary();
    library.addNewFilm(f1)
    library.addNewFilm(f2)
    library.addNewFilm(f3)
    library.addNewFilm(f4)
    library.addNewFilm(f5)
    //stampo tutti i film presenti nella libreria
    library.print();
    //array ordinati per dati
    library.sortByDate()
    //cancello un film in base all'ID che passo
    library.deleteFilm(3)
    //resetto tutte le date dei film a not defined
    library.resetWatchedFilms()

    library.getRated()
}

main()
