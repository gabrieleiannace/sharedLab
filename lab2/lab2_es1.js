'use strict';
const dayjs = require("dayjs");
const sqlite = require("sqlite3")

// internationalization (i18n) 
const localizedFormat = require('dayjs/plugin/localizedFormat');
const { isDayjs } = require("dayjs");
dayjs.extend(localizedFormat); // use shortcuts 'LL' for date in U.S. format
/* locale
  const locale_it = require('dayjs/locale/it');
  dayjs.locale('it');
*/

function Film(id, title, isFavorite = false, watchDate = '', rating = 0) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object
  this.watchDate = watchDate && dayjs(watchDate);

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this._formatRating()}, ` +
    `watchDate: ${this._formatWatchDate('LL')}`;
  }

  this._formatWatchDate = (format) => {
    return this.watchDate ? this.watchDate.format(format) : '<not defined>';
  }

  this._formatRating = () => {
    return this.rating ? this.rating : '<not assigned>';
  }
}

function FilmLibrary() {
  this.list = [];
  const db = new sqlite.Database('films.db',(err)=>{if (err) throw err;});
  this.print = () => {
    console.log("***** List of Films *****");
    this.list.forEach((item) => console.log(item.toString()));
  }

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicate id');
  };

  this.deleteFilm = (id) => {
    const new_list = this.list.filter(function(film, index, arr) {
      return film.id !== id;
    })
    this.list = new_list;
  }

  this.resetWatchedFilms = () => {
    this.list.forEach((film) => film.watchDate = '');
  }

  this.getRated = () => {
    const new_list = this.list.filter(function(film, index, arr) {
      return film.rating > 0;
    })
    return new_list;
  }

  this.sortByDate = () => {
    const new_array = [...this.list];
    new_array.sort((f1, f2) => {
      if(f1.watchDate === f2.watchDate)
        return 0;    // works also for null === null
      else if(f1.watchDate === null || f1.watchDate === '')
        return 1;    // null/empty watchDate is the lower value
      else if(f2.watchDate === null || f2.watchDate === '')
        return -1;
      else
        return f1.watchDate.diff(f2.watchDate)
    });
    return new_array;
  }

  this.getAllFilm_DB = () => {
      const sql = "SELECT * from films";
      let film_result=[];
      return new Promise ((resolve)=>//NOTA: non c'è il "reject"
      {
        db.all(sql,(err,rows)=>{
          if (err){
            throw err; //questo blocca totalmente l'esecuzione in caso di errore!
            }
          for (const film of rows)
          {
            //const film = new Film(row.id,row.title,row.isFavorite,row.watchDate,row.rating);
            film_result.push(film);
          }
          resolve(film_result);
        });
      });
  }
  this.getFavoriteFilm_DB = () => {
      const sql = "SELECT * FROM films WHERE favorite=1";
      let film_result=[];
      return new Promise ((resolve,reject)=>//nota: c'è il reject
      {
        db.all(sql,(err,rows)=>{
          if (err){
            reject(err); //in caso di errore, l'esecuzione non è bloccata e il catch della funzione dostuff viene eseguito
            return;}
          for (const film of rows)
          {
            //const film = new Film(row.id,row.title,row.isFavorite,row.watchDate,row.rating);
            film_result.push(film);
          }
          resolve(film_result);
        });
      });
  }
  this.getWatchedTodayFilm_DB = (date) => {
    const sql = 'SELECT * FROM films WHERE watchdate=?';
    let film_result=[];
    return new Promise ((resolve,reject)=>
    {
        const date_format = date.format("YYYY-MM-DD");
        db.all(sql,date_format,(err,rows)=>{
          if (err){
            reject(err);
            return;}
          for (const film of rows)
          {
            //const film = new Film(row.id,row.title,row.isFavorite,row.watchDate,row.rating);
            film_result.push(film);
          }
          resolve(film_result);
        });
    });
}
}

async function dostuff(library)
{
  let films_array= [];
  try { //posso non mettere il try-catch, ma nel caso di errore l'esecuzione verrà fermata
  films_array = await library.getAllFilm_DB();
  console.log("***** List of ALL Films *****");
  console.log(films_array);
  films_array = await library.getFavoriteFilm_DB();
  console.log("***** List of FAV Films *****");
  console.log(films_array);
  films_array = await library.getWatchedTodayFilm_DB(dayjs());
  console.log("***** List of TODAY Films *****");
  console.log(films_array);
  }catch(e){console.log(e);}
  console.log("NON HO SBATTA DI FARE IL RESTO!");
  /*
  SKIPPO LE ALTRE FUNZIONI DELL'ESERCIZIO 1 e 2
  PERCHè SONO UGUALI MA CAMBIA SOLO LA QUERY
  E NON HO SBATTA DI FARLE
  */
}



function main() {
  // Creating some film entries
  const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
  const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, "2022-03-21", 3);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);

  dostuff(library);

  /* METODO DIRETTO CON LE PROMISE
  library.getAllFilm_DB().then((films)=>{
    console.log("***** List of ALL Films *****");
    console.log(films);
  }).catch((err)=>console.log(err));
  library.getFavoriteFilm_DB().then((films)=>{
    console.log("***** List of FAV Films *****");
    console.log(films);
  }).catch((err)=>console.log(err));
  library.getWatchedTodayFilm_DB(dayjs()).then((films)=>{
    console.log("***** List of TODAY Films *****");
    console.log(films);
  }).catch((err)=>console.log(err));
  */
  // Additional instruction to enable debug 
  debugger;
}

main();