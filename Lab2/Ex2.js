'use strict'

const dayjs = require('dayjs')
const sqlite = require('sqlite3')



const localizedFormat = require('dayjs/plugin/localizedFormat');
const { Dayjs } = require('dayjs');
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




    //Esercio 2 eventualmente cancellare i metodi fatti per l'esercizio 1
    this.InsertNewFilm = (film) => {
        let sql = 'insert into films(title , favorite , watchdate , rating) values (?,?,?,?)'
        return new Promise((resolve, reject) => {
            db.run(sql, [film.title, film.favorite, film.date.format('YYYY-MM-DD'), film.rating], (err) => {
                if (err)
                    reject(err)
                else
                    resolve('Operazione andata a buon fine')


            });
        });

    }

    this.DeleteFilm = (ID) => {
        let sql = 'delete from films where id = ?'
        return new Promise((resolve, reject) => {
            db.run(sql, [ID], (err) => {
                if (err)
                    reject(err)
                else
                    resolve('Operazione andata a buon fine')


            });
        });

    }

    this.DeleteWatchDate = () => {
        let sql = 'update films set watchdate = NULL'
        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err)
                    reject(err)
                else
                    resolve('Operazione andata a buon fine')


            });
        });

    }

}



async function main() {

    //aggiungo i film letti dal db alla libreria
    const library = new FilmLibrary();
    const new_film = new Film(1, "Pulp Fiction 2 ", 1, "2022-03-17", 4);

    let ris = await library.InsertNewFilm(new_film)
    console.log(ris)

    /* let ris = await library.DeleteFilm(10)
     console.log(ris)*/

    /*let ris = await library.DeleteWatchDate()
    console.log(ris)*/



    db.close()
}

main()
