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

  this.getSpecificRate = (rate) => {
    const new_list = this.list.filter(function (film, index, arr) {
      return film.rating == rate;
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

const filledStar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
class="bi bi-star-fill" viewBox="0 0 16 16">
<path
    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
const emptyStar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
class="bi bi-star" viewBox="0 0 16 16">
<path
    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
</svg>`;

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
      ratingCol.innerHTML += filledStar;
      trArray[i].appendChild(ratingCol);
    }
    for (let tmp = 0; tmp < 5 - films[i].rating; ++tmp) {
      ratingCol.innerHTML += emptyStar;
      trArray[i].appendChild(ratingCol);
    }
    let removeCol = document.createElement("td");
    removeCol.innerHTML = `<button type="button" class="btn btn-outline-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
  </svg></button>`;
    trArray[i].appendChild(removeCol);
    hook.appendChild(trArray[i]);
  }

}

function ClearTable(id_table) {
  const hook = document.getElementById(id_table);
  while (hook.firstChild)
    hook.removeChild(hook.firstChild);
}

function All(library) {
  ClearTable("table-hook");

  for (const film of library.list)
    Append2TableById("table-hook", film);
}

function Favorite(library) {
  ClearTable("table-hook");

  const fonly = library.list.filter(film => {
    return film.favorite == true;
  })
  for (const film of fonly)
    Append2TableById("table-hook", film);
}

function BestRated(library) {
  ClearTable("table-hook");

  let fiveStarRate = library.getSpecificRate(5);
  for (const film of fiveStarRate)
    Append2TableById("table-hook", film);
}

function SeenLastMonth(library) {
  ClearTable("table-hook");

  let today = dayjs(new Date())
  for (let f of library.list) {
    let filmDate = f.watchDate;
    if (today.diff(filmDate, 'day') < 30) {
      Append2TableById("table-hook", f);
    }
  }
}

function removeSelectionHilight() {
  const sideBarElem = document.querySelectorAll('div.list-group-flush a.list-group-item');
  for (let element of sideBarElem) {
    element.classList.remove("active");
    element.classList.add("bg-light")
  }
}

function SideBarEventListnerEnable(boolean, library = undefined) {

  //Condizione di uscita, disattiva gli eventi della sideBar
  if (!boolean) return;


  //Condizione di attivazione eventi
  const sideBarElem = document.querySelectorAll('div.list-group-flush a.list-group-item');
  for (const elem of sideBarElem) {
    elem.addEventListener('click', event => {
      if (library)
        switch (elem.innerHTML) {
          case "Favorite":
            removeSelectionHilight()
            Favorite(library);
            elem.classList.add("active");
            elem.classList.add("list-group-item-action");
            elem.classList.remove("bg-light");

            //Abilitiamo gli eventi sul bottone di rimozione
            EnableRemoveButtons();
            break;
          case "Best Rated":
            removeSelectionHilight()
            BestRated(library);
            elem.classList.add("active");
            elem.classList.add("list-group-item-action");
            elem.classList.remove("bg-light");

            //Abilitiamo gli eventi sul bottone di rimozione
            EnableRemoveButtons();
            break;
          case "Last Seen":
            removeSelectionHilight()
            SeenLastMonth(library);
            elem.classList.add("active");
            elem.classList.add("list-group-item-action");
            elem.classList.remove("bg-light");

            //Abilitiamo gli eventi sul bottone di rimozione
            EnableRemoveButtons();
            break;
          case "Seen Last Month":
            removeSelectionHilight()
            SeenLastMonth(library);
            elem.classList.add("active");
            elem.classList.add("list-group-item-action");
            elem.classList.remove("bg-light");

            //Abilitiamo gli eventi sul bottone di rimozione
            EnableRemoveButtons();
            break;
          default:
            removeSelectionHilight()
            All(library);
            elem.classList.add("active");
            elem.classList.add("list-group-item-action");
            elem.classList.remove("bg-light");

            //Abilitiamo gli eventi sul bottone di rimozione
            EnableRemoveButtons();
            break;
        }
    })

  }

}

function EnableRemoveButtons() {
  const buttons = document.querySelectorAll(".btn-outline-danger");
  for (const button of buttons) {
    button.addEventListener('click', event => {
      //console.log(button.parentElement.parentElement.parentElement.innerHTML);
      button.removeEventListener('click', () =>{});
      button.parentElement.parentElement.remove();

      //Cancelliamo il film dalla library
      library.list = library.list.filter(film => film.title !== button.parentElement.parentElement.firstChild.innerHTML);
    })
  }
}

const library = new FilmLibrary();
function main() {
  // Creating some film entries
  const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
  const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
  const f3 = new Film(3, "Star Wars", false);
  const f4 = new Film(4, "Matrix", false);
  const f5 = new Film(5, "Shrek", false, "2022-03-21", 3);

  // Adding the films to the FilmLibrary
  library.addNewFilm(f1);
  library.addNewFilm(f2);
  library.addNewFilm(f3);
  library.addNewFilm(f4);
  library.addNewFilm(f5);

  // Print Sorted films
  console.log("***** List of Films sorted by watchDate *****");
  const sorted_films = library.sortByDate();
  sorted_films.forEach((film) => console.log(film.toString()));

  SideBarEventListnerEnable(true, library);

  All(library);
  EnableRemoveButtons();
  //Favorite(library);
  //BestRated(library);
  //SeenLastMonth(library)
  // Additional instruction to enable debug 
  //debugger;
}

main();
