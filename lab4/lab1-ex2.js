/* 
 * [2021/2022]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 1 - Exercise 2
 */

'use strict';

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

  this.print = () => {
    console.log("***** List of Films *****");
    this.list.forEach((item) => console.log(item.toString()));
  }

  this.addNewFilm = (film) => {
    if (!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicate id');
  };

  this.deleteFilm = (id) => {
    const new_list = this.list.filter(function (film, index, arr) {
      return film.id !== id;
    })
    this.list = new_list;
  }

  this.resetWatchedFilms = () => {
    this.list.forEach((film) => film.watchDate = '');
  }

  this.getRated = () => {
    const new_list = this.list.filter(function (film, index, arr) {
      return film.rating > 0;
    })
    return new_list;
  }

  this.sortByDate = () => {
    const new_array = [...this.list];
    new_array.sort((f1, f2) => {
      if (f1.watchDate === f2.watchDate)
        return 0;    // works also for null === null
      else if (f1.watchDate === null || f1.watchDate === '')
        return 1;    // null/empty watchDate is the lower value
      else if (f2.watchDate === null || f2.watchDate === '')
        return -1;
      else
        return f1.watchDate.diff(f2.watchDate)
    });
    return new_array;
  }
}

function Append2TableById(id_table, ...films) {
  const hook = document.getElementById(id_table);

  let trArray = [];
  for (let i = 0; i < films.length; ++i) {
    trArray.push(document.createElement("tr"));
    let titileCol = document.createElement("td");
    titileCol.innerHTML = `${films[i].title}`;
    trArray[i].appendChild(titileCol);
    let favoriteCol = document.createElement("td");
    if (films[i].favorite)
      favoriteCol.innerHTML = `<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
    <label class="form-check-label" for="flexCheckDefault"></label>Favorite`;
    else
      favoriteCol.innerHTML = `<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault"></label>Favorite`;
    trArray[i].appendChild(favoriteCol);
    let dataCol = document.createElement("td");
    dataCol.innerHTML = `${films[i].watchDate ? films[i].watchDate.format('MMMM D, YYYY') : "<undefined>"}`;
    trArray[i].appendChild(dataCol);

    let ratingCol = document.createElement("td");
    for (let p = 0; p < films[i].rating; ++p) {
      ratingCol.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    class="bi bi-star-fill" viewBox="0 0 16 16">
    <path
        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
      trArray[i].appendChild(ratingCol);
    }

    for (let p = films[i].rating; films[i].rating <= 5; ++p) {
      ratingCol.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    class="bi bi-star-fill" viewBox="0 0 16 16">
    <path
        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
    }

    hook.appendChild(trArray[i]);
  }





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

  // Print Sorted films
  console.log("***** List of Films sorted by watchDate *****");
  const sorted_films = library.sortByDate();
  sorted_films.forEach((film) => console.log(film.toString()));

  // Deleting film #3
  library.deleteFilm(3);


  // Printing modified Library
  library.print();

  // Retrieve and print films with an assigned rating
  console.log("***** Films filtered, only the rated ones *****");
  const rated_films = library.getRated();
  rated_films.forEach((film) => console.log(film.toString()));


  Append2TableById("table-hook", f1, f2, f3, f4, f5);
  // Additional instruction to enable debug 
  //debugger;
}

main();
