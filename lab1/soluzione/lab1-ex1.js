/* 
 * [2021/2022]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 1 - Exercise 1
 */

'use strict';
const dayjs = require("dayjs");

// internationalization (i18n) 
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat); // use shortcuts 'LL' for date in U.S. format
/* locale
  const locale_it = require('dayjs/locale/it');
  dayjs.locale('it');
*/

function Film(id, title, isFavorite = false, WatchDate = '', rating = 0) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object
  this.WatchDate = WatchDate && dayjs(WatchDate);

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, Score: ${this._formatRating()}, ` +
    `watchDate: ${this._formatWatchDate('LL')}`;
  }

  this._formatWatchDate = (format) => {
    return this.WatchDate ? this.WatchDate.format(format) : '<not defined>';
  }

  this._formatRating = () => {
    return this.rating ? this.rating : '<not assigned>';
  }
}

function FilmLibrary() {
  this.list = [];

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicate id');
  };

  this.print = () => {
    console.log("***** List of Films *****");
    this.list.forEach((film) => console.log(film.toString()));
  }
}


function main() {
  // Creating some film entries
  const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
  const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);

  // Adding the films to the FilmLibrary
  const library = new FilmLibrary();
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);

  // Print Films
  library.print();

  // Additional instruction to enable debug 
  debugger;
}

main();
