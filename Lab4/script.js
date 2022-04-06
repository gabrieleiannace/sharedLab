'use strict';
// import dayjs from "dayjs";
// const sqlite = require("sqlite3");


// internationalization (i18n) 
// const localizedFormat = require('dayjs/plugin/localizedFormat');
// dayjs.extend(localizedFormat); // use shortcuts 'LL' for date in U.S. format
/* locale
  const locale_it = require('dayjs/locale/it');
  dayjs.locale('it');
*/

function Film(id, title, isFavorite = false, watchDate = '', rating = 0) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
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

  this.loadAll = (event) => {
    const linkList = event.currentTarget.parentNode.querySelectorAll("a");
    linkList.forEach( a => {
      a.classList.remove("active");
    })
    event.currentTarget.classList.add("active");
    document.querySelector("main").firstElementChild.textContent = "All";
    load(this.list);
  }
}

function load(library){
  const ul = document.querySelector("main ul");
  ul.innerHTML = "";
  for(const f of library){
    console.log(f);
    const li = document.createElement("li");
    li.classList.add("list-group-item", "pt-3", "pb-3");
    const div = document.createElement("div");
    div.classList.add("container-fluid");
    const row = document.createElement("div");
    row.classList.add("row");
    const col4 = document.createElement("div");
    col4.classList.add("col-4");
    col4.textContent = f.title;
    const col3 = document.createElement("div");
    col3.classList.add("col-3");
    const input = document.createElement("input");
    input.classList.add("form-check-input", "me-1");
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", "value");
    input.textContent = "Favorite";
    const col3Date = document.createElement("div");
    col3Date.classList.add("col-3");
    col3Date.textContent = f.watchDate;
    const col2 = document.createElement("div");
    col2.classList.add("col-2");
    col2.textContent = f.rating;

    col3.appendChild(input);
    row.appendChild(col4);
    row.appendChild(col3);
    row.appendChild(col3Date);
    row.appendChild(col2);
    div.appendChild(row);
    li.appendChild(div);
    ul.appendChild(li);

    // questo è come non si deve fare, benedetto chi ha inventato react
  }
}


// funzione da inserire in this
function loadFavorites(event){
  const linkList = event.currentTarget.parentNode.querySelectorAll("a");
  linkList.forEach( a => {
    a.classList.remove("active");
  })
  event.currentTarget.classList.add("active");
  document.querySelector("main").firstElementChild.textContent = "Favorites";
  // qui facciamo una shallow copy e passare la lista di elementi alla funzione generica load
}

async function main() {
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

  // Print Sorted films
  // console.log("***** List of Films sorted by watchDate *****");
  // const sorted_films = library.sortByDate();
  // sorted_films.forEach((film) => console.log(film.toString()));
  
  // const elems = document.getElementById("navigator").querySelectorAll("a");

  // elems.forEach( e => {
  //   e.addEventListener('click', event => console.log(event))
  // })

  document.getElementById("all").addEventListener('click', library.loadAll); 
  document.getElementById("favorites").addEventListener('click', loadFavorites); 
  // document.getElementById("best-rated").addEventListener('click', loadBestRated); 
  // document.getElementById("last-seen").addEventListener('click', loadLastSeen); 
  // document.getElementById("seen-last-month").addEventListener('click', loadSeenLastMonth); 


}

const library = new FilmLibrary();
console.log("inizio")
main();