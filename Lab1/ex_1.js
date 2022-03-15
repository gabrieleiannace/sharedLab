"use strict";


function Film(id, title, fav = false, date, rating){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.date = date;
    this.rating = rating;
}

function filmLibrary(){
    this.library = [];

    this.addNewFilm = (...films) => {
        for(const film of films){
            this.library.push(film);
        }
    }
}

// Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2022, Score: 5
// Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2022, Score: 4
// Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2022, Score: 3
// Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not defined>
// Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not defined>


const film1 = new Film(1, 'Pulp', true, "March 10, 2022", 5);
const film2 = new Film(2, '21 Grams', true, 'March 17, 2022', 4);
const film3 = new Film(5, 'Shrek', false, 'March 21, 2022', 3);
const film4 = new Film(3, 'Star Wars', false);
const film5 = new Film(4, 'Matrix', false);

const library = new filmLibrary();
library.addNewFilm(film1, film2, film3, film4, film5);

console.log(library);