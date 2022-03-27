"use strict";

function Film(id, title, fav = false, date = undefined, rating){
    this.id = id;
    this.title = title;
    this.fav = fav;
    this.date = date;
    this.rating = rating;
};

function CreateFilmLibrary(){
    this.library = [];

    this.addNewFilm = (...films) =>{
        for(const moovie of films){
            this.library.push(moovie);
        }
    } 

    this.str = () => {
        for(const film of this.library){
            console.log(film.title);
        }
    }
}


//----------------------------------------------------------

const film0 = new Film(1, 'il fumo uccide', true, 1, 2);
const film1 = new Film(1, 'tre uomini ed una gamba', true, 1, 2);
const film2 = new Film(1, 'non aprire quella porta', true, 1, 2);
const film3 = new Film(1, 'Shrek', false, 1, 2);


const library = new CreateFilmLibrary();
library.addNewFilm(film0,film1,film2,film3);
library.str();
