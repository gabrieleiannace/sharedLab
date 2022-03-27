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

    this.sortByDate = () =>{
        this.library.sort((a,b) => a-b)
    }

    this.deleteFilm = (id) =>{
        this.library = this.library.filter(f => f.id !== id)
    }

    this.deleteWatchedFilms = () =>{
        for(const film of this.library)
            film.date = undefined;
    }

    this.getRated = () =>{
        const filtered_lib = this.library.filter((film) => film.rating != undefined);
        filtered_lib.sort((a,b) => a.rating-b.rating);
        return filtered_lib;
    } 
}

const film0 = new Film(1, 'il fumo uccide', true, 1);
const film1 = new Film(2, 'tre uomini ed una gamba', true, 1, 1);
const film2 = new Film(3, 'non aprire quella porta', true, 1, 4);
const film3 = new Film(4, 'Shrek', false, 1, 4);


const library = new CreateFilmLibrary();
library.addNewFilm(film0,film1,film2,film3);
library.str();
library.deleteFilm(4);
library.str();
library.deleteWatchedFilms();
console.log(library)


console.log('................................')
const scored = library.getRated()
console.log(scored);  