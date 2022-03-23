'use strict'

const dayjs = require('dayjs')
const sqlite = require('sqlite3')



const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const db = new sqlite.Database('films.db',
    (err) => { if (err) throw err; });


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
        //else
        //throw new Error('Duplicate ID')
    }

    //lo faccio per stampare l'oggetto usando la funzione definita in Film
    this.print = () => {
        console.log("***** List of Films *****");
        console.log(this.film.toString());
    }

    this.getAll = () => {
        let sql = 'select * from films';
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    this.getFavorite = () => {
        let sql = 'select * from films where favorite = 1 ';
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            });
        });
    }

    this.getWatchedToday = () => {
        let today = dayjs(new Date()).format('YYYY-MM-DD')  //questo mi prende la data corrente
        let sql = 'select * from films where watchdate = ? ';
        return new Promise((resolve, reject) => {
            db.all(sql, [today], (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            });
        });

    }

    this.getWatcheBeforeDate = (day) => {
        //questo metodo mi restituisce i film visti prima di una data passata come parametro
        let sql = 'select * from films where watchdate <= ? ';
        return new Promise((resolve, reject) => {
            db.all(sql, [day], (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            });
        });

    }

    this.getRatingGreaterToAParameter = (rat) => {
        //questo metodo mi restituisce i film visti prima di una data passata come parametro
        let sql = 'select * from films where rating >= ? ';
        return new Promise((resolve, reject) => {
            db.all(sql, [rat], (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            });
        });

    }

    this.getTitle = (tit) => {
        //questo metodo mi restituisce i film visti prima di una data passata come parametro
        let sql = 'select * from films where title = ? ';
        return new Promise((resolve, reject) => {
            db.all(sql, [tit], (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows);
                }
            });
        });

    }


}



async function main() {

    //aggiungo i film letti dal db alla libreria
    const library = new FilmLibrary();
    /*let only_film = await library.getAll()
    for (let row of only_film) {
        let nt = new Film(row.id, row.title, row.favorite, dayjs((row.watchdate)), row.rating);
        library.addNewFilm(nt);
    }
    console.log(library.print())*/

    /*console.log("******** Favorite Films*******")
    let favorite_film = await library.getFavorite()
    for (let row of favorite_film) {
        let nt = new Film(row.id, row.title, row.favorite, dayjs((row.watchdate)), row.rating);
        library.addNewFilm(nt);
    }
    console.log(library.print())*/

    /*console.log("******** Watched Films Today*******")
    let favorite_film = await library.getWatchedToday()
    for (let row of favorite_film) {
        let nt = new Film(row.id, row.title, row.favorite, dayjs((row.watchdate)), row.rating);
        library.addNewFilm(nt);
    }
    console.log(library.print())*/

    /*console.log("******** Watched Films Today*******")
    let favorite_film = await library.getWatcheBeforeDate('2022-03-15')
    for (let row of favorite_film) {
        let nt = new Film(row.id, row.title, row.favorite, dayjs((row.watchdate)), row.rating);
        library.addNewFilm(nt);
    }
    console.log(library.print())*/

    /*console.log("******** Watched Films Today*******")
    let favorite_film = await library.getRatingGreaterToAParameter(4)
    for (let row of favorite_film) {
        let nt = new Film(row.id, row.title, row.favorite, dayjs((row.watchdate)), row.rating);
        library.addNewFilm(nt);
    }
    console.log(library.print())*/

    console.log("******** Watched Films Today*******")
    let favorite_film = await library.getTitle('Pulp Fiction')
    for (let row of favorite_film) {
        let nt = new Film(row.id, row.title, row.favorite, dayjs((row.watchdate)), row.rating);
        library.addNewFilm(nt);
    }
    console.log(library.print())




    db.close()
}

main()
